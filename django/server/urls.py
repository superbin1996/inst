"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken import views
from django.views.generic import TemplateView

# Add prefix to url will allow access browser url both having prefix or not
# Not add prefix to url will only allow access browser url not having prefix
urlpatterns = [
    # path(r'admin[/]?', admin.site.urls),
    path('admin/', admin.site.urls),
    path('api/v1/', include('instagram.urls')),
    path('api/v1/auth/', views.obtain_auth_token),
    # # Add following line for deployment only
    # re_path won't work for template, so don't use it for production
    path('', TemplateView.as_view(template_name='index.html')),
    path('register/', TemplateView.as_view(template_name='index.html')),
    path('<path:profileName>/', TemplateView.as_view(template_name='index.html')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# No need for DEBUG condition, static() method already havs that condition