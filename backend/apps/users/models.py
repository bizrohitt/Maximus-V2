from django.contrib.auth.models import AbstractUser
from django.db import models
from apps.core.models import BaseModel


class User(AbstractUser, BaseModel):
    """Custom user model extending BaseModel."""
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email