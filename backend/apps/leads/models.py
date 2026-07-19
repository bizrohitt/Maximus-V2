from django.db import models
from apps.core.models import BaseModel


class LeadForm(BaseModel):
    """Admin can create lead capture forms."""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    success_message = models.CharField(max_length=255, default="Thank you! We'll be in touch soon.")

    def __str__(self):
        return self.name


class LeadSubmission(BaseModel):
    form = models.ForeignKey(LeadForm, on_delete=models.CASCADE)
    email = models.EmailField()
    name = models.CharField(max_length=255, blank=True)
    data = models.JSONField(default=dict)  # Extra form fields

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.email} - {self.form.name}"