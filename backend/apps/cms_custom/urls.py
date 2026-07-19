from django.urls import path
from . import views

app_name = 'cms_custom'

urlpatterns = [
    path('<uuid:page_id>/', views.page_editor, name='page_editor'),
    path('<uuid:page_id>/save/', views.save_page, name='save_page'),
    path('<uuid:page_id>/preview/', views.preview_page, name='preview_page'),
    path('<uuid:page_id>/blocks/<uuid:block_instance_id>/delete/', views.delete_block, name='delete_block'),
    path('<uuid:page_id>/blocks/reorder/', views.reorder_blocks, name='reorder_blocks'),
]
