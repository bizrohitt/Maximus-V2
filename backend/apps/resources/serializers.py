from rest_framework import serializers
from .models import Resource


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ('id', 'title', 'description', 'category', 'download_count', 'created_at')
