from django.urls import path, include
from instagram import views
from rest_framework.routers import DefaultRouter

app_name = 'instagram'
router = DefaultRouter()
router.register(r'users', views.UserViewSet)

# Add prefix to url will allow access browser url both having prefix or not
# Not add prefix to url will only allow access browser url not having prefix
urlpatterns = [
    path('', include(router.urls)),
    path('getPosts/', views.getPosts),
    path('posts/', views.posts),
    path('post/<int:post_id>/', views.post),
    path('profile_posts/', views.profile_posts),
    path('following_posts/', views.following_posts),
    path('user/<str:filename>/', views.user),
    path('getFollow/<int:user_id>/', views.getFollow),
    path('follow/<int:user_id>/', views.follow),
    path('getPostComments/<int:post_id>/', views.getPostComments),
    path('comment/<int:post_id>/', views.comment),
    path('getLike/<int:post_id>/', views.getLike),
    path('like/<int:post_id>/', views.like),
    path('post_user_comment/<int:post_id>/', views.post_user_comment),
]
