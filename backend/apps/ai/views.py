from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .clients import call_ai
from .models import AITool
from .tool_executor import execute_tool

# ponytail: tool-specific system prompts map, migrate to DB if >20 tools
TOOL_SYSTEM_PROMPTS = {
    'seo-title-generator': (
        'You are an expert SEO copywriter. Generate 5-10 click-worthy SEO title '
        'variations for the given topic. Each title must be 50-60 characters, '
        'include target keywords naturally, and use emotional triggers. '
        'Format each title on a new line starting with "- ". Do NOT number them.'
    ),
    'meta-description-writer': (
        'You are an SEO content strategist. Write 3-5 meta descriptions for the '
        'given content. Each description must be 150-160 characters, include '
        'a call-to-action, and naturally contain target keywords. '
        'Format each on a new line starting with "- ".'
    ),
    'blog-intro-generator': (
        'You are a professional blog writer. Write one engaging introductory '
        'paragraph (100-200 words) for the given blog topic. Use a hook-first '
        'approach, keep it scannable, and end with a transition to the main content. '
        'Output only the intro paragraph, no labels.'
    ),
    'content-outline-builder': (
        'You are a content strategist. Generate a detailed content outline for the '
        'given topic. Include H2 and H3 headings, brief notes under each section, '
        'and suggested keywords to cover. Format with "# " for H2 and "## " for H3, '
        'and bullet points under each heading.'
    ),
    'ai-pdf-reader': (
        'You are a document analyst. Analyze the user\'s PDF content and provide '
        'a clear summary, key points, and actionable insights. Structure your '
        'response with "## Summary", "## Key Points", and "## Insights" sections.'
    ),
    'ai-search': (
        'You are a research assistant. Provide comprehensive answers to questions '
        'based on real-time information. Structure responses with a direct answer '
        'followed by key details. Cite sources naturally in your response.'
    ),
    'ai-assistant': (
        'You are a helpful AI assistant. Provide clear, accurate, and actionable '
        'responses. Tailor your tone to the user\'s needs — professional for '
        'business queries, casual for creative help. Include examples when helpful.'
    ),
}


@api_view(['POST'])
@permission_classes([AllowAny])
def generate_ai_content(request):
    """Public API endpoint for AI generation."""
    prompt = request.data.get('prompt')
    tool_slug = request.data.get('tool')
    model = request.data.get('model')

    if not prompt:
        return Response({"error": "Prompt is required"}, status=400)

    system_prompt = TOOL_SYSTEM_PROMPTS.get(tool_slug) if tool_slug else None
    result = call_ai(prompt, model, system=system_prompt)
    return Response(result)


@api_view(['POST'])
@permission_classes([AllowAny])
def run_ai_tool(request):
    """Execute a registered AI tool."""
    tool_slug = request.data.get('tool_slug')
    user_input = request.data.get('input')

    if not tool_slug or not user_input:
        return Response({"error": "tool_slug and input are required"}, status=400)

    try:
        tool = AITool.objects.get(slug=tool_slug, is_active=True)
    except AITool.DoesNotExist:
        return Response({"error": "Tool not found or inactive"}, status=404)

    result = execute_tool(tool, user_input, user=request.user if request.user.is_authenticated else None)
    return Response(result)
