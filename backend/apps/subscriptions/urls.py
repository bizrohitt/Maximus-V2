from django.urls import path
from .views import create_subscription_checkout

urlpatterns = [
    path('create-checkout/', create_subscription_checkout, name='create-checkout'),
]