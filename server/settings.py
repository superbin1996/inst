"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 4.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os
import environ
from decouple import config
from dj_database_url import parse as dburl


# 2 Following lines is required to getenv()
# from dotenv import load_dotenv
# load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# For Render deployment
env = environ.Env()
# environ.Env() will connect with .env in root folder
env.read_env(os.path.join(BASE_DIR, '.env'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', default='your secret key')

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = 'RENDER' not in os.environ
# Must set to true if using whitenoise to upload media files

# DEBUG = False will lead to cors_headers block static file
DEBUG = False

# ALLOWED_HOSTS = ["*"]
# Must include localhost and 127.0.0.1 when using django-react
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# Application definition

INSTALLED_APPS = [
    'instagram',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'cloudinary_storage',
    'cloudinary',
    'rest_framework',
    'rest_framework.authtoken',
    'django_cleanup.apps.CleanupConfig',
]

# Added
AUTH_USER_MODEL = "instagram.User"

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# REST_FRAMEWORK = {
#     'DEFAULT_PERMISSION_CLASSES': [
#         # 'rest_framework.permissions.AllowAny',
#         'rest_framework.permissions.IsAuthenticated',
#     ]
# }


# hostname
# Dont't add default, it will use default. Change url in frontend

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
]

RENDER_EXTERNAL_URL = os.environ.get("RENDER_EXTERNAL_URL")
if RENDER_EXTERNAL_URL:
    CORS_ALLOWED_ORIGINS.append(RENDER_EXTERNAL_URL)

# CORS_ALLOW_ALL_ORIGINS = True

ROOT_URLCONF = 'server.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'instagram/client/build/')
        ],
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

WSGI_APPLICATION = 'server.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

default_dburl = 'sqlite:///' + os.path.join(BASE_DIR, 'db.sqlite3')

DATABASES = {
    'default': config('DATABASE_URL', default=default_dburl, cast=dburl)
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

# Changed
TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

# URL show to browser
STATIC_URL = 'static/'

# Search static file on production in those folders
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'instagram/client/build/static/'),
)

# Static folder for production
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles/')
# Module used for searching static files

# URL show on broser.
# If changing MEDIA_URL, need to change url in instagram/views.py and instagram/client/src/context/appContext.js, 
MEDIA_URL = 'instagram/media/'

# Folder stores uploaded files
# MEDIA_ROOT = os.path.join(BASE_DIR, 'instagram/media/')
# On Render production, media files can only be access via staticfiles/ folders
# MEDIA_ROOT = os.path.join(BASE_DIR, 'instagram/media/')
MEDIA_ROOT = os.path.join(BASE_DIR, 'instagram/media/')


CLOUDINARY_STORAGE = {
    'CLOUD_NAME': env('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': env('CLOUDINARY_API_KEY'),
    'API_SECRET': env('CLOUDINARY_API_SECRET')
}

# Package allow to store media file in local on deployment
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Use in case there are following variables in .env file
SUPERUSER_NAME = env('SUPERUSER_NAME')
SUPERUSER_EMAIL = env('SUPERUSER_EMAIL')
SUPERUSER_PASSWORD = env('SUPERUSER_PASSWORD')