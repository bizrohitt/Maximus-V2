from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .services import install_plugin, get_available_plugins
from .marketplace import get_marketplace_plugins


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def install_plugin_view(request):
    plugin_id = request.data.get('plugin_id')
    # In real implementation, get tenant from request
    return Response({"message": "Plugin installation initiated"})


@api_view(['GET'])
def marketplace_list(request):
    plugins = get_marketplace_plugins()
    data = [
        {
            "id": str(p.id),
            "name": p.name,
            "version": p.version,
            "description": p.description,
            "price": float(p.price),
            "author": p.author
        } for p in plugins
    ]
    return Response(data)