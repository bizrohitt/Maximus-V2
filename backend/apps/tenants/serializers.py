from rest_framework import serializers
from .models import Tenant, TenantUser


class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ('id', 'name', 'slug', 'domain', 'is_active', 'branding')


class TenantUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TenantUser
        fields = ('id', 'tenant', 'user', 'role')
