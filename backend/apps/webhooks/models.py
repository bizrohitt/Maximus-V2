from django.db import models
from apps.core.models import BaseModel


class WebhookEndpoint(BaseModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    url = models.URLField()
    secret = models.CharField(max_length=64)
    events = models.JSONField(default=list)  # e.g. ["user.created", "plugin.installed"]
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.email} - {self.url}"


class WebhookDelivery(BaseModel):
    endpoint = models.ForeignKey(WebhookEndpoint, on_delete=models.CASCADE)
    event_type = models.CharField(max_length=100)
    payload = models.JSONField()
    status = models.CharField(max_length=20, default='pending')  # pending, success, failed
    response_code = models.IntegerField(null=True, blank=True)