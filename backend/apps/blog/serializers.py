from rest_framework import serializers
from wagtail.models import Page


class BlogPageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    slug = serializers.CharField()
    first_published_at = serializers.DateTimeField()
    url_path = serializers.CharField(source='url_path', read_only=True)
