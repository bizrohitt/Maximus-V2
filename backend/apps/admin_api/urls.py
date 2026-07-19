from django.urls import path
from . import views

app_name = 'admin_api'

urlpatterns = [
    # Dashboard
    path('dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
    path('dashboard/revenue/', views.dashboard_revenue, name='dashboard-revenue'),

    # Users
    path('users/', views.user_list, name='user-list'),
    path('users/<uuid:pk>/', views.user_detail, name='user-detail'),

    # Commerce - Products
    path('products/', views.product_list, name='product-list'),
    path('products/<uuid:pk>/', views.product_detail, name='product-detail'),

    # Commerce - Orders
    path('orders/', views.order_list, name='order-list'),
    path('orders/<uuid:pk>/', views.order_detail, name='order-detail'),

    # Commerce - Coupons
    path('coupons/', views.coupon_list, name='coupon-list'),
    path('coupons/<uuid:pk>/', views.coupon_detail, name='coupon-detail'),
    path('coupons/create/', views.coupon_create, name='coupon-create'),

    # Settings
    path('settings/site/', views.site_settings, name='site-settings'),
    path('settings/maintenance/', views.maintenance_mode, name='maintenance-mode'),

    # System - API Keys
    path('api-keys/', views.api_key_list, name='api-key-list'),
    path('api-keys/<uuid:pk>/', views.api_key_detail, name='api-key-detail'),
    path('api-keys/create/', views.api_key_create, name='api-key-create'),

    # System - Backups
    path('backups/', views.backup_list, name='backup-list'),
    path('backups/create/', views.backup_create, name='backup-create'),

    # System - Audit Logs
    path('audit-logs/', views.audit_log_list, name='audit-log-list'),

    # Directories
    path('directories/', views.directory_list, name='directory-list'),
    path('directories/<uuid:pk>/', views.directory_detail, name='directory-detail'),
    path('directories/create/', views.directory_create, name='directory-create'),

    # Resources
    path('resources/', views.resource_list, name='resource-list'),
    path('resources/<uuid:pk>/', views.resource_detail, name='resource-detail'),

    # Plugins
    path('plugins/', views.plugin_list, name='plugin-list'),
    path('plugins/<uuid:pk>/', views.plugin_detail, name='plugin-detail'),

    # Webhooks
    path('webhooks/', views.webhook_list, name='webhook-list'),
    path('webhooks/<uuid:pk>/', views.webhook_detail, name='webhook-detail'),
    path('webhooks/create/', views.webhook_create, name='webhook-create'),

    # Tenants
    path('tenants/', views.tenant_list, name='tenant-list'),
    path('tenants/<uuid:pk>/', views.tenant_detail, name='tenant-detail'),
    path('tenants/create/', views.tenant_create, name='tenant-create'),

    # Subscriptions
    path('subscription-plans/', views.subscription_plan_list, name='subscription-plan-list'),
    path('subscriptions/', views.subscription_list, name='subscription-list'),

    # AI Prompt Templates
    path('prompt-templates/', views.prompt_template_list, name='prompt-template-list'),
    path('prompt-templates/<uuid:pk>/', views.prompt_template_detail, name='prompt-template-detail'),
    path('prompt-templates/create/', views.prompt_template_create, name='prompt-template-create'),

    # Marketing
    path('campaigns/', views.campaign_list, name='campaign-list'),
    path('popups/', views.popup_list, name='popup-list'),
    path('email-settings/', views.email_settings, name='email-settings'),
]
