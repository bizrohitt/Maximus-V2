from rest_framework import serializers
from .models import LeadForm, LeadSubmission


class LeadFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadForm
        fields = ('id', 'name', 'title', 'description', 'is_active', 'success_message')


class LeadSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadSubmission
        fields = ('id', 'form', 'email', 'name', 'data', 'created_at')
