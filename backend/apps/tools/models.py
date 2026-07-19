from django.db import models
from apps.core.models import BaseModel


class Tool(BaseModel):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    icon = models.CharField(max_length=100, blank=True)
    is_free = models.BooleanField(default=False)
    usage_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class ToolUsage(BaseModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='tool_usages')
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)
    input_data = models.JSONField()
    output_data = models.JSONField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']