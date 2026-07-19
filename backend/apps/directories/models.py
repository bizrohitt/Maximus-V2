from django.db import models
from apps.core.models import BaseModel


class DirectoryEntry(BaseModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    website_url = models.URLField()
    category = models.CharField(max_length=100)
    is_featured = models.BooleanField(default=False)
    click_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title