from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Post, Follow, Comment, Like

UserAdmin.list_filter += ('avatar',)
UserAdmin.fieldsets += (('avatar', {'fields': ('avatar',)}),)
# UserAdmin.list_display += ("id",)


class UserAdmin(UserAdmin):
    list_display = ("id", "username", "avatar")


class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "status", "image", "timestamp")


class FollowAdmin(admin.ModelAdmin):
    list_display = ("id", "user")


class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "post", "user", "content", "timestamp")


class LikeAdmin(admin.ModelAdmin):
    list_display = ("id", "post", "user", "like", "timestamp")


# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Follow, FollowAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Like, LikeAdmin)
