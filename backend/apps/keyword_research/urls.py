# backend/apps/keyword_research/urls.py

from django.urls import path
from . import views

app_name = 'keyword_research'

urlpatterns = [
    path('', views.keyword_tool_page, name='tool_page'),
    path('run/', views.run_keyword_research, name='run_research'),
    path('export/', views.export_keywords, name='export_keywords'),
]