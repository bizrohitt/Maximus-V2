from django.urls import path
from . import views

app_name = 'custom_admin'

urlpatterns = [
    path('', views.dashboard_overview, name='dashboard'),
    path('content/', views.section_content, name='content'),
    path('content/cms/', views.content_management, name='content_management'),
    path('commerce/', views.section_commerce, name='commerce'),
    path('ai-tools/', views.section_ai_tools, name='ai_tools'),
    path('marketing/', views.section_marketing, name='marketing'),
    path('advertising/', views.section_advertising, name='advertising'),
    path('analytics/', views.section_analytics, name='analytics'),
    path('extensions/', views.section_extensions, name='extensions'),
    path('settings/', views.section_settings, name='settings'),
]
