from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class User(AbstractUser):
  avatar = models.ImageField(default='img/default/ahri.jpg', upload_to='img/avatar/')
  info = models.TextField(null=True)

class Post(models.Model):
  status = models.CharField(max_length=800, null=True)
  user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'posts')
  image = models.ImageField(default='img/default/default.jpg', upload_to='img/post/')
  timestamp = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ['-timestamp']

  def __str__(self):
    return f"{self.id}, {self.status}"

class Comment(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
  user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='comments')
  content = models.CharField(max_length=800)
  timestamp = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ['-timestamp']

  def __str__(self):
    return f"{self.id}, {self.user} commented in {self.post}"

class Follow(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed_user')
  following = models.ManyToManyField(User, blank=True, related_name='following')

  class Meta:
    unique_together = ['user']
  def __str__(self):
    return f"{self.id}, {self.user}"
    
class Like(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
  user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='likes')
  is_like = models.BooleanField(default=False)
  timestamp = models.DateTimeField(auto_now_add=True)

  class Meta:
    unique_together=['post', 'user']

    def __str__(self):
      return f"{self.id}, {self.user} liked {self.post}: {self.is_like}"


