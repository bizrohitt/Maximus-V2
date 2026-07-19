import requests
import hmac
import hashlib
import json
from apps.webhooks.models import WebhookEndpoint, WebhookDelivery


def trigger_webhook(event_type: str, payload: dict):
    """Send webhook to all active endpoints subscribed to the event."""
    endpoints = WebhookEndpoint.objects.filter(events__contains=[event_type], is_active=True)
    
    for endpoint in endpoints:
        delivery = WebhookDelivery.objects.create(
            endpoint=endpoint,
            event_type=event_type,
            payload=payload
        )
        
        # Generate signature
        signature = hmac.new(
            endpoint.secret.encode(),
            json.dumps(payload).encode(),
            hashlib.sha256
        ).hexdigest()
        
        try:
            response = requests.post(
                endpoint.url,
                json=payload,
                headers={
                    "X-Webhook-Signature": signature,
                    "Content-Type": "application/json"
                },
                timeout=10
            )
            delivery.status = "success" if response.status_code < 400 else "failed"
            delivery.response_code = response.status_code
        except Exception as e:
            delivery.status = "failed"
        
        delivery.save()