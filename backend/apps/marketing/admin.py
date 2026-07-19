from django.contrib import admin
from .models import EmailSettings


@admin.register(EmailSettings)
class EmailSettingsAdmin(admin.ModelAdmin):
    list_display = ('send_purchase_email', 'email_provider', 'updated_at')

    def has_add_permission(self, request):
        return not EmailSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False