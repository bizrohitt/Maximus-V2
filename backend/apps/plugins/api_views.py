"""API views for plugin management"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apps.plugins.models import Plugin, PluginReview, PluginInstallation
from apps.plugins.services import (
    install_plugin,
    activate_plugin,
    deactivate_plugin,
    uninstall_plugin,
    get_available_plugins,
    get_installed_plugins,
    update_plugin_config
)
from apps.tenants.models import Tenant


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def plugin_marketplace_list(request):
    """List all plugins available in the marketplace."""
    plugins = get_available_plugins()
    
    # Apply filters
    category = request.query_params.get('category')
    search = request.query_params.get('search')
    
    if category:
        plugins = plugins.filter(hooks__contains={'category': category})
    
    if search:
        plugins = plugins.filter(name__icontains=search) | plugins.filter(description__icontains=search)
    
    # Serialize
    data = []
    for plugin in plugins:
        avg_rating = plugin.reviews.aggregate(avg=models.Avg('rating'))['avg'] or 0
        data.append({
            'id': str(plugin.id),
            'name': plugin.name,
            'slug': plugin.slug,
            'version': plugin.version,
            'description': plugin.description,
            'author': plugin.author,
            'price': float(plugin.price),
            'download_count': plugin.download_count,
            'average_rating': round(avg_rating, 1),
            'review_count': plugin.reviews.count(),
            'is_installed': plugin.is_installed,
            'is_active': plugin.is_active,
            'created_at': plugin.created_at.isoformat(),
        })
    
    return Response({'plugins': data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def plugin_detail(request, plugin_id):
    """Get detailed information about a specific plugin."""
    plugin = get_object_or_404(Plugin, id=plugin_id)
    
    reviews = plugin.reviews.select_related('user').order_by('-created_at')[:10]
    avg_rating = plugin.reviews.aggregate(avg=models.Avg('rating'))['avg'] or 0
    
    data = {
        'id': str(plugin.id),
        'name': plugin.name,
        'slug': plugin.slug,
        'version': plugin.version,
        'description': plugin.description,
        'author': plugin.author,
        'author_email': plugin.author_email,
        'author_url': plugin.author_url,
        'price': float(plugin.price),
        'download_count': plugin.download_count,
        'is_installed': plugin.is_installed,
        'is_active': plugin.is_active,
        'requires_python': plugin.requires_python,
        'requires_packages': plugin.requires_packages,
        'permissions': plugin.permissions,
        'hooks': plugin.hooks,
        'config_schema': plugin.config_schema,
        'homepage_url': plugin.homepage_url,
        'documentation_url': plugin.documentation_url,
        'repository_url': plugin.repository_url,
        'average_rating': round(avg_rating, 1),
        'review_count': plugin.reviews.count(),
        'reviews': [
            {
                'user': review.user.email,
                'rating': review.rating,
                'comment': review.comment,
                'created_at': review.created_at.isoformat(),
            }
            for review in reviews
        ],
        'created_at': plugin.created_at.isoformat(),
    }
    
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def plugin_install(request, plugin_id):
    """Install a plugin."""
    plugin = get_object_or_404(Plugin, id=plugin_id)
    tenant_id = request.data.get('tenant_id')
    
    tenant = None
    if tenant_id:
        tenant = get_object_or_404(Tenant, id=tenant_id)
    
    result = install_plugin(plugin, tenant)
    
    if result['status'] == 'error':
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(result)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def plugin_activate(request, plugin_id):
    """Activate an installed plugin."""
    plugin = get_object_or_404(Plugin, id=plugin_id)
    tenant_id = request.data.get('tenant_id')
    
    tenant = None
    if tenant_id:
        tenant = get_object_or_404(Tenant, id=tenant_id)
    
    result = activate_plugin(plugin, tenant)
    
    if result['status'] == 'error':
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(result)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def plugin_deactivate(request, plugin_id):
    """Deactivate a plugin."""
    plugin = get_object_or_404(Plugin, id=plugin_id)
    tenant_id = request.data.get('tenant_id')
    
    tenant = None
    if tenant_id:
        tenant = get_object_or_404(Tenant, id=tenant_id)
    
    result = deactivate_plugin(plugin, tenant)
    
    if result['status'] == 'error':
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(result)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def plugin_uninstall(request, plugin_id):
    """Uninstall a plugin."""
    plugin = get_object_or_404(Plugin, id=plugin_id)
    tenant_id = request.data.get('tenant_id')
    
    tenant = None
    if tenant_id:
        tenant = get_object_or_404(Tenant, id=tenant_id)
    else:
        return Response(
            {'error': 'tenant_id is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    result = uninstall_plugin(tenant, plugin)
    
    if result['status'] == 'error':
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(result)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def plugin_installed_list(request):
    """List all installed plugins."""
    tenant_id = request.query_params.get('tenant_id')
    
    tenant = None
    if tenant_id:
        tenant = get_object_or_404(Tenant, id=tenant_id)
    
    installations = get_installed_plugins(tenant)
    
    data = []
    if isinstance(installations, models.QuerySet) and installations.model == PluginInstallation:
        for installation in installations:
            data.append({
                'id': str(installation.id),
                'plugin': {
                    'id': str(installation.plugin.id),
                    'name': installation.plugin.name,
                    'slug': installation.plugin.slug,
                    'version': installation.plugin.version,
                },
                'installed_version': installation.installed_version,
                'is_active': installation.is_active,
                'config_values': installation.config_values,
                'installed_at': installation.created_at.isoformat(),
            })
    else:
        for plugin in installations:
            data.append({
                'id': str(plugin.id),
                'name': plugin.name,
                'slug': plugin.slug,
                'version': plugin.version,
                'is_active': plugin.is_active,
                'is_installed': plugin.is_installed,
            })
    
    return Response({'plugins': data})


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def plugin_update_config(request, plugin_id):
    """Update plugin configuration."""
    plugin = get_object_or_404(Plugin, id=plugin_id)
    tenant_id = request.data.get('tenant_id')
    config_values = request.data.get('config_values', {})
    
    tenant = None
    if tenant_id:
        tenant = get_object_or_404(Tenant, id=tenant_id)
    
    result = update_plugin_config(plugin, config_values, tenant)
    
    if result['status'] == 'error':
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(result)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def plugin_review_create(request, plugin_id):
    """Create or update a review for a plugin."""
    plugin = get_object_or_404(Plugin, id=plugin_id)
    user = request.user
    
    rating = request.data.get('rating')
    comment = request.data.get('comment', '')
    
    if not rating or rating not in range(1, 6):
        return Response(
            {'error': 'Rating must be between 1 and 5'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    review, created = PluginReview.objects.update_or_create(
        plugin=plugin,
        user=user,
        defaults={
            'rating': rating,
            'comment': comment,
        }
    )
    
    return Response({
        'id': str(review.id),
        'rating': review.rating,
        'comment': review.comment,
        'created': created,
    })


# Import models at the end to avoid circular imports
from django.db import models
