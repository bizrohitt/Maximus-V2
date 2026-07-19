from typing import Optional
from django.contrib.auth import get_user_model
from apps.users.models import User

User = get_user_model()


def create_user(email: str, password: str, **extra_fields) -> User:
    """Create a new user with email as username."""
    user = User.objects.create_user(
        email=email,
        username=email.split('@')[0],
        password=password,
        **extra_fields
    )
    return user


def get_user_by_email(email: str) -> Optional[User]:
    """Retrieve user by email."""
    try:
        return User.objects.get(email=email)
    except User.DoesNotExist:
        return None