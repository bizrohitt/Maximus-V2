from rest_framework import serializers
from .models import Tool, ToolUsage


class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ('id', 'name', 'slug', 'description', 'icon', 'is_free', 'usage_count')


class ToolUsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolUsage
        fields = ('id', 'tool', 'input_data', 'output_data', 'created_at')
