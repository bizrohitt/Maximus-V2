from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DirectoryEntryViewSet

router = DefaultRouter()
router.register(r'directories', DirectoryEntryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
