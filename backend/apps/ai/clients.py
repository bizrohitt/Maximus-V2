import os
import requests
from typing import Dict, Any

# ============================================
# Flexible AI Provider Configuration
# ============================================

AI_PROVIDER = os.environ.get("AI_PROVIDER", "groq").lower()  # groq, openrouter, together

# API Keys
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
TOGETHER_API_KEY = os.environ.get("TOGETHER_API_KEY", "")

# Base URLs
GROQ_BASE_URL = "https://api.groq.com/openai/v1/chat/completions"
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
TOGETHER_BASE_URL = "https://api.together.xyz/v1/chat/completions"


def call_ai(prompt: str, model: str = None, system: str = None) -> Dict[str, Any]:
    """
    Universal AI function that routes to the configured provider.
    """
    provider = AI_PROVIDER

    if provider == "groq":
        return _call_groq(prompt, model, system)
    elif provider == "openrouter":
        return _call_openrouter(prompt, model, system)
    elif provider == "together":
        return _call_together(prompt, model, system)
    else:
        return {"error": f"Unsupported AI provider: {provider}"}


def _call_groq(prompt: str, model: str = None, system: str = None) -> Dict[str, Any]:
    if not GROQ_API_KEY:
        return {"error": "GROQ_API_KEY is not set"}

    model = model or "llama-3.1-8b-instant"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})

    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 500
    }

    try:
        response = requests.post(GROQ_BASE_URL, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()
        return {
            "success": True,
            "content": data["choices"][0]["message"]["content"],
            "provider": "groq",
            "model": model
        }
    except Exception as e:
        return {"error": str(e)}


def _call_openrouter(prompt: str, model: str = None, system: str = None) -> Dict[str, Any]:
    if not OPENROUTER_API_KEY:
        return {"error": "OPENROUTER_API_KEY is not set"}

    model = model or "meta-llama/llama-3.1-8b-instruct"

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://maximus.dev"
    }

    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})

    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 500
    }

    try:
        response = requests.post(OPENROUTER_BASE_URL, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()
        return {
            "success": True,
            "content": data["choices"][0]["message"]["content"],
            "provider": "openrouter",
            "model": model
        }
    except Exception as e:
        return {"error": str(e)}


def _call_together(prompt: str, model: str = None, system: str = None) -> Dict[str, Any]:
    if not TOGETHER_API_KEY:
        return {"error": "TOGETHER_API_KEY is not set"}

    model = model or "meta-llama/Llama-3.1-8B-Instruct-Turbo"

    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})

    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 500
    }

    try:
        response = requests.post(TOGETHER_BASE_URL, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()
        return {
            "success": True,
            "content": data["choices"][0]["message"]["content"],
            "provider": "together",
            "model": model
        }
    except Exception as e:
        return {"error": str(e)}