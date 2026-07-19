from django.urls import path
from .views import EmailSettingsView

urlpatterns = [
    path('email-settings/', EmailSettingsView.as_view(), name='email-settings'),
]
