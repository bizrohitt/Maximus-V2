import stripe
import os
from django.conf import settings
from apps.subscriptions.models import UserSubscription, SubscriptionPlan
from apps.users.models import User

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")


def create_checkout_session(user: User, plan: SubscriptionPlan, success_url: str, cancel_url: str):
    """Create a Stripe Checkout session."""
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        customer_email=user.email,
        line_items=[{
            'price': plan.stripe_price_id,
            'quantity': 1,
        }],
        mode='subscription',
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            'user_id': str(user.id),
            'plan_id': str(plan.id)
        }
    )
    return session


def handle_webhook_event(event):
    """Handle Stripe webhook events."""
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        user_id = session['metadata']['user_id']
        plan_id = session['metadata']['plan_id']

        user = User.objects.get(id=user_id)
        plan = SubscriptionPlan.objects.get(id=plan_id)

        UserSubscription.objects.create(
            user=user,
            plan=plan,
            stripe_subscription_id=session['subscription'],
            status='active'
        )
        return True
    return False