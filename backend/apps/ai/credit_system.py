from django.db import models
from apps.core.models import BaseModel
from apps.users.models import User


class AICredit(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ai_credits')
    balance = models.PositiveIntegerField(default=100)
    total_used = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.email} - {self.balance} credits"


def deduct_credits(user: User, amount: int = 1) -> bool:
    """Deduct AI credits from user."""
    credit, created = AICredit.objects.get_or_create(user=user)
    if credit.balance >= amount:
        credit.balance -= amount
        credit.total_used += amount
        credit.save()
        return True
    return False


def add_credits(user: User, amount: int):
    """Add credits to user account."""
    credit, created = AICredit.objects.get_or_create(user=user)
    credit.balance += amount
    credit.save()