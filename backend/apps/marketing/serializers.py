from rest_framework import serializers
from .models import EmailSettings


class EmailSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSettings
        fields = '__all__'
