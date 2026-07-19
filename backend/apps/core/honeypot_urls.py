# Honeypot URL routes — DO NOT LINK ANYWHERE IN YOUR APP.
# These mimic paths that automated scanners and bots probe.
# Any real visitor should never reach these. If they do → auto-block.

from django.urls import path
from django.http import JsonResponse
from django.conf import settings


def _honeypot_view(request, *args, **kwargs):
    """Trap view — logs the hit then returns a decoy 404."""
    if getattr(settings, 'DEBUG', False):
        return JsonResponse({'error': 'Not Found (dev - honeypot disabled in DEBUG)'}, status=404)
    from .middleware import log_suspicious, block_ip, _get_real_ip
    ip = _get_real_ip(request)
    log_suspicious(
        ip_address=ip,
        path=request.path,
        method=request.method,
        user_agent=request.META.get('HTTP_USER_AGENT', ''),
        referer=request.META.get('HTTP_REFERER', ''),
    )
    block_ip(ip, reason='honeypot', notes=f'Honeypot hit: {request.path}')
    return JsonResponse({'error': 'Not Found'}, status=404)


# Each path here is a deliberate trap. Every one is a common scanner target.
urlpatterns = [
    # WordPress scanners
    path('wp-admin/', _honeypot_view, name='hp_wp_admin'),
    path('wp-login.php', _honeypot_view, name='hp_wp_login'),
    path('wp-content/', _honeypot_view, name='hp_wp_content'),
    path('wp-content/debug.log', _honeypot_view, name='hp_wp_debug'),
    path('xmlrpc.php', _honeypot_view, name='hp_xmlrpc'),

    # phpMyAdmin
    path('phpmyadmin/', _honeypot_view, name='hp_phpmyadmin'),
    path('phpmyadmin/index.php', _honeypot_view, name='hp_phpmyadmin_index'),

    # Environment / git exposure
    path('.env', _honeypot_view, name='hp_env'),
    path('.git/config', _honeypot_view, name='hp_git_config'),
    path('.git/HEAD', _honeypot_view, name='hp_git_head'),
    path('.htaccess', _honeypot_view, name='hp_htaccess'),
    path('.htpasswd', _honeypot_view, name='hp_htpasswd'),
    path('.DS_Store', _honeypot_view, name='hp_ds_store'),

    # Server status / admin panels
    path('server-status', _honeypot_view, name='hp_server_status'),
    path('server-info', _honeypot_view, name='hp_server_info'),
    path('phpinfo.php', _honeypot_view, name='hp_phpinfo'),
    path('administrator/', _honeypot_view, name='hp_administrator'),

    # Database dumps
    path('db-backup.sql', _honeypot_view, name='hp_db_backup'),
    path('dump.sql', _honeypot_view, name='hp_dump'),
    path('database.sql', _honeypot_view, name='hp_database'),

    # Debug / introspection
    path('debug/', _honeypot_view, name='hp_debug'),
    path('debug/vars', _honeypot_view, name='hp_debug_vars'),

    # Java / JVM targets
    path('jenkins/', _honeypot_view, name='hp_jenkins'),
    path('actuator/env', _honeypot_view, name='hp_actuator_env'),
    path('actuator/health', _honeypot_view, name='hp_actuator_health'),

    # Search / API docs
    path('solr/admin/', _honeypot_view, name='hp_solr'),
    path('swagger/', _honeypot_view, name='hp_swagger'),
    path('swagger-ui.html', _honeypot_view, name='hp_swagger_ui'),
    path('api/swagger/', _honeypot_view, name='hp_api_swagger'),

    # CMS / install scripts
    path('install.php', _honeypot_view, name='hp_install'),
    path('setup.php', _honeypot_view, name='hp_setup'),

    # Misc scanner bait
    path('cgi-bin/', _honeypot_view, name='hp_cgi'),
    path('config.php.bak', _honeypot_view, name='hp_config_bak'),
    path('backup/', _honeypot_view, name='hp_backup'),
    path('backups/', _honeypot_view, name='hp_backups'),
    path('readme.html', _honeypot_view, name='hp_readme'),
    path('readme.txt', _honeypot_view, name='hp_readme_txt'),
    path('LICENSE.txt', _honeypot_view, name='hp_license'),
    path('crossdomain.xml', _honeypot_view, name='hp_crossdomain'),
    path('web.config', _honeypot_view, name='hp_web_config'),
    path('Thumbs.db', _honeypot_view, name='hp_thumbs'),

    # Bait routes — linked from invisible frontend elements
    path('admin/backup/', _honeypot_view, name='hp_admin_backup'),
    path('admin/config/', _honeypot_view, name='hp_admin_config'),
    path('admin/users/', _honeypot_view, name='hp_admin_users'),
    path('api/keys/', _honeypot_view, name='hp_api_keys'),
    path('api/config/', _honeypot_view, name='hp_api_config'),
    path('api/internal/', _honeypot_view, name='hp_api_internal'),
    path('private/', _honeypot_view, name='hp_private'),
    path('secret/', _honeypot_view, name='hp_secret'),
    path('internal/', _honeypot_view, name='hp_internal'),
    path('config/', _honeypot_view, name='hp_config'),
    path('logs/', _honeypot_view, name='hp_logs'),
    path('debug/info/', _honeypot_view, name='hp_debug_info'),
    path('test/', _honeypot_view, name='hp_test'),
    path('staging/', _honeypot_view, name='hp_staging'),
    path('beta/', _honeypot_view, name='hp_beta'),
    path('console/', _honeypot_view, name='hp_console'),
    path('dashboard/', _honeypot_view, name='hp_dashboard'),
    path('api/v2/', _honeypot_view, name='hp_api_v2'),
    path('graphql/', _honeypot_view, name='hp_graphql'),
    path('sitemap.xml', _honeypot_view, name='hp_sitemap'),
]
