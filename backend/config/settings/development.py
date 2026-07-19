import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = 'django-insecure-dev-key-change-in-production-!@#$%'
DEBUG = True
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    # Wagtail - install after Pillow issue resolved
    # 'wagtail',
    # 'wagtail.admin',
    # 'wagtail.users',
    # 'wagtail.images',
    # 'wagtail.documents',
    # 'wagtail.snippets',
    # 'wagtail.search',
    # 'wagtail.embeds',
    # 'wagtail.redirects',
    # 'wagtail.forms',
    # 'wagtail.sites',
    # 'wagtail.contrib.settings',
    # 'wagtail.contrib.routable_page',
    # 'wagtail.contrib.modeladmin',
    # 'wagtail.contrib.sitemaps',
    # 'wagtail.contrib.table_block',
    # 'wagtail.contrib.typed_table_block',
    # 'taggit',
    # 'modelcluster',
    'apps.core',
    'apps.users',
    'apps.analytics',
    'apps.downloads',
    'apps.marketing',
    'apps.leads',
    'apps.ads',
    'apps.audit',
    'apps.subscriptions',
    'apps.directories',
    'apps.resources',
    'apps.plugins',
    'apps.webhooks',
    'apps.tenants',
    'apps.ai',
    'apps.tools',
    # 'apps.blog',  # requires wagtail
    'apps.admin_api',
    'apps.custom_admin',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'apps.core.middleware.SecurityMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_USER_MODEL = 'users.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
    },
}

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Email (console for development)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# CORS
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
CORS_ALLOW_CREDENTIALS = True
