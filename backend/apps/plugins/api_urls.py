"""API URLs for plugin management"""
from django.urls import path
from apps.plugins import api_views

app_name = 'plugins_api'

urlpatterns = [
    # Marketplace
    path('marketplace/', api_views.plugin_marketplace_list, name='marketplace_list'),
    path('<uuid:plugin_id>/', api_views.plugin_detail, name='plugin_detail'),
    
    # Installation management
    path('<uuid:plugin_id>/install/', api_views.plugin_install, name='plugin_install'),
    path('<uuid:plugin_id>/activate/', api_views.plugin_activate, name='plugin_activate'),
    path('<uuid:plugin_id>/deactivate/', api_views.plugin_deactivate, name='plugin_deactivate'),
    path('<uuid:plugin_id>/uninstall/', api_views.plugin_uninstall, name='plugin_uninstall'),
    
    # Configuration
    path('<uuid:plugin_id>/config/', api_views.plugin_update_config, name='plugin_update_config'),
    
    # Reviews
    path('<uuid:plugin_id>/reviews/', api_views.plugin_review_create, name='plugin_review_create'),
    
    # Installed plugins
    path('installed/', api_views.plugin_installed_list, name='installed_list'),
]
