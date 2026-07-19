from apps.ai.services import generate_content
from typing import Dict, Any


class ContentAgent:
    """AI Agent for content generation."""

    def __init__(self, use_local: bool = True):
        self.use_local = use_local

    def generate_blog_post(self, topic: str) -> Dict[str, Any]:
        prompt = f"Write a detailed, SEO-optimized blog post about: {topic}"
        return generate_content(prompt, self.use_local)

    def generate_tool_description(self, tool_name: str) -> str:
        prompt = f"Write a short, persuasive description for an AI tool called '{tool_name}'"
        result = generate_content(prompt, self.use_local)
        return result.get("content", "")


class SEOAgent:
    """AI Agent for SEO tasks."""

    def generate_meta_description(self, content: str) -> str:
        prompt = f"Create a 160-character meta description for this content: {content[:500]}"
        result = generate_content(prompt)
        return result.get("content", "")[:160]