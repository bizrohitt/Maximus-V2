from django.contrib import admin
from .models import WebhookEndpoint, WebhookDelivery

@admin.register(WebhookEndpoint)
class WebhookEndpointAdmin(admin.ModelAdmin):
    list_display = ('user', 'url', 'is_active')

@admin.register(WebhookDelivery)
class WebhookDeliveryAdmin(admin.ModelAdmin):
    list_display = ('endpoint', 'event_type', 'status', 'created_at')