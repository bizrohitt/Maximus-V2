from django.db import models
from apps.core.models import BaseModel


class AdBanner(BaseModel):
    """Admin can add and manage ad banners."""
    PLACEMENT_CHOICES = [
        ('header', 'Header'),
        ('sidebar', 'Sidebar'),
        ('footer', 'Footer'),
        ('content_top', 'Content Top'),
        ('content_bottom', 'Content Bottom'),
        ('popup', 'Popup'),
        ('site_banner', 'Site Banner (below navbar)'),
    ]

    name = models.CharField(max_length=100)
    placement = models.CharField(max_length=50, choices=PLACEMENT_CHOICES)
    ad_code = models.TextField(help_text="Paste AdSense code or custom HTML/JS")
    is_active = models.BooleanField(default=True)
    priority = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-priority', '-created_at']

    def __str__(self):
        return f"{self.name} ({self.placement})"


class PopupBanner(BaseModel):
    """Admin-controlled popup banners."""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    content = models.TextField()
    button_text = models.CharField(max_length=50, default="Learn More")
    button_link = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    show_after_seconds = models.PositiveIntegerField(default=5)

    def __str__(self):
        return self.name