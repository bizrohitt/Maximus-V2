from celery import shared_task
from apps.ai.services import generate_content


@shared_task
def generate_ai_content_async(prompt: str, use_local: bool = True):
    """Background task for AI content generation."""
    result = generate_content(prompt, use_local)
    # In production: store result in DB or notify user
    return result