from apps.ai.clients import call_ollama, call_litellm
from typing import Dict, Any


def generate_content(prompt: str, use_local: bool = True) -> Dict[str, Any]:
    """Main AI generation service."""
    if use_local:
        result = call_ollama(prompt)
    else:
        result = call_litellm(prompt)
    
    return {
        "success": "error" not in result,
        "content": result.get("response", ""),
        "model": result.get("model", "ollama")
    }


def generate_seo_title(topic: str) -> str:
    prompt = f"Generate a compelling SEO title for: {topic}"
    result = generate_content(prompt)
    return result.get("content", topic)[:80]


def enhance_with_rag(prompt: str) -> Dict[str, Any]:
    """Enhanced generation with RAG (calls rag.py)."""
    from apps.ai.rag import rag_generate
    return rag_generate(prompt)