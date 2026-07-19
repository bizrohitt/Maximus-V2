from django.contrib import admin
from .models import Tenant, TenantUser


@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'domain', 'is_active')
    search_fields = ('name', 'slug', 'domain')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(TenantUser)
class TenantUserAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'user', 'role')
    list_filter = ('role',)
