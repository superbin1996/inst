from django.urls import path, include
from instagram import views
from rest_framework.routers import DefaultRouter

app_name = 'instagram'
router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('posts', views.posts),
    path('post/<int:post_id>', views.post),
    path('profile_posts', views.profile_posts),
    path('following_posts', views.following_posts),
    path('user/<str:filename>', views.user),
    path('follow/<int:user_id>', views.follow),
    path('comment/<int:post_id>', views.comment),
    path('like/<int:post_id>', views.like),
    path('post_user_comment/<int:post_id>', views.post_user_comment),
]
