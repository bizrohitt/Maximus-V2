"""
Wagtail AI Content Editor Integration
This allows AI-assisted editing directly in the Wagtail admin.
"""

from wagtail.admin.panels import FieldPanel
from apps.ai.services import generate_content


def ai_generate_field(field_name: str, prompt_template: str):
    """
    Helper to generate AI content for a Wagtail page field.
    Usage in Wagtail admin: Add custom action buttons.
    """
    def generate_action(page, request):
        prompt = prompt_template.format(title=page.title)
        result = generate_content(prompt)
        setattr(page, field_name, result.get("content", ""))
        page.save()
        return {"status": "success", "message": f"Generated content for {field_name}"}
    
    return generate_action