from rest_framework import serializers
from .models import DirectoryEntry


class DirectoryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectoryEntry
        fields = ('id', 'title', 'slug', 'description', 'website_url', 'category', 'is_featured', 'click_count')
