from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Image push on cloudinary will have different name with uploaded image
# .values() method doesn't have .url node notaion
# So add _url instance to get image url after save()

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
  """
  Create token for created user
  """
  if created:
    Token.objects.create(user=instance)

class User(AbstractUser):
  avatar = models.ImageField(default='ahri_dpogkv.jpg', upload_to='')
  avatar_url = models.TextField(null=True, blank=True)
  info = models.TextField(null=True, blank=True)

  # Correct image.url can only be created after models field created.
  def save(self, *args, **kwargs):
    super().save(*args, **kwargs)
    self.avatar_url = self.avatar.url
    super().save(*args, **kwargs)

class Post(models.Model):
  status = models.CharField(max_length=800, null=True, blank=True)
  user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'posts')
  image = models.ImageField(default='default_kggq2b.jpg', upload_to='')
  image_url = models.TextField(null=True, blank=True)
  timestamp = models.DateTimeField(auto_now_add=True)

  # Correct image.url can only be created after models field created.
  # Following method is applied for upload on admin side only.
  # For Client side upload, go to views.py instead
  def save(self, *args, **kwargs):
    super().save(*args, **kwargs)
    self.image_url = self.image.url
    super().save(*args, **kwargs)

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


