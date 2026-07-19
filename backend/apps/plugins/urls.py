from django.urls import path
from . import views

urlpatterns = [
    path('install/', views.install_plugin_view, name='install-plugin'),
    path('marketplace/', views.marketplace_list, name='marketplace'),
]