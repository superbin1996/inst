from rest_framework import serializers
# Serializers allow complex data such as querysets and model instances to be converted to
# native Python datatypes that can then be easily rendered into JSON,
# XML or other content types. Serializers also provide deserialization,
# allowing parsed data to be converted back into complex types,
# after first validating the incoming data.

# from django.contrib.auth.models import User
from network.models import Post, User, Follow, Like, Comment
from rest_framework.authtoken.views import Token

# https: // www.django-rest-framework.org/api-guide/serializers/  # modelserializer
# ModelSerializer includes simple default implementations of .create() and .update().


class UserSerializer(serializers.ModelSerializer):
    # posts = serializers.PrimaryKeyRelatedField(
    #     many=True, queryset=Post.objects.all())

    class Meta:
        model = User

        # Dont add posts pk, if add wont be able to create user
        # Need add 'password' field, so algorign hash pash word can be applied
        fields = ['id', 'username', 'password']

    extra_kwargs = {"password": {
        "write-only": True,
        "required": True
    }}

    def create(self, validated_data):
        # password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        # user = User.objects.create(**validated_data)
        # user = User(**validated_data)
        # user.set_password(password)
        # user = User.objects.create_user(validated_data['username'],
        #                                 validated_data['password'])
        # posts = Post.objects.filter(owners=user.id).values()
        # user.save()
        # user.save()
        Token.objects.create(user=user)
        Follow.objects.create(user=user)
        Like.objects.create(user=user)

        # Follow.objects.get(user=user).following.add(user)
        return user


class PostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        many=False, queryset=User.objects.all())
    # owners = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'


# class FollowSerializer(serializers.ModelSerializer):
#     user = serializers.PrimaryKeyRelatedField(
#         many=False, queryset=User.objects.all())

#     following = serializers.PrimaryKeyRelatedField(
#         many=False, queryset=User.objects.all())

#     class Meta:
#         model = Follow
#         field = '__all__'
