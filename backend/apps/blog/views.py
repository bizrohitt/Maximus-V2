from rest_framework.views import APIView
from rest_framework.response import Response
from wagtail.models import Page
from .serializers import BlogPageSerializer


class BlogPagesView(APIView):
    def get(self, request):
        pages = Page.objects.live().public().filter(content_type__model='blogdetailpage')
        data = BlogPageSerializer(pages, many=True).data
        return Response({'success': True, 'data': data})
