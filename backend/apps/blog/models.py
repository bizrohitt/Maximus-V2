from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from apps.core.models import BaseModel


class BlogIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro'),
    ]

    parent_page_types = ['wagtailcore.Page']
    subpage_types = ['blog.BlogDetailPage']

    class Meta:
        verbose_name = "Blog Index"


class BlogDetailPage(Page):
    body = RichTextField()
    featured_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        FieldPanel('body'),
        FieldPanel('featured_image'),
    ]

    parent_page_types = ['blog.BlogIndexPage']
    subpage_types = []

    class Meta:
        verbose_name = "Blog Post"