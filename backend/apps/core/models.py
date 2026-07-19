import uuid
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.__class__.__name__} ({self.id})"


class SiteSettings(BaseModel):
    site_name = models.CharField(max_length=100, default="Maximus")
    logo = models.ImageField(upload_to='site/', null=True, blank=True)
    favicon = models.ImageField(upload_to='site/', null=True, blank=True)
    footer_text = models.CharField(max_length=255, default="© Maximus. All rights reserved.")
    social_links = models.JSONField(default=dict, blank=True)

    adsense_code = models.TextField(blank=True)
    enable_ads = models.BooleanField(default=False)

    email_from = models.EmailField(default="noreply@maximus.dev")
    purchase_email_subject = models.CharField(max_length=200, default="Your Download is Ready")

    primary_color = models.CharField(max_length=7, default="#B5300A")
    accent_color = models.CharField(max_length=7, default="#3ECF8E")

    def __str__(self):
        return "Site Settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class MaintenanceMode(BaseModel):
    is_enabled = models.BooleanField(default=False)
    message = models.TextField(default="We are currently performing maintenance.")

    def __str__(self):
        return "Maintenance Mode"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class BackupLog(BaseModel):
    status = models.CharField(max_length=20, choices=[
        ('success', 'Success'),
        ('failed', 'Failed')
    ])
    file_path = models.CharField(max_length=500, blank=True)
    size_mb = models.FloatField(default=0)

    class Meta:
        ordering = ['-created_at']


ip_validator = RegexValidator(
    regex=r'^(\d{1,3}\.){3}\d{1,3}$|^[0-9a-fA-F:]+$',
    message='Invalid IP address.',
)


class BlockedIP(BaseModel):
    ip_address = models.CharField(max_length=45, unique=True, validators=[ip_validator])
    reason = models.CharField(max_length=20, choices=[
        ('honeypot', 'Honeypot hit'),
        ('rate_limit', 'Rate limit exceeded'),
        ('manual', 'Manual block'),
        ('brute_force', 'Brute force login'),
    ])
    hit_count = models.PositiveIntegerField(default=1)
    blocked_at = models.DateTimeField(default=timezone.now)
    unblock_at = models.DateTimeField(null=True, blank=True, help_text='Null = permanent')
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-blocked_at']

    def __str__(self):
        return f"{self.ip_address} ({self.reason})"


class SuspiciousActivity(BaseModel):
    ip_address = models.CharField(max_length=45, db_index=True)
    path = models.CharField(max_length=500)
    method = models.CharField(max_length=10, default='GET')
    user_agent = models.TextField(blank=True)
    referer = models.URLField(blank=True, default='')
    status = models.CharField(max_length=20, choices=[
        ('honeypot', 'Honeypot triggered'),
        ('rate_limit', 'Rate limited'),
        ('brute_force', 'Brute force attempt'),
        ('suspicious', 'Suspicious pattern'),
    ])

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.ip_address} — {self.path} ({self.status})"