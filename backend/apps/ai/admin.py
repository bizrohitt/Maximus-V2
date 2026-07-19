from django.contrib import admin
from .models import AITool, AIToolUsage, PromptTemplate


@admin.register(AITool)
class AIToolAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'usage_count', 'updated_at')
    list_filter = ('is_active',)
    search_fields = ('name', 'slug')


@admin.register(PromptTemplate)
class PromptTemplateAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'is_active')


@admin.register(AIToolUsage)
class AIToolUsageAdmin(admin.ModelAdmin):
    list_display = ('tool', 'created_at')