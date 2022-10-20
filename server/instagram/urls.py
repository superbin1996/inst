from django.urls import path, include
from instagram import views
from rest_framework.routers import DefaultRouter

app_name = 'instagram'
router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('posts/<int:page>/<int:post_id>', views.posts),
    path('profile_posts/<str:profile_name>/<int:page>', views.profile_posts),
    path('following_posts/<int:page>', views.following_posts),
    path('user/<str:filename>', views.user),
    path('follow/<int:user_id>', views.follow),
    path('comment/<int:post_id>', views.comment),
    path('like/<int:post_id>', views.like),
    path('post_user_comment/<int:post_id>', views.post_user_comment),
]
