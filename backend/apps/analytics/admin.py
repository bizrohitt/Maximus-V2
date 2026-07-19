from django.contrib import admin
from .models import PageView, Event, DailyStats


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ('url', 'visitor_id', 'ip_address', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('url', 'visitor_id', 'ip_address')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'url', 'visitor_id', 'created_at')
    list_filter = ('name', 'created_at')
    search_fields = ('name', 'visitor_id')
    readonly_fields = ('created_at',)


@admin.register(DailyStats)
class DailyStatsAdmin(admin.ModelAdmin):
    list_display = ('date', 'page_views', 'unique_visitors', 'events_count')
    list_filter = ('date',)
    readonly_fields = ('updated_at',)
