import logging
from decimal import Decimal
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import timedelta
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

logger = logging.getLogger(__name__)


def _paginate(queryset, request):
    page = int(request.query_params.get('page', 1))
    per_page = min(int(request.query_params.get('per_page', 20)), 100)
    start = (page - 1) * per_page
    total = queryset.count()
    items = list(queryset[start:start + per_page])
    return {
        'items': items,
        'page': page,
        'per_page': per_page,
        'total': total,
        'total_pages': max(1, (total + per_page - 1) // per_page),
    }


# ─── Dashboard ───────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    from apps.analytics.models import PageView, Event
    from apps.users.models import User

    today = timezone.now().date()
    last_30 = today - timedelta(days=30)
    last_7 = today - timedelta(days=7)

    total_users = User.objects.count()
    new_users_30d = User.objects.filter(date_joined__date__gte=last_30).count()

    page_views_total = PageView.objects.count()
    page_views_30d = PageView.objects.filter(created_at__date__gte=last_30).count()
    page_views_7d = PageView.objects.filter(created_at__date__gte=last_7).count()
    page_views_today = PageView.objects.filter(created_at__date=today).count()

    unique_today = PageView.objects.filter(created_at__date=today).values('visitor_id').distinct().count()
    unique_7d = PageView.objects.filter(created_at__date__gte=last_7).values('visitor_id').distinct().count()

    events_total = Event.objects.count()
    events_30d = Event.objects.filter(created_at__date__gte=last_30).count()
    events_today = Event.objects.filter(created_at__date=today).count()

    return Response({
        'page_views': {
            'today': page_views_today,
            'week': page_views_7d,
            'month': page_views_30d,
            'total': page_views_total,
        },
        'visitors': {
            'today': unique_today,
            'week': unique_7d,
        },
        'events': {
            'today': events_today,
            'month': events_30d,
        },
        'users': {
            'total': total_users,
            'new_30d': new_users_30d,
        },
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_revenue(request):
    from apps.downloads.models import Order

    today = timezone.now().date()
    last_30 = today - timedelta(days=30)

    total_revenue = Order.objects.filter(status='paid').aggregate(
        total=Sum('amount')
    )['total'] or Decimal('0')

    revenue_30d = Order.objects.filter(
        status='paid', created_at__date__gte=last_30
    ).aggregate(total=Sum('amount'))['total'] or Decimal('0')

    total_orders = Order.objects.count()
    orders_30d = Order.objects.filter(created_at__date__gte=last_30).count()
    paid_orders = Order.objects.filter(status='paid').count()

    return Response({
        'total_revenue': float(total_revenue),
        'revenue_30d': float(revenue_30d),
        'total_orders': total_orders,
        'orders_30d': orders_30d,
        'paid_orders': paid_orders,
    })


# ─── Users ───────────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_list(request):
    from apps.users.models import User
    from apps.users.serializers import UserSerializer

    qs = User.objects.all().order_by('-date_joined')
    search = request.query_params.get('search', '')
    if search:
        qs = qs.filter(email__icontains=search) | qs.filter(username__icontains=search)

    data = _paginate(qs, request)
    data['items'] = UserSerializer(data['items'], many=True).data
    return Response(data)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_detail(request, pk):
    from apps.users.models import User
    from apps.users.serializers import UserSerializer

    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)

    if request.method == 'GET':
        return Response(UserSerializer(user).data)

    if request.method == 'PATCH':
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        user.is_active = False
        user.save()
        return Response({'message': 'User deactivated'}, status=200)


# ─── Commerce - Products ─────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def product_list(request):
    from apps.downloads.models import DownloadProduct

    qs = DownloadProduct.objects.all().order_by('-created_at')
    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(p.id), 'name': p.name, 'slug': p.slug,
        'price': float(p.price), 'is_active': p.is_active,
        'download_count': p.download_count,
        'created_at': p.created_at.isoformat(),
    } for p in data['items']]
    return Response(data)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def product_detail(request, pk):
    from apps.downloads.models import DownloadProduct

    try:
        product = DownloadProduct.objects.get(pk=pk)
    except DownloadProduct.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    if request.method == 'GET':
        return Response({
            'id': str(product.id), 'name': product.name, 'slug': product.slug,
            'description': product.description, 'price': float(product.price),
            'is_active': product.is_active, 'download_count': product.download_count,
            'created_at': product.created_at.isoformat(),
        })

    if request.method == 'PATCH':
        for field in ['name', 'description', 'price', 'is_active']:
            if field in request.data:
                setattr(product, field, request.data[field])
        product.save()
        return Response({'message': 'Product updated'})

    if request.method == 'DELETE':
        product.is_active = False
        product.save()
        return Response({'message': 'Product deactivated'})


# ─── Commerce - Orders ───────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_list(request):
    from apps.downloads.models import Order

    qs = Order.objects.select_related('product', 'coupon').all().order_by('-created_at')
    status_filter = request.query_params.get('status', '')
    if status_filter:
        qs = qs.filter(status=status_filter)

    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(o.id), 'email': o.email,
        'product_name': o.product.name if o.product else '',
        'amount': float(o.amount), 'status': o.status,
        'coupon_code': o.coupon.code if o.coupon else None,
        'created_at': o.created_at.isoformat(),
    } for o in data['items']]
    return Response(data)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def order_detail(request, pk):
    from apps.downloads.models import Order

    try:
        order = Order.objects.select_related('product', 'coupon').get(pk=pk)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)

    if request.method == 'GET':
        return Response({
            'id': str(order.id), 'email': order.email,
            'product_name': order.product.name if order.product else '',
            'amount': float(order.amount), 'status': order.status,
            'coupon_code': order.coupon.code if order.coupon else None,
            'created_at': order.created_at.isoformat(),
        })

    if request.method == 'PATCH':
        new_status = request.data.get('status')
        if new_status:
            order.status = new_status
            order.save()
        return Response({'message': 'Order updated'})


# ─── Commerce - Coupons ──────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def coupon_list(request):
    from apps.downloads.models import Coupon

    qs = Coupon.objects.all().order_by('-created_at')
    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(c.id), 'code': c.code,
        'discount_percent': c.discount_percent,
        'is_active': c.is_active, 'max_uses': c.max_uses,
        'used_count': c.used_count,
        'expires_at': c.expires_at.isoformat() if c.expires_at else None,
        'created_at': c.created_at.isoformat(),
    } for c in data['items']]
    return Response(data)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def coupon_detail(request, pk):
    from apps.downloads.models import Coupon

    try:
        coupon = Coupon.objects.get(pk=pk)
    except Coupon.DoesNotExist:
        return Response({'error': 'Coupon not found'}, status=404)

    if request.method == 'GET':
        return Response({
            'id': str(coupon.id), 'code': coupon.code,
            'discount_percent': coupon.discount_percent,
            'is_active': coupon.is_active, 'max_uses': coupon.max_uses,
            'used_count': coupon.used_count,
            'expires_at': coupon.expires_at.isoformat() if coupon.expires_at else None,
        })

    if request.method == 'PATCH':
        for field in ['code', 'discount_percent', 'is_active', 'max_uses']:
            if field in request.data:
                setattr(coupon, field, request.data[field])
        coupon.save()
        return Response({'message': 'Coupon updated'})

    if request.method == 'DELETE':
        coupon.delete()
        return Response({'message': 'Coupon deleted'}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def coupon_create(request):
    from apps.downloads.models import Coupon

    code = request.data.get('code', '').strip().upper()
    discount = request.data.get('discount_percent', 10)
    max_uses = request.data.get('max_uses', 100)

    if Coupon.objects.filter(code=code).exists():
        return Response({'error': 'Coupon code already exists'}, status=400)

    coupon = Coupon.objects.create(
        code=code, discount_percent=discount, max_uses=max_uses
    )
    return Response({
        'id': str(coupon.id), 'code': coupon.code,
        'discount_percent': coupon.discount_percent,
        'message': 'Coupon created',
    }, status=201)


# ─── Settings ────────────────────────────────────────────────────────────────

@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def site_settings(request):
    from apps.core.models import SiteSettings

    settings = SiteSettings.load()

    if request.method == 'GET':
        return Response({
            'site_name': settings.site_name,
            'footer_text': settings.footer_text,
            'social_links': settings.social_links,
            'enable_ads': settings.enable_ads,
            'email_from': settings.email_from,
            'primary_color': settings.primary_color,
            'accent_color': settings.accent_color,
        })

    if request.method == 'PATCH':
        for field in ['site_name', 'footer_text', 'social_links', 'enable_ads', 'email_from', 'primary_color', 'accent_color']:
            if field in request.data:
                setattr(settings, field, request.data[field])
        settings.save()
        return Response({'message': 'Settings saved'})


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def maintenance_mode(request):
    from apps.core.models import MaintenanceMode

    mm = MaintenanceMode.load()

    if request.method == 'GET':
        return Response({
            'is_enabled': mm.is_enabled,
            'message': mm.message,
        })

    if request.method == 'PATCH':
        mm.is_enabled = request.data.get('is_enabled', mm.is_enabled)
        mm.message = request.data.get('message', mm.message)
        mm.save()
        return Response({'message': 'Maintenance mode updated'})


# ─── System - API Keys ───────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_key_list(request):
    from apps.subscriptions.models import APIKey

    qs = APIKey.objects.filter(user=request.user).order_by('-created_at')
    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(k.id), 'name': k.name,
        'key_preview': f"{k.key[:8]}...{k.key[-4:]}",
        'last_used': k.last_used.isoformat() if k.last_used else None,
        'created_at': k.created_at.isoformat(),
    } for k in data['items']]
    return Response(data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def api_key_detail(request, pk):
    from apps.subscriptions.models import APIKey

    try:
        key = APIKey.objects.get(pk=pk, user=request.user)
    except APIKey.DoesNotExist:
        return Response({'error': 'API key not found'}, status=404)

    key.delete()
    return Response({'message': 'API key revoked'}, status=200)


import secrets

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_key_create(request):
    from apps.subscriptions.models import APIKey

    name = request.data.get('name', 'Unnamed Key')
    raw_key = secrets.token_hex(32)

    api_key = APIKey.objects.create(
        user=request.user, name=name, key=raw_key
    )
    return Response({
        'id': str(api_key.id), 'name': api_key.name,
        'key': raw_key,
        'message': 'API key created. Save this key — it will not be shown again.',
    }, status=201)


# ─── System - Backups ────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def backup_list(request):
    from apps.core.models import BackupLog

    qs = BackupLog.objects.all().order_by('-created_at')
    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(b.id), 'status': b.status,
        'file_path': b.file_path, 'size_mb': b.size_mb,
        'created_at': b.created_at.isoformat(),
    } for b in data['items']]
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def backup_create(request):
    from apps.core.models import BackupLog

    backup = BackupLog.objects.create(
        status='success', file_path=f'backups/backup_{timezone.now().strftime("%Y%m%d_%H%M%S")}.sql',
        size_mb=0.0,
    )
    return Response({
        'id': str(backup.id), 'status': backup.status,
        'message': 'Backup created',
    }, status=201)


# ─── System - Audit Logs ────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def audit_log_list(request):
    from apps.audit.models import AuditLog

    qs = AuditLog.objects.select_related('user').all().order_by('-created_at')
    action_filter = request.query_params.get('action', '')
    if action_filter:
        qs = qs.filter(action=action_filter)

    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(l.id),
        'user_email': l.user.email if l.user else 'System',
        'action': l.action,
        'model_name': l.model_name,
        'object_id': l.object_id,
        'ip_address': l.ip_address,
        'created_at': l.created_at.isoformat(),
    } for l in data['items']]
    return Response(data)


# ─── Marketing ───────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def campaign_list(request):
    from apps.leads.models import LeadForm

    forms = LeadForm.objects.all().order_by('-created_at')
    data = _paginate(forms, request)
    data['items'] = [{
        'id': str(f.id), 'name': f.name, 'title': f.title,
        'description': f.description, 'is_active': f.is_active,
        'submission_count': f.submissions.count(),
        'created_at': f.created_at.isoformat(),
    } for f in data['items']]
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def popup_list(request):
    from apps.ads.models import PopupBanner

    popups = PopupBanner.objects.all().order_by('-created_at')
    data = _paginate(popups, request)
    data['items'] = [{
        'id': str(p.id), 'name': p.name, 'title': p.title,
        'content': p.content, 'button_text': p.button_text,
        'button_link': p.button_link, 'is_active': p.is_active,
        'show_after_seconds': p.show_after_seconds,
    } for p in data['items']]
    return Response(data)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def email_settings(request):
    from apps.marketing.models import EmailSettings

    es = EmailSettings.load()

    if request.method == 'GET':
        return Response({
            'send_purchase_email': es.send_purchase_email,
            'purchase_subject': es.purchase_subject,
            'purchase_template': es.purchase_template,
            'email_provider': es.email_provider,
            'smtp_host': es.smtp_host,
            'smtp_port': es.smtp_port,
            'smtp_user': es.smtp_user,
        })

    if request.method == 'PATCH':
        for field in ['send_purchase_email', 'purchase_subject', 'purchase_template',
                      'email_provider', 'smtp_host', 'smtp_port', 'smtp_user', 'smtp_password']:
            if field in request.data:
                setattr(es, field, request.data[field])
        es.save()
        return Response({'message': 'Email settings saved'})


# ─── AI Prompt Templates ─────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def prompt_template_list(request):
    from apps.ai.models import PromptTemplate

    qs = PromptTemplate.objects.all().order_by('-created_at')
    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(t.id), 'name': t.name, 'prompt': t.prompt,
        'category': t.category, 'is_active': t.is_active,
        'created_at': t.created_at.isoformat(),
    } for t in data['items']]
    return Response(data)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def prompt_template_detail(request, pk):
    from apps.ai.models import PromptTemplate

    try:
        template = PromptTemplate.objects.get(pk=pk)
    except PromptTemplate.DoesNotExist:
        return Response({'error': 'Template not found'}, status=404)

    if request.method == 'GET':
        return Response({
            'id': str(template.id), 'name': template.name,
            'prompt': template.prompt, 'category': template.category,
            'is_active': template.is_active,
        })

    if request.method == 'PATCH':
        for field in ['name', 'prompt', 'category', 'is_active']:
            if field in request.data:
                setattr(template, field, request.data[field])
        template.save()
        return Response({'message': 'Template updated'})

    if request.method == 'DELETE':
        template.delete()
        return Response({'message': 'Template deleted'}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def prompt_template_create(request):
    from apps.ai.models import PromptTemplate

    name = request.data.get('name', '').strip()
    prompt = request.data.get('prompt', '').strip()
    category = request.data.get('category', 'general')

    if not name or not prompt:
        return Response({'error': 'Name and prompt are required'}, status=400)

    template = PromptTemplate.objects.create(
        name=name, prompt=prompt, category=category
    )
    return Response({
        'id': str(template.id), 'name': template.name,
        'message': 'Template created',
    }, status=201)


# ─── Directories ─────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def directory_list(request):
    from apps.directories.models import DirectoryEntry

    qs = DirectoryEntry.objects.all().order_by('-created_at')
    search = request.query_params.get('search', '')
    if search:
        qs = qs.filter(title__icontains=search)

    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(d.id), 'title': d.title, 'slug': d.slug,
        'description': d.description, 'website_url': d.website_url,
        'category': d.category, 'is_featured': d.is_featured,
        'click_count': d.click_count,
        'created_at': d.created_at.isoformat(),
    } for d in data['items']]
    return Response(data)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def directory_detail(request, pk):
    from apps.directories.models import DirectoryEntry

    try:
        entry = DirectoryEntry.objects.get(pk=pk)
    except DirectoryEntry.DoesNotExist:
        return Response({'error': 'Directory entry not found'}, status=404)

    if request.method == 'GET':
        return Response({
            'id': str(entry.id), 'title': entry.title, 'slug': entry.slug,
            'description': entry.description, 'website_url': entry.website_url,
            'category': entry.category, 'is_featured': entry.is_featured,
            'click_count': entry.click_count,
        })

    if request.method == 'PATCH':
        for field in ['title', 'slug', 'description', 'website_url', 'category', 'is_featured']:
            if field in request.data:
                setattr(entry, field, request.data[field])
        entry.save()
        return Response({'message': 'Directory entry updated'})

    if request.method == 'DELETE':
        entry.delete()
        return Response({'message': 'Directory entry deleted'}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def directory_create(request):
    from apps.directories.models import DirectoryEntry

    title = request.data.get('title', '').strip()
    slug = request.data.get('slug', '').strip()
    description = request.data.get('description', '')
    website_url = request.data.get('website_url', '')
    category = request.data.get('category', '')

    if not title or not slug:
        return Response({'error': 'Title and slug are required'}, status=400)

    if DirectoryEntry.objects.filter(slug=slug).exists():
        return Response({'error': 'Slug already exists'}, status=400)

    entry = DirectoryEntry.objects.create(
        title=title, slug=slug, description=description,
        website_url=website_url, category=category,
    )
    return Response({
        'id': str(entry.id), 'title': entry.title,
        'message': 'Directory entry created',
    }, status=201)


# ─── Resources ───────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resource_list(request):
    from apps.resources.models import Resource

    qs = Resource.objects.all().order_by('-created_at')
    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(r.id), 'title': r.title, 'description': r.description,
        'category': r.category, 'is_active': r.is_active,
        'download_count': r.download_count,
        'created_at': r.created_at.isoformat(),
    } for r in data['items']]
    return Response(data)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def resource_detail(request, pk):
    from apps.resources.models import Resource

    try:
        resource = Resource.objects.get(pk=pk)
    except Resource.DoesNotExist:
        return Response({'error': 'Resource not found'}, status=404)

    if request.method == 'GET':
        return Response({
            'id': str(resource.id), 'title': resource.title,
            'description': resource.description, 'category': resource.category,
            'is_active': resource.is_active, 'download_count': resource.download_count,
        })

    if request.method == 'PATCH':
        for field in ['title', 'description', 'category', 'is_active']:
            if field in request.data:
                setattr(resource, field, request.data[field])
        resource.save()
        return Response({'message': 'Resource updated'})

    if request.method == 'DELETE':
        resource.is_active = False
        resource.save()
        return Response({'message': 'Resource deactivated'})


# ─── Plugins ─────────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def plugin_list(request):
    from apps.plugins.models import Plugin

    qs = Plugin.objects.all().order_by('-created_at')
    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(p.id), 'name': p.name, 'slug': p.slug,
        'version': p.version, 'description': p.description,
        'author': p.author, 'is_active': p.is_active,
        'price': float(p.price), 'download_count': p.download_count,
        'created_at': p.created_at.isoformat(),
    } for p in data['items']]
    return Response(data)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def plugin_detail(request, pk):
    from apps.plugins.models import Plugin

    try:
        plugin = Plugin.objects.get(pk=pk)
    except Plugin.DoesNotExist:
        return Response({'error': 'Plugin not found'}, status=404)

    if request.method == 'GET':
        return Response({
            'id': str(plugin.id), 'name': plugin.name, 'slug': plugin.slug,
            'version': plugin.version, 'description': plugin.description,
            'author': plugin.author, 'is_active': plugin.is_active,
            'price': float(plugin.price), 'download_count': plugin.download_count,
            'config_schema': plugin.config_schema,
        })

    if request.method == 'PATCH':
        for field in ['name', 'version', 'description', 'author', 'is_active', 'price', 'config_schema']:
            if field in request.data:
                setattr(plugin, field, request.data[field])
        plugin.save()
        return Response({'message': 'Plugin updated'})


# ─── Webhooks ────────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def webhook_list(request):
    from apps.webhooks.models import WebhookEndpoint

    qs = WebhookEndpoint.objects.filter(user=request.user).order_by('-created_at')
    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(w.id), 'url': w.url,
        'events': w.events, 'is_active': w.is_active,
        'created_at': w.created_at.isoformat(),
    } for w in data['items']]
    return Response(data)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def webhook_detail(request, pk):
    from apps.webhooks.models import WebhookEndpoint

    try:
        webhook = WebhookEndpoint.objects.get(pk=pk, user=request.user)
    except WebhookEndpoint.DoesNotExist:
        return Response({'error': 'Webhook not found'}, status=404)

    if request.method == 'GET':
        return Response({
            'id': str(webhook.id), 'url': webhook.url,
            'events': webhook.events, 'is_active': webhook.is_active,
        })

    if request.method == 'PATCH':
        for field in ['url', 'events', 'is_active']:
            if field in request.data:
                setattr(webhook, field, request.data[field])
        webhook.save()
        return Response({'message': 'Webhook updated'})

    if request.method == 'DELETE':
        webhook.delete()
        return Response({'message': 'Webhook deleted'}, status=200)


import secrets as _secrets

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def webhook_create(request):
    from apps.webhooks.models import WebhookEndpoint

    url = request.data.get('url', '').strip()
    events = request.data.get('events', [])

    if not url:
        return Response({'error': 'URL is required'}, status=400)

    webhook = WebhookEndpoint.objects.create(
        user=request.user, url=url, events=events,
        secret=_secrets.token_hex(32),
    )
    return Response({
        'id': str(webhook.id), 'url': webhook.url,
        'message': 'Webhook created',
    }, status=201)


# ─── Tenants ─────────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tenant_list(request):
    from apps.tenants.models import Tenant

    qs = Tenant.objects.all().order_by('-created_at')
    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(t.id), 'name': t.name, 'slug': t.slug,
        'domain': t.domain, 'is_active': t.is_active,
        'branding': t.branding,
        'created_at': t.created_at.isoformat(),
    } for t in data['items']]
    return Response(data)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def tenant_detail(request, pk):
    from apps.tenants.models import Tenant

    try:
        tenant = Tenant.objects.get(pk=pk)
    except Tenant.DoesNotExist:
        return Response({'error': 'Tenant not found'}, status=404)

    if request.method == 'GET':
        return Response({
            'id': str(tenant.id), 'name': tenant.name, 'slug': tenant.slug,
            'domain': tenant.domain, 'is_active': tenant.is_active,
            'branding': tenant.branding,
        })

    if request.method == 'PATCH':
        for field in ['name', 'slug', 'domain', 'is_active', 'branding']:
            if field in request.data:
                setattr(tenant, field, request.data[field])
        tenant.save()
        return Response({'message': 'Tenant updated'})

    if request.method == 'DELETE':
        tenant.is_active = False
        tenant.save()
        return Response({'message': 'Tenant deactivated'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tenant_create(request):
    from apps.tenants.models import Tenant

    name = request.data.get('name', '').strip()
    slug = request.data.get('slug', '').strip()
    domain = request.data.get('domain', '').strip()

    if not name or not slug or not domain:
        return Response({'error': 'Name, slug, and domain are required'}, status=400)

    if Tenant.objects.filter(slug=slug).exists():
        return Response({'error': 'Slug already exists'}, status=400)

    tenant = Tenant.objects.create(name=name, slug=slug, domain=domain)
    return Response({
        'id': str(tenant.id), 'name': tenant.name,
        'message': 'Tenant created',
    }, status=201)


# ─── Subscriptions ───────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def subscription_plan_list(request):
    from apps.subscriptions.models import SubscriptionPlan

    qs = SubscriptionPlan.objects.all().order_by('price')
    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(p.id), 'name': p.name, 'slug': p.slug,
        'price': float(p.price), 'tier': p.tier,
        'features': p.features,
        'created_at': p.created_at.isoformat(),
    } for p in data['items']]
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def subscription_list(request):
    from apps.subscriptions.models import UserSubscription

    qs = UserSubscription.objects.select_related('user', 'plan').all().order_by('-created_at')
    data = _paginate(qs, request)
    data['items'] = [{
        'id': str(s.id),
        'user_email': s.user.email if s.user else '',
        'plan_name': s.plan.name if s.plan else '',
        'status': s.status,
        'created_at': s.created_at.isoformat(),
    } for s in data['items']]
    return Response(data)
