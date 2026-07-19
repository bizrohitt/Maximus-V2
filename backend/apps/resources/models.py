from django.db import models
from apps.core.models import BaseModel


class Resource(BaseModel):
    """Admin can manage downloadable resources."""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='resources/')
    category = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    download_count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title