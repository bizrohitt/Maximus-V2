from django.contrib import admin
from .models import AdBanner, PopupBanner


@admin.register(AdBanner)
class AdBannerAdmin(admin.ModelAdmin):
    list_display = ('name', 'placement', 'is_active', 'priority')
    list_filter = ('placement', 'is_active')
    list_editable = ('is_active', 'priority')


@admin.register(PopupBanner)
class PopupBannerAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'show_after_seconds')