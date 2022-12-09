from rest_framework import serializers
from instagram.models import User, Follow, Like
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    # Must include password in order to login or register
    fields = ['id', 'username', 'password']

  extra_kwargs = {"password":{
    "write-only":True,
    # Avoid blank password
    'required': True
  }}

  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    # Token.objects.create(user=user)
    # Follow.objects.create(user=user)
    # Like.objects.create(user=user)
    return user


"""
Create token for created_user
"""
# for user in User.objects.all():
#     Token.objects.get_or_create(user=user)