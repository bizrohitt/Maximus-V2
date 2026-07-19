from django.db import models
from apps.core.models import BaseModel


class SubscriptionPlan(BaseModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stripe_price_id = models.CharField(max_length=255, blank=True)
    features = models.JSONField(default=list)
    tier = models.CharField(max_length=50, default='starter')  # starter, pro, enterprise

    def __str__(self):
        return self.name


class UserSubscription(BaseModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='subscriptions')
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.PROTECT)
    stripe_subscription_id = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=50, default='active')

    class Meta:
        ordering = ['-created_at']


class APIKey(BaseModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='api_keys')
    key = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=100)
    last_used = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.user.email})"