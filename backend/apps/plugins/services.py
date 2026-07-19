import os
import shutil
import hashlib
import zipfile
import json
from pathlib import Path
from django.conf import settings
from django.core.management import call_command
from apps.plugins.models import Plugin, PluginInstallation
from apps.tenants.models import Tenant


PLUGIN_DIR = Path(settings.BASE_DIR) / 'plugins_installed'


def install_plugin(plugin: Plugin, tenant: Tenant = None):
    """
    Install a plugin: extract files, run migrations, register hooks.
    
    Args:
        plugin: Plugin model instance
        tenant: Optional tenant for multi-tenant installations
    
    Returns:
        dict: Installation status and details
    """
    try:
        # Create plugins directory if not exists
        PLUGIN_DIR.mkdir(exist_ok=True)
        
        # Create plugin-specific directory
        plugin_path = PLUGIN_DIR / plugin.slug
        
        if plugin_path.exists():
            return {
                "status": "error",
                "message": f"Plugin {plugin.slug} is already installed"
            }
        
        # Extract plugin package
        if plugin.package_file:
            _extract_plugin_package(plugin, plugin_path)
        else:
            return {
                "status": "error",
                "message": "Plugin package file not found"
            }
        
        # Verify package integrity
        if plugin.package_hash:
            if not _verify_package_hash(plugin.package_file.path, plugin.package_hash):
                shutil.rmtree(plugin_path)
                return {
                    "status": "error",
                    "message": "Package integrity check failed"
                }
        
        # Install Python dependencies
        if plugin.requires_packages:
            _install_dependencies(plugin.requires_packages)
        
        # Run plugin migrations if any
        _run_plugin_migrations(plugin.slug)
        
        # Register plugin hooks (blocks, menu items, etc.)
        _register_plugin_hooks(plugin)
        
        # Mark plugin as installed
        plugin.is_installed = True
        plugin.save()
        
        # Create installation record
        PluginInstallation.objects.create(
            plugin=plugin,
            tenant=tenant,
            installed_version=plugin.version,
            is_active=False  # Not activated yet
        )
        
        return {
            "status": "installed",
            "plugin": plugin.slug,
            "version": plugin.version,
            "tenant": tenant.slug if tenant else None
        }
        
    except Exception as e:
        # Cleanup on failure
        if plugin_path.exists():
            shutil.rmtree(plugin_path)
        
        return {
            "status": "error",
            "message": str(e)
        }


def activate_plugin(plugin: Plugin, tenant: Tenant = None):
    """Activate an installed plugin."""
    try:
        if not plugin.is_installed:
            return {
                "status": "error",
                "message": "Plugin must be installed before activation"
            }
        
        # Get or create installation record
        installation, created = PluginInstallation.objects.get_or_create(
            plugin=plugin,
            tenant=tenant,
            defaults={
                'installed_version': plugin.version,
                'is_active': True
            }
        )
        
        if not created:
            installation.is_active = True
            installation.save()
        
        # Mark global plugin as active
        plugin.is_active = True
        plugin.save()
        
        return {
            "status": "activated",
            "plugin": plugin.slug,
            "tenant": tenant.slug if tenant else None
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


def deactivate_plugin(plugin: Plugin, tenant: Tenant = None):
    """Deactivate a plugin without uninstalling."""
    try:
        installation = PluginInstallation.objects.filter(
            plugin=plugin,
            tenant=tenant
        ).first()
        
        if installation:
            installation.is_active = False
            installation.save()
        
        # Check if plugin is active for any tenant
        if not PluginInstallation.objects.filter(plugin=plugin, is_active=True).exists():
            plugin.is_active = False
            plugin.save()
        
        return {
            "status": "deactivated",
            "plugin": plugin.slug,
            "tenant": tenant.slug if tenant else None
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


def uninstall_plugin(tenant: Tenant, plugin: Plugin):
    """Completely uninstall a plugin: deactivate, remove files, clean database."""
    try:
        # Deactivate first
        deactivate_plugin(plugin, tenant)
        
        # Remove installation record
        PluginInstallation.objects.filter(plugin=plugin, tenant=tenant).delete()
        
        # If no other tenants use this plugin, remove files
        if not PluginInstallation.objects.filter(plugin=plugin).exists():
            plugin_path = PLUGIN_DIR / plugin.slug
            
            if plugin_path.exists():
                shutil.rmtree(plugin_path)
            
            plugin.is_installed = False
            plugin.save()
        
        return {
            "status": "uninstalled",
            "tenant": tenant.slug if tenant else None,
            "plugin": plugin.slug
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


def get_available_plugins():
    """Return all active plugins in the marketplace."""
    return Plugin.objects.filter(is_active=True)


def get_installed_plugins(tenant: Tenant = None):
    """Get all installed plugins for a tenant."""
    if tenant:
        return PluginInstallation.objects.filter(
            tenant=tenant,
            is_active=True
        ).select_related('plugin')
    
    return Plugin.objects.filter(is_installed=True)


def update_plugin_config(plugin: Plugin, config_values: dict, tenant: Tenant = None):
    """Update plugin configuration values."""
    try:
        installation = PluginInstallation.objects.filter(
            plugin=plugin,
            tenant=tenant
        ).first()
        
        if installation:
            installation.config_values = config_values
            installation.save()
            
            return {
                "status": "success",
                "message": "Configuration updated"
            }
        
        return {
            "status": "error",
            "message": "Plugin installation not found"
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


# Private helper functions

def _extract_plugin_package(plugin: Plugin, target_path: Path):
    """Extract plugin package to target directory."""
    if plugin.package_file.name.endswith('.zip'):
        with zipfile.ZipFile(plugin.package_file.path, 'r') as zip_ref:
            zip_ref.extractall(target_path)
    else:
        # Handle other archive formats if needed
        raise ValueError(f"Unsupported package format: {plugin.package_file.name}")


def _verify_package_hash(file_path: str, expected_hash: str) -> bool:
    """Verify file integrity using SHA256 hash."""
    sha256_hash = hashlib.sha256()
    
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    
    return sha256_hash.hexdigest() == expected_hash


def _install_dependencies(packages: list):
    """Install Python package dependencies."""
    import subprocess
    
    for package in packages:
        try:
            subprocess.check_call(['pip', 'install', package])
        except subprocess.CalledProcessError as e:
            print(f"Failed to install {package}: {e}")


def _run_plugin_migrations(plugin_slug: str):
    """Run Django migrations for a plugin."""
    try:
        call_command('migrate', plugin_slug, '--noinput')
    except Exception as e:
        print(f"Migration failed for {plugin_slug}: {e}")


def _register_plugin_hooks(plugin: Plugin):
    """Register plugin hooks (blocks, menu items, widgets, etc.)."""
    hooks = plugin.hooks
    
    # Register custom blocks for the page editor
    if 'blocks' in hooks:
        from apps.cms_custom.models import CustomBlock
        
        for block_data in hooks['blocks']:
            CustomBlock.objects.get_or_create(
                name=f"{plugin.slug}_{block_data['name']}",
                defaults={
                    'description': block_data.get('description', ''),
                    'template_html': block_data.get('template', ''),
                    'default_config': block_data.get('default_config', {}),
                    'config_schema': block_data.get('config_schema', {}),
                    'category': block_data.get('category', 'general'),
                }
            )
    
    # Register admin menu items
    if 'menu_items' in hooks:
        # This would integrate with the admin dashboard navigation
        pass
    
    # Register widgets
    if 'widgets' in hooks:
        # This would register dashboard widgets
        pass