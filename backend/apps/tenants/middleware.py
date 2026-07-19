from django.utils.deprecation import MiddlewareMixin
from .models import Tenant


class TenantMiddleware(MiddlewareMixin):
    def process_request(self, request):
        host = request.get_host().split(':')[0]
        try:
            request.tenant = Tenant.objects.get(domain=host, is_active=True)
        except Tenant.DoesNotExist:
            request.tenant = None