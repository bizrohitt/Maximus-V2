import uuid
from django.db import models
from django.utils import timezone


class CustomPage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class CustomBlock(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    template_html = models.TextField(help_text="HTML template with {{ config.field_name }} placeholders")
    default_config = models.JSONField(default=dict, blank=True)
    config_schema = models.JSONField(
        default=dict,
        blank=True,
        help_text="JSON Schema defining configurable fields for this block"
    )
    category = models.CharField(
        max_length=50,
        default='general',
        choices=[
            ('layout', 'Layout'),
            ('content', 'Content'),
            ('media', 'Media'),
            ('forms', 'Forms'),
            ('commerce', 'Commerce'),
            ('general', 'General'),
        ]
    )
    icon = models.CharField(max_length=50, default='cube', help_text="Icon identifier for UI")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category', 'name']

    def __str__(self):
        return self.name
    
    def render(self, config=None):
        """Render the block with given configuration"""
        from django.template import Context, Template
        config_data = config or self.default_config
        template = Template(self.template_html)
        context = Context({'config': config_data})
        return template.render(context)


class BlockInstance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    page = models.ForeignKey(CustomPage, on_delete=models.CASCADE, related_name='block_instances')
    block = models.ForeignKey(CustomBlock, on_delete=models.CASCADE)
    position = models.PositiveIntegerField(default=0)
    config = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['position']

    def __str__(self):
        return f"{self.block.name} on {self.page.title}"
