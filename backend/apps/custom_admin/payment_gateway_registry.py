"""
Payment Gateway Plugin Registry
================================
This system allows payment gateways to be registered as plugins.
New gateways can be added without modifying the core codebase.
"""

from typing import Dict, List, Any

REGISTERED_GATEWAYS: Dict[str, Dict[str, Any]] = {}


def register_payment_gateway(
    slug: str,
    name: str,
    config_fields: List[str],
    supported_currencies: List[str] = None,
    metadata: Dict = None
):
    """
    Register a payment gateway.
    """
    REGISTERED_GATEWAYS[slug] = {
        "name": name,
        "config_fields": config_fields,
        "supported_currencies": supported_currencies or ["USD", "INR"],
        "metadata": metadata or {},
    }


def get_registered_gateways() -> Dict[str, Dict[str, Any]]:
    return REGISTERED_GATEWAYS


def get_gateway_config_fields(slug: str) -> List[str]:
    gateway = REGISTERED_GATEWAYS.get(slug, {})
    return gateway.get("config_fields", [])


# ============================================
# Default Gateways (Pre-registered)
# ============================================

register_payment_gateway(
    slug='stripe',
    name='Stripe',
    config_fields=['publishable_key', 'secret_key', 'webhook_secret'],
    supported_currencies=['USD', 'EUR', 'INR']
)

register_payment_gateway(
    slug='razorpay',
    name='Razorpay',
    config_fields=['key_id', 'key_secret', 'webhook_secret'],
    supported_currencies=['INR']
)

register_payment_gateway(
    slug='paypal',
    name='PayPal',
    config_fields=['client_id', 'client_secret', 'mode'],
    supported_currencies=['USD', 'EUR']
)
