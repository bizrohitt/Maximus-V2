from typing import Dict, Any
from apps.tools.models import Tool, ToolUsage
from apps.users.models import User


def create_tool(name: str, slug: str, description: str, **kwargs) -> Tool:
    return Tool.objects.create(
        name=name,
        slug=slug,
        description=description,
        **kwargs
    )


def record_tool_usage(user: User, tool: Tool, input_data: Dict[str, Any]) -> ToolUsage:
    return ToolUsage.objects.create(
        user=user,
        tool=tool,
        input_data=input_data
    )