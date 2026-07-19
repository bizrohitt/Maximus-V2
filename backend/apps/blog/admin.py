from django.contrib import admin
from wagtail.admin import views as wagtail_views
from .models import BlogIndexPage, BlogDetailPage


@admin.register(BlogIndexPage)
class BlogIndexPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'live', 'first_published_at')


@admin.register(BlogDetailPage)
class BlogDetailPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'live', 'first_published_at')
