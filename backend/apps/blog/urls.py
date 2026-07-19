from django.urls import path
from .views import BlogPagesView

urlpatterns = [
    path('', BlogPagesView.as_view(), name='blog-list'),
]
