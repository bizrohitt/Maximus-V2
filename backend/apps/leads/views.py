from rest_framework import viewsets, permissions
from .models import LeadForm, LeadSubmission
from .serializers import LeadFormSerializer, LeadSubmissionSerializer


class LeadFormViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeadForm.objects.filter(is_active=True)
    serializer_class = LeadFormSerializer
    permission_classes = [permissions.AllowAny]


class LeadSubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSubmissionSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        if self.request.user.is_staff:
            return LeadSubmission.objects.all()
        return LeadSubmission.objects.none()

    def perform_create(self, serializer):
        serializer.save()
