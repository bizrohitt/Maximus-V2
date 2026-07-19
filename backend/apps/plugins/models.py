from django.db import models
from apps.core.models import BaseModel


class Plugin(BaseModel):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    version = models.CharField(max_length=20)
    description = models.TextField()
    author = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    config_schema = models.JSONField(default=dict)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    download_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.name} v{self.version}"


class PluginReview(BaseModel):
    plugin = models.ForeignKey(Plugin, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)

    class Meta:
        unique_together = ('plugin', 'user')