# backend/apps/website_speed/urls.py

from django.urls import path
from . import views

app_name = 'website_speed'

urlpatterns = [
    path('', views.speed_test_page, name='tool_page'),
    path('run/', views.run_speed_test, name='run_test'),
]