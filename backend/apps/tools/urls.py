from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ToolViewSet, ToolUsageViewSet

router = DefaultRouter()
router.register(r'tools', ToolViewSet)
router.register(r'usage', ToolUsageViewSet, basename='toolusage')

urlpatterns = [
    path('', include(router.urls)),
]
