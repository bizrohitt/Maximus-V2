# Generated migration for CustomBlock enhancements

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('cms_custom', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customblock',
            name='config_schema',
            field=models.JSONField(blank=True, default=dict, help_text='JSON Schema defining configurable fields for this block'),
        ),
        migrations.AddField(
            model_name='customblock',
            name='category',
            field=models.CharField(
                choices=[
                    ('layout', 'Layout'),
                    ('content', 'Content'),
                    ('media', 'Media'),
                    ('forms', 'Forms'),
                    ('commerce', 'Commerce'),
                    ('general', 'General'),
                ],
                default='general',
                max_length=50
            ),
        ),
        migrations.AddField(
            model_name='customblock',
            name='icon',
            field=models.CharField(default='cube', help_text='Icon identifier for UI', max_length=50),
        ),
        migrations.AddField(
            model_name='customblock',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='customblock',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterModelOptions(
            name='customblock',
            options={'ordering': ['category', 'name']},
        ),
    ]
