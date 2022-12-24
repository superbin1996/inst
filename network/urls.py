from django.urls import path, include
from rest_framework.routers import DefaultRouter
from network import views


app_name = "network"

router = DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'users', views.UserViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('all_posts/', views.all_posts),
    path('current_user/<str:filename>/', views.current_user),
    path('pagination_posts/<int:page>', views.pagination_posts),
    path('user_posts/<int:user_id>/<int:page>/', views.user_posts),
    path('follow/<int:user_id>', views.follow),
    path('comment/<int:post_id>/', views.comment),
    path('following_posts/<int:page>/', views.following_posts),
    path('like/<int:post_id>/', views.like),
    path('post_current_user_comment/<int:post_id>/',
         views.post_current_user_comment),
    path('like_sum/<int:post_id>/', views.like_sum),
]
