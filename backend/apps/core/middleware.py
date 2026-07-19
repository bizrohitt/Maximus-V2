import logging
import time
from collections import defaultdict
from django.http import JsonResponse
from django.utils import timezone
from django.conf import settings

logger = logging.getLogger('security')

# In-memory blocked IPs — survives without DB/Redis, rebuilt from DB on startup
_blocked_ips: set[str] = set()
_blocked_ips_loaded = False


def _load_blocked_ips():
    """Load blocked IPs from DB into memory. Runs once."""
    global _blocked_ips_loaded
    if _blocked_ips_loaded:
        return
    try:
        from .models import BlockedIP
        now = timezone.now()
        # permanent (unblock_at=null) + not-yet-expired
        qs = BlockedIP.objects.filter(is_active=True)
        for entry in qs:
            if entry.unblock_at and entry.unblock_at < now:
                entry.is_active = False
                entry.save(update_fields=['is_active'])
                continue
            _blocked_ips.add(entry.ip_address)
        _blocked_ips_loaded = True
    except Exception:
        pass


def block_ip(ip_address: str, reason: str = 'honeypot', notes: str = ''):
    """Block an IP: write to DB + add to in-memory set."""
    from .models import BlockedIP, SuspiciousActivity
    _blocked_ips.add(ip_address)
    BlockedIP.objects.update_or_create(
        ip_address=ip_address,
        defaults={'reason': reason, 'notes': notes, 'is_active': True},
    )
    logger.warning(f"[SECURITY] Blocked IP {ip_address} — {reason}")


def is_blocked(ip_address: str) -> bool:
    """Check if IP is in blocked list (memory-first, DB fallback)."""
    _load_blocked_ips()
    if ip_address in _blocked_ips:
        return True
    # Double-check DB in case middleware was killed/restarted
    from .models import BlockedIP
    if BlockedIP.objects.filter(ip_address=ip_address, is_active=True).exists():
        _blocked_ips.add(ip_address)
        return True
    return False


def log_suspicious(ip_address: str, path: str, method: str, user_agent: str = '', referer: str = '', status: str = 'honeypot'):
    """Log suspicious activity."""
    from .models import SuspiciousActivity
    SuspiciousActivity.objects.create(
        ip_address=ip_address,
        path=path,
        method=method,
        user_agent=user_agent[:500],
        referer=referer[:500],
        status=status,
    )


def _get_real_ip(request):
    """Extract real client IP behind proxy."""
    xff = request.META.get('HTTP_X_FORWARDED_FOR')
    if xff:
        return xff.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', '')


# --- Rate limiting (brute-force login protection) ---

_login_attempts: dict[str, list[float]] = defaultdict(list)
_LOGIN_WINDOW = 300   # 5 minutes
_LOGIN_LIMIT = 5      # max attempts per window


def is_brute_force(ip_address: str) -> bool:
    """Return True if IP has exceeded login attempt threshold."""
    now = time.time()
    window_start = now - _LOGIN_WINDOW
    _login_attempts[ip_address] = [t for t in _login_attempts[ip_address] if t > window_start]
    if len(_login_attempts[ip_address]) >= _LOGIN_LIMIT:
        return True
    _login_attempts[ip_address].append(now)
    return False


# --- Security Middleware ---

HONEYPOT_PATHS = {
    '/phpmyadmin/', '/phpmyadmin/index.php',
    '/wp-admin/', '/wp-login.php',
    '/.env', '/.git/config', '/.git/HEAD',
    '/server-status', '/server-info',
    '/debug/', '/debug/vars',
    '/phpinfo.php',
    '/administrator/',
    '/config.php.bak',
    '/db-backup.sql',
    '/xmlrpc.php',
    '/wp-content/',
    '/wp-content/debug.log',
    '/cgi-bin/',
    '/solr/admin/',
    '/jenkins/',
    '/actuator/env', '/actuator/health',
    '/swagger/', '/swagger-ui.html',
    '/api/swagger/',
    '/.DS_Store', '/Thumbs.db',
    '/backup/', '/backups/',
    '/dump.sql',
    '/database.sql',
    '/install.php',
    '/setup.php',
    '/web.config',
    '/crossdomain.xml',
    '/.htaccess', '/.htpasswd',
    '/readme.html', '/readme.txt',
    '/LICENSE.txt',
    # Bait routes — intentionally linked from hidden frontend elements
    '/admin/backup/',
    '/admin/config/',
    '/admin/users/',
    '/api/keys/',
    '/api/config/',
    '/api/internal/',
    '/private/',
    '/secret/',
    '/internal/',
    '/config/',
    '/logs/',
    '/debug/info/',
    '/test/',
    '/staging/',
    '/beta/',
    '/console/',
    '/dashboard/',
    '/api/v2/',
    '/graphql/',
    '/sitemap.xml',
}


class SecurityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path.rstrip('/')
        ip = _get_real_ip(request)

        # 1. Blocked IP → 403
        if is_blocked(ip):
            return JsonResponse({'error': 'Forbidden'}, status=403)

        # 1b. Skip honeypot traps in DEBUG (local dev)
        if not getattr(settings, 'DEBUG', False):

            # 2. Honeypot hit → auto-block + log + fake 404
            if path in HONEYPOT_PATHS or request.path in HONEYPOT_PATHS:
                log_suspicious(
                    ip_address=ip,
                    path=request.path,
                    method=request.method,
                    user_agent=request.META.get('HTTP_USER_AGENT', ''),
                    referer=request.META.get('HTTP_REFERER', ''),
                )
                block_ip(ip, reason='honeypot', notes=f'Hit: {request.path}')
                return JsonResponse({'error': 'Not Found'}, status=404)

            # 3. Honeypot query strings (e.g. ?cmd=cat%20/etc/passwd)
            if any(trig in request.GET for trig in ('cmd', 'exec', '../')):
                log_suspicious(ip, request.path, request.method,
                               request.META.get('HTTP_USER_AGENT', ''),
                               request.META.get('HTTP_REFERER', ''),
                               'suspicious')
                block_ip(ip, reason='honeypot', notes=f'Suspicious query param: {request.path}')
                return JsonResponse({'error': 'Forbidden'}, status=403)

        response = self.get_response(request)

        # 4. Add security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response['Permissions-Policy'] = 'camera=(), microphone=(), geolocation=()'

        return response
