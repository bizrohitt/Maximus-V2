from rest_framework import serializers
from .models import AdBanner, PopupBanner


class AdBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdBanner
        fields = ('id', 'name', 'placement', 'ad_code', 'is_active', 'priority')


class PopupBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopupBanner
        fields = ('id', 'name', 'title', 'content', 'button_text', 'button_link', 'is_active', 'show_after_seconds')
