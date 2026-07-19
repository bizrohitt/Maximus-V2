from django.db import models
from apps.core.models import BaseModel


class EmailSettings(BaseModel):
    """
    Admin-controlled email automation settings.
    Only one instance should exist.
    """
    # Purchase Email
    send_purchase_email = models.BooleanField(default=True)
    purchase_subject = models.CharField(max_length=200, default="Your Download is Ready")
    purchase_template = models.TextField(
        default="Thank you for your purchase! Here is your download link: {{download_link}}"
    )

    # Email Provider Settings
    email_provider = models.CharField(
        max_length=50,
        choices=[
            ('console', 'Console (Development)'),
            ('smtp', 'SMTP'),
            ('sendgrid', 'SendGrid'),
            ('mailgun', 'Mailgun'),
        ],
        default='console'
    )

    # SMTP Settings
    smtp_host = models.CharField(max_length=255, blank=True)
    smtp_port = models.IntegerField(default=587)
    smtp_user = models.CharField(max_length=255, blank=True)
    smtp_password = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = "Email Settings"
        verbose_name_plural = "Email Settings"

    def __str__(self):
        return "Email Automation Settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj