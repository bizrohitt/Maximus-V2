from django.contrib import admin
from .models import Tool, ToolUsage


@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_free', 'usage_count', 'created_at')
    list_filter = ('is_free',)
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(ToolUsage)
class ToolUsageAdmin(admin.ModelAdmin):
    list_display = ('user', 'tool', 'created_at')
    list_filter = ('tool',)
