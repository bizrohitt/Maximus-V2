from django.urls import path
from . import views

urlpatterns = [
    path('generate/', views.generate_ai_content, name='generate-ai'),
]