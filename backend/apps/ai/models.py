from django.db import models
from apps.core.models import BaseModel


class AITool(BaseModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    prompt_template = models.TextField(
        help_text="Use {{input}} as placeholder for user input"
    )
    is_active = models.BooleanField(default=True)
    usage_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class PromptTemplate(BaseModel):
    """Admin can create reusable prompts."""
    name = models.CharField(max_length=100)
    prompt = models.TextField()
    category = models.CharField(max_length=50, default="general")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class AIToolUsage(BaseModel):
    tool = models.ForeignKey(AITool, on_delete=models.CASCADE)
    input_text = models.TextField()
    output_text = models.TextField(blank=True)