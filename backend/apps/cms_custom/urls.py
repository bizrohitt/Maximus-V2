from django.urls import path
from . import views

app_name = 'cms_custom'

urlpatterns = [
    path('<uuid:page_id>/', views.page_editor, name='page_editor'),
    path('<uuid:page_id>/save/', views.save_page, name='save_page'),
]
