# Generated migration for plugin system enhancements

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('plugins', '0001_initial'),
        ('tenants', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        # Enhance Plugin model
        migrations.AddField(
            model_name='plugin',
            name='author_email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AddField(
            model_name='plugin',
            name='author_url',
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name='plugin',
            name='is_installed',
            field=models.BooleanField(default=False, help_text='Whether the plugin files are installed'),
        ),
        migrations.AddField(
            model_name='plugin',
            name='config_values',
            field=models.JSONField(blank=True, default=dict, help_text='Current configuration values'),
        ),
        migrations.AddField(
            model_name='plugin',
            name='package_url',
            field=models.URLField(blank=True, help_text='URL to download plugin package'),
        ),
        migrations.AddField(
            model_name='plugin',
            name='package_file',
            field=models.FileField(blank=True, upload_to='plugins/'),
        ),
        migrations.AddField(
            model_name='plugin',
            name='package_hash',
            field=models.CharField(blank=True, help_text='SHA256 hash of package', max_length=64),
        ),
        migrations.AddField(
            model_name='plugin',
            name='requires_python',
            field=models.CharField(blank=True, default='>=3.8', max_length=50),
        ),
        migrations.AddField(
            model_name='plugin',
            name='requires_packages',
            field=models.JSONField(default=list, help_text='List of required Python packages'),
        ),
        migrations.AddField(
            model_name='plugin',
            name='permissions',
            field=models.JSONField(default=list, help_text='List of permissions this plugin requires'),
        ),
        migrations.AddField(
            model_name='plugin',
            name='hooks',
            field=models.JSONField(default=dict, help_text='Hooks that this plugin registers (blocks, menu items, etc.)'),
        ),
        migrations.AddField(
            model_name='plugin',
            name='revenue_share_percent',
            field=models.DecimalField(
                decimal_places=2,
                default=70.00,
                help_text='Percentage of revenue that goes to the author',
                max_digits=5
            ),
        ),
        migrations.AddField(
            model_name='plugin',
            name='homepage_url',
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name='plugin',
            name='documentation_url',
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name='plugin',
            name='repository_url',
            field=models.URLField(blank=True),
        ),
        migrations.AlterField(
            model_name='plugin',
            name='is_active',
            field=models.BooleanField(default=False, help_text='Whether the plugin is currently activated'),
        ),
        migrations.AlterField(
            model_name='plugin',
            name='config_schema',
            field=models.JSONField(default=dict, help_text='JSON Schema for plugin configuration'),
        ),
        migrations.AlterModelOptions(
            name='plugin',
            options={'ordering': ['-created_at']},
        ),
        
        # Enhance PluginReview model
        migrations.AlterModelOptions(
            name='pluginreview',
            options={'ordering': ['-created_at']},
        ),
        
        # Create PluginInstallation model
        migrations.CreateModel(
            name='PluginInstallation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
                ('installed_version', models.CharField(max_length=20)),
                ('config_values', models.JSONField(default=dict)),
                ('plugin', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='installations',
                    to='plugins.plugin'
                )),
                ('tenant', models.ForeignKey(
                    blank=True,
                    null=True,
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='plugin_installations',
                    to='tenants.tenant'
                )),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.AlterUniqueTogether(
            name='plugininstallation',
            unique_together={('plugin', 'tenant')},
        ),
    ]
