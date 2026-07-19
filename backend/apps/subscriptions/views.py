from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.subscriptions.models import SubscriptionPlan
from apps.subscriptions.stripe import create_checkout_session
from django.conf import settings


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_subscription_checkout(request):
    plan_id = request.data.get('plan_id')
    plan = SubscriptionPlan.objects.get(id=plan_id)

    session = create_checkout_session(
        user=request.user,
        plan=plan,
        success_url=f"{settings.FRONTEND_URL}/dashboard/billing?success=true",
        cancel_url=f"{settings.FRONTEND_URL}/dashboard/billing?canceled=true"
    )
    return Response({"checkout_url": session.url})