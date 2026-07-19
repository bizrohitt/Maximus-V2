from django.db import models


class PageView(models.Model):
    url = models.CharField(max_length=500)
    referrer = models.CharField(max_length=500, blank=True, default='')
    visitor_id = models.CharField(max_length=64, blank=True, default='')
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True, default='')
    country = models.CharField(max_length=2, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['url', 'created_at']),
            models.Index(fields=['created_at']),
            models.Index(fields=['visitor_id']),
        ]

    def __str__(self):
        return f"{self.url} — {self.created_at}"


class Event(models.Model):
    name = models.CharField(max_length=100)
    properties = models.JSONField(default=dict, blank=True)
    url = models.CharField(max_length=500, blank=True, default='')
    visitor_id = models.CharField(max_length=64, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['name', 'created_at']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"{self.name} — {self.created_at}"


class DailyStats(models.Model):
    date = models.DateField(unique=True)
    page_views = models.PositiveIntegerField(default=0)
    unique_visitors = models.PositiveIntegerField(default=0)
    events_count = models.PositiveIntegerField(default=0)
    top_pages = models.JSONField(default=list, blank=True)
    top_referrers = models.JSONField(default=list, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        verbose_name_plural = 'Daily stats'

    def __str__(self):
        return f"Stats for {self.date}"
