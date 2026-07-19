from django.contrib import admin
from .models import DirectoryEntry


@admin.register(DirectoryEntry)
class DirectoryEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_featured', 'click_count', 'created_at')
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'slug')
    prepopulated_fields = {'slug': ('title',)}
