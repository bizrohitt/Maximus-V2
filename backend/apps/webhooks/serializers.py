from rest_framework import serializers
from .models import WebhookEndpoint, WebhookDelivery


class WebhookEndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebhookEndpoint
        fields = ('id', 'url', 'events', 'is_active', 'created_at')
        read_only_fields = ('id', 'created_at')


class WebhookDeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = WebhookDelivery
        fields = ('id', 'endpoint', 'event_type', 'payload', 'status', 'response_code', 'created_at')
