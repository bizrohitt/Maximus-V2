"""AI Tool Executor - Simple implementation for tool execution."""
import json
from typing import Optional

from .clients import call_ai


def execute_tool(tool, user_input: str, user=None) -> dict:
    """Execute an AI tool with the given input."""
    if not tool.prompt_template:
        return {"error": "Tool has no prompt template"}
    
    prompt = tool.prompt_template.replace("{{input}}", user_input)
    
    result = call_ai(prompt, tool.model)
    
    if result.get("success"):
        return {
            "success": True,
            "content": result["content"],
            "model": result.get("model"),
            "provider": result.get("provider"),
        }
    
    return {"error": result.get("error", "Unknown error")}


def execute_tool_streaming(tool, user_input: str, user=None):
    """Stream tool execution (not implemented, falls back to regular)."""
    return execute_tool(tool, user_input, user)