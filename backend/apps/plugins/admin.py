from django.contrib import admin
from .models import Plugin, PluginReview

@admin.register(Plugin)
class PluginAdmin(admin.ModelAdmin):
    list_display = ('name', 'version', 'author', 'price', 'download_count', 'is_active')
    search_fields = ('name', 'author')


@admin.register(PluginReview)
class PluginReviewAdmin(admin.ModelAdmin):
    list_display = ('plugin', 'user', 'rating', 'created_at')