from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeadFormViewSet, LeadSubmissionViewSet

router = DefaultRouter()
router.register(r'forms', LeadFormViewSet)
router.register(r'submissions', LeadSubmissionViewSet, basename='leadsubmission')

urlpatterns = [
    path('', include(router.urls)),
]
