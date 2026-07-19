from django.db import models
from apps.core.models import BaseModel


class Plugin(BaseModel):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    version = models.CharField(max_length=20)
    description = models.TextField()
    author = models.CharField(max_length=255)
    author_email = models.EmailField(blank=True)
    author_url = models.URLField(blank=True)
    
    is_active = models.BooleanField(default=False, help_text="Whether the plugin is currently activated")
    is_installed = models.BooleanField(default=False, help_text="Whether the plugin files are installed")
    
    config_schema = models.JSONField(default=dict, help_text="JSON Schema for plugin configuration")
    config_values = models.JSONField(default=dict, help_text="Current configuration values")
    
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    download_count = models.PositiveIntegerField(default=0)
    
    # Plugin package info
    package_url = models.URLField(blank=True, help_text="URL to download plugin package")
    package_file = models.FileField(upload_to='plugins/', blank=True)
    package_hash = models.CharField(max_length=64, blank=True, help_text="SHA256 hash of package")
    
    # Requirements
    requires_python = models.CharField(max_length=50, blank=True, default=">=3.8")
    requires_packages = models.JSONField(default=list, help_text="List of required Python packages")
    
    # Permissions & Hooks
    permissions = models.JSONField(
        default=list,
        help_text="List of permissions this plugin requires"
    )
    hooks = models.JSONField(
        default=dict,
        help_text="Hooks that this plugin registers (blocks, menu items, etc.)"
    )
    
    # Revenue sharing (for marketplace)
    revenue_share_percent = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=70.00,
        help_text="Percentage of revenue that goes to the author"
    )
    
    # Metadata
    homepage_url = models.URLField(blank=True)
    documentation_url = models.URLField(blank=True)
    repository_url = models.URLField(blank=True)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} v{self.version}"


class PluginReview(BaseModel):
    plugin = models.ForeignKey(Plugin, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)

    class Meta:
        unique_together = ('plugin', 'user')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.plugin.name} ({self.rating}/5)"


class PluginInstallation(BaseModel):
    """Track plugin installations per tenant"""
    plugin = models.ForeignKey(Plugin, on_delete=models.CASCADE, related_name='installations')
    tenant = models.ForeignKey('tenants.Tenant', on_delete=models.CASCADE, related_name='plugin_installations', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    installed_version = models.CharField(max_length=20)
    config_values = models.JSONField(default=dict)
    
    class Meta:
        unique_together = ('plugin', 'tenant')
        ordering = ['-created_at']
    
    def __str__(self):
        tenant_name = self.tenant.name if self.tenant else "Global"
        return f"{self.plugin.name} on {tenant_name}"