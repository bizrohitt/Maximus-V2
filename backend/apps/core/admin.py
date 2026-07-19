from django.contrib import admin
from .models import SiteSettings, MaintenanceMode, BackupLog, BlockedIP, SuspiciousActivity


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'enable_ads', 'updated_at')

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(MaintenanceMode)
class MaintenanceModeAdmin(admin.ModelAdmin):
    list_display = ('is_enabled', 'updated_at')

    def has_add_permission(self, request):
        return not MaintenanceMode.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(BackupLog)
class BackupLogAdmin(admin.ModelAdmin):
    list_display = ('status', 'size_mb', 'created_at')
    list_filter = ('status',)


@admin.register(BlockedIP)
class BlockedIPAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'reason', 'hit_count', 'blocked_at', 'unblock_at', 'is_active')
    list_filter = ('reason', 'is_active')
    search_fields = ('ip_address', 'notes')
    actions = ['unblock_selected']

    def unblock_selected(self, request, queryset):
        from apps.core.middleware import _blocked_ips
        for obj in queryset:
            _blocked_ips.discard(obj.ip_address)
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} IP(s) unblocked.')
    unblock_selected.short_description = 'Unblock selected IPs'


@admin.register(SuspiciousActivity)
class SuspiciousActivityAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'path', 'method', 'status', 'created_at')
    list_filter = ('status', 'method')
    search_fields = ('ip_address', 'path', 'user_agent')
    readonly_fields = ('ip_address', 'path', 'method', 'user_agent', 'referer', 'status', 'created_at')