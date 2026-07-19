from apps.subscriptions.models import SubscriptionPlan, UserSubscription
from apps.users.models import User


def create_plan(name: str, slug: str, price: float, **kwargs) -> SubscriptionPlan:
    return SubscriptionPlan.objects.create(
        name=name,
        slug=slug,
        price=price,
        **kwargs
    )


def subscribe_user(user: User, plan: SubscriptionPlan) -> UserSubscription:
    return UserSubscription.objects.create(user=user, plan=plan)