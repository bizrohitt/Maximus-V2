from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Count, Sum
from django.utils import timezone
from datetime import timedelta

from apps.analytics.models import PageView, Event, DailyStats
from apps.users.models import User
from apps.downloads.models import DownloadProduct, Order, Coupon
from apps.tools.models import Tool
from apps.ai.models import AITool, AIToolUsage, PromptTemplate
from apps.plugins.models import Plugin
from apps.ads.models import PopupBanner
from apps.core.models import SiteSettings, MaintenanceMode
from apps.leads.models import LeadForm
from apps.marketing.models import EmailSettings


@staff_member_required
def dashboard_overview(request):
    today = timezone.now().date()
    last_30_days = today - timedelta(days=30)
    last_7_days = today - timedelta(days=7)

    total_users = User.objects.count()
    new_users_30d = User.objects.filter(date_joined__date__gte=last_30_days).count()
    new_users_7d = User.objects.filter(date_joined__date__gte=last_7_days).count()

    page_views_30d = PageView.objects.filter(created_at__date__gte=last_30_days).count()
    total_page_views = PageView.objects.count()
    page_views_7d = PageView.objects.filter(created_at__date__gte=last_7_days).count()
    page_views_today = PageView.objects.filter(created_at__date=today).count()

    total_downloads = Order.objects.filter(status='paid').aggregate(total=Sum('amount'))['total'] or 0
    total_orders = Order.objects.count()
    orders_30d = Order.objects.filter(created_at__date__gte=last_30_days).count()
    revenue_30d = Order.objects.filter(status='paid', created_at__date__gte=last_30_days).aggregate(total=Sum('amount'))['total'] or 0

    total_ai_calls = AIToolUsage.objects.count()
    ai_calls_30d = AIToolUsage.objects.filter(created_at__date__gte=last_30_days).count()

    top_events = Event.objects.filter(
        created_at__date__gte=last_30_days
    ).values('name').annotate(count=Count('id')).order_by('-count')[:5]

    recent_orders = Order.objects.select_related('product').order_by('-created_at')[:10]

    total_plugins = Plugin.objects.filter(is_active=True).count()

    return render(request, 'custom_admin/dashboard.html', {
        'total_users': total_users,
        'new_users_30d': new_users_30d,
        'new_users_7d': new_users_7d,
        'page_views_30d': page_views_30d,
        'total_page_views': total_page_views,
        'page_views_7d': page_views_7d,
        'page_views_today': page_views_today,
        'total_downloads': total_downloads,
        'total_orders': total_orders,
        'orders_30d': orders_30d,
        'revenue_30d': revenue_30d,
        'total_ai_calls': total_ai_calls,
        'ai_calls_30d': ai_calls_30d,
        'top_events': top_events,
        'recent_orders': recent_orders,
        'total_plugins': total_plugins,
        'section': 'dashboard',
    })


@staff_member_required
def section_content(request):
    return render(request, 'custom_admin/section_content.html', {'section': 'content'})


@staff_member_required
def section_commerce(request):
    products = DownloadProduct.objects.all().order_by('-created_at')[:20]
    recent_orders = Order.objects.select_related('product').order_by('-created_at')[:20]
    return render(request, 'custom_admin/section_commerce.html', {
        'section': 'commerce',
        'products': products,
        'recent_orders': recent_orders,
    })


@staff_member_required
def section_ai_tools(request):
    tools = AITool.objects.all().order_by('-created_at')
    usage_stats = AIToolUsage.objects.values('tool__name').annotate(count=Count('id')).order_by('-count')[:10]
    return render(request, 'custom_admin/section_ai_tools.html', {
        'section': 'ai_tools',
        'tools': tools,
        'usage_stats': usage_stats,
    })


@staff_member_required
def section_marketing(request):
    email_settings = EmailSettings.load()
    return render(request, 'custom_admin/section_marketing.html', {
        'section': 'marketing',
        'email_settings': email_settings,
    })


@staff_member_required
def section_advertising(request):
    popups = PopupBanner.objects.all().order_by('-created_at')
    site_settings = SiteSettings.load()
    return render(request, 'custom_admin/section_advertising.html', {
        'section': 'advertising',
        'popups': popups,
        'site_settings': site_settings,
    })


@staff_member_required
def section_analytics(request):
    stats = DailyStats.objects.order_by('-date')[:30]
    return render(request, 'custom_admin/section_analytics.html', {
        'section': 'analytics',
        'stats': stats,
    })


@staff_member_required
def section_extensions(request):
    plugins = Plugin.objects.all().order_by('-created_at')
    return render(request, 'custom_admin/section_extensions.html', {
        'section': 'extensions',
        'plugins': plugins,
    })


@staff_member_required
def section_settings(request):
    site_settings = SiteSettings.load()
    maintenance_mode = MaintenanceMode.load()
    return render(request, 'custom_admin/section_settings.html', {
        'section': 'settings',
        'site_settings': site_settings,
        'maintenance_mode': maintenance_mode,
    })
