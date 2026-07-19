from django.db import models
from apps.core.models import BaseModel


class Tenant(BaseModel):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    domain = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    branding = models.JSONField(default=dict)  # logo, colors, etc.

    def __str__(self):
        return self.name


class TenantUser(BaseModel):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    role = models.CharField(max_length=50, default='member')

    class Meta:
        unique_together = ('tenant', 'user')