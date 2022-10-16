from django.urls import path, include
from instagram import views
from rest_framework.routers import DefaultRouter

app_name = 'instagram'
router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('posts/<int:page>', views.posts),
    path('user_posts/<int:user_id>/<int:page>', views.user_posts),
    path('following_posts/<int:page>', views.following_posts),
    path('user/<str:filename>', views.user),
    path('follow/<int:user_id>', views.follow),
    path('comment/<int:post_id>', views.comment),
    path('like/<int:post_id>', views.like),
    path('post_user_comment/<int:post_id>',
         views.post_user_comment),
    path('like_sum/<int:post_id>', views.like_sum),
]
