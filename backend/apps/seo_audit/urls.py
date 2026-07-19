# backend/apps/seo_audit/urls.py

from django.urls import path
from . import views

app_name = 'seo_audit'

urlpatterns = [
    path('', views.seo_audit_page, name='audit_page'),
    path('run/', views.run_audit, name='run_audit'),
]