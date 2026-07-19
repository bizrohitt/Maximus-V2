from django.shortcuts import render, get_object_or_404
from django.contrib.admin.views.decorators import staff_member_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomPage, CustomBlock, BlockInstance


@staff_member_required
def page_editor(request, page_id):
    """Visual Drag-and-Drop Page Editor"""
    page = get_object_or_404(CustomPage, id=page_id)
    available_blocks = CustomBlock.objects.filter(is_active=True)
    used_blocks = BlockInstance.objects.filter(page=page).order_by('position')

    context = {
        'page': page,
        'available_blocks': available_blocks,
        'used_blocks': used_blocks,
    }
    return render(request, 'cms_custom/editor.html', context)


@staff_member_required
@csrf_exempt
def save_page(request, page_id):
    """Save the page layout (blocks + configuration)"""
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=400)

    try:
        page = CustomPage.objects.get(id=page_id)
        data = json.loads(request.body)
        blocks_data = data.get('blocks', [])

        # Delete all existing blocks for this page
        BlockInstance.objects.filter(page=page).delete()

        saved_count = 0

        # Save new blocks
        for index, block_data in enumerate(blocks_data):
            try:
                block_id = block_data.get('id')
                if not block_id:
                    continue

                custom_block = CustomBlock.objects.get(id=block_id)
                
                BlockInstance.objects.create(
                    page=page,
                    block=custom_block,
                    position=index,
                    config=block_data.get('config', {})
                )
                saved_count += 1
            except CustomBlock.DoesNotExist:
                continue
            except Exception as e:
                print(f"Error saving block: {e}")
                continue

        return JsonResponse({
            'success': True,
            'message': 'Page saved successfully',
            'blocks_saved': saved_count
        })

    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@staff_member_required
def preview_page(request, page_id):
    """Preview the page with all blocks rendered"""
    page = get_object_or_404(CustomPage, id=page_id)
    block_instances = BlockInstance.objects.filter(page=page).select_related('block').order_by('position')
    
    rendered_blocks = []
    for instance in block_instances:
        try:
            rendered_html = instance.block.render(instance.config)
            rendered_blocks.append({
                'id': str(instance.id),
                'name': instance.block.name,
                'html': rendered_html
            })
        except Exception as e:
            rendered_blocks.append({
                'id': str(instance.id),
                'name': instance.block.name,
                'html': f'<div class="error">Error rendering block: {str(e)}</div>'
            })
    
    return render(request, 'cms_custom/preview.html', {
        'page': page,
        'rendered_blocks': rendered_blocks,
    })


@staff_member_required
@csrf_exempt
def delete_block(request, page_id, block_instance_id):
    """Delete a block instance from a page"""
    if request.method != 'DELETE':
        return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=400)
    
    try:
        block_instance = BlockInstance.objects.get(id=block_instance_id, page_id=page_id)
        block_instance.delete()
        
        # Reorder remaining blocks
        remaining_blocks = BlockInstance.objects.filter(page_id=page_id).order_by('position')
        for index, block in enumerate(remaining_blocks):
            block.position = index
            block.save(update_fields=['position'])
        
        return JsonResponse({
            'success': True,
            'message': 'Block deleted successfully'
        })
    except BlockInstance.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Block not found'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@staff_member_required
@csrf_exempt
def reorder_blocks(request, page_id):
    """Reorder blocks on a page"""
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=400)
    
    try:
        data = json.loads(request.body)
        block_order = data.get('block_order', [])  # List of block instance IDs in desired order
        
        for index, block_id in enumerate(block_order):
            BlockInstance.objects.filter(id=block_id, page_id=page_id).update(position=index)
        
        return JsonResponse({
            'success': True,
            'message': 'Blocks reordered successfully'
        })
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)