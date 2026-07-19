from .base import *  # noqa: F401,F403

DEBUG = False
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]

DEFAULT_FILE_STORAGE = 'django.core.files.storage.InMemoryStorage'
