from django.contrib import admin
from .models import LeadForm, LeadSubmission


@admin.register(LeadForm)
class LeadFormAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'created_at')


@admin.register(LeadSubmission)
class LeadSubmissionAdmin(admin.ModelAdmin):
    list_display = ('email', 'form', 'created_at')
    list_filter = ('form',)