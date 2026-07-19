from rest_framework import serializers
from .models import Event, PageView, DailyStats


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'properties', 'url', 'visitor_id', 'created_at')


class PageViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageView
        fields = ('id', 'url', 'referrer', 'visitor_id', 'ip_address', 'country', 'created_at')


class DailyStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyStats
        fields = ('id', 'date', 'page_views', 'unique_visitors', 'events_count', 'top_pages', 'top_referrers')
