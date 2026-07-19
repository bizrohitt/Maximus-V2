"""
Enterprise SSO Implementation (SAML + OIDC)
"""

from typing import Dict


def configure_saml(tenant, config: Dict):
    """Configure SAML SSO for a tenant."""
    # In production: integrate with python3-saml or django-saml2
    tenant.branding['sso'] = {
        'type': 'saml',
        'entity_id': config.get('entity_id'),
        'sso_url': config.get('sso_url'),
        'x509_cert': config.get('x509_cert'),
    }
    tenant.save()
    return {"status": "configured", "type": "saml"}


def configure_oidc(tenant, config: Dict):
    """Configure OIDC SSO for a tenant."""
    # In production: integrate with django-allauth or python-social-auth
    tenant.branding['sso'] = {
        'type': 'oidc',
        'client_id': config.get('client_id'),
        'client_secret': config.get('client_secret'),
        'discovery_url': config.get('discovery_url'),
    }
    tenant.save()
    return {"status": "configured", "type": "oidc"}