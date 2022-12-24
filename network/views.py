from rest_framework import viewsets
from .models import Post, User, Comment, Like, Follow
from .serializers import UserSerializer, PostSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes, api_view, parser_classes
import json
from icecream import ic
from django.forms.models import model_to_dict
from django.core.paginator import Paginator
from django.core.files import File
from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import FileUploadParser, FormParser, JSONParser


# https: // www.django-rest-framework.org/tutorial/2-requests-and-responses/
# REST framework also introduces a Response object,
# which is a type of TemplateResponse that takes unrendered content and
# uses content negotiation to determine the correct content type to return to the client.
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)


class PostViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def all_posts(request):
    posts = Post.objects.all().values(
        'id', 'status', 'user__username', 'user__id', 'user__avatar', 'image', 'timestamp')

    post_data = list(posts)
    # ic(post_data)

    return Response(post_data, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def pagination_posts(request, page):
    all_posts = Post.objects.all().values(
        'id', 'status', 'user__username', 'user__id', 'user__avatar', 'image', 'timestamp')

    posts_length = len(all_posts)
    pagination = Paginator(all_posts, 20)
    posts = pagination.page(page).object_list
    # ic(posts)

    return Response({
        'posts': posts,
        'posts_length': posts_length
    }, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def user_posts(request, user_id, page):
    try:
        all_posts = Post.objects.filter(user=user_id).values(
            'id', 'status', 'user__username', 'user__id', 'user__avatar', 'image', 'timestamp')
    except Post.DoesNotExist:
        return Response({"detail": "User don't have any post yet."}, status=404)

    posts_length = len(all_posts)
    pagination = Paginator(all_posts, 20)
    posts = pagination.page(page).object_list
    # ic(post_data)

    return Response({
        'posts': posts,
        'posts_length': posts_length
    }, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def following_posts(request, page):
    following_users = Follow.objects.get(user=request.user).following.all()
    if not following_users:
        return Response({
            "detail": "User haven't followed anybody yet",
            # 'posts': [],
            # 'posts_length': 0
        }, status=404)
    else:
        following_posts = Post.objects.filter(
            user__in=following_users).values(
            'id', 'status', 'user__username', 'user__id', 'user__avatar', 'image', 'timestamp')

        posts_length = len(following_posts)
        pagination = Paginator(following_posts, 20)
        posts = pagination.page(page).object_list

        return Response({
            'posts': posts,
            'posts_length': posts_length
        }, status=200)


@api_view(['GET', 'PUT'])
@parser_classes([FileUploadParser])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def current_user(request, filename):
    if request.method == 'GET':
        current_user = {
            "id": str(request.user.id),
            "username": str(request.user.username),
            'avatar': str(request.user.avatar),
        }

        return Response(current_user, status=200)

    if request.method == 'PUT':
        if request.data['file']:
            data = request.data['file']
            # ic(data)
            a = User.objects.get(id=request.user.id)
            a.avatar = data
            a.save()

            return Response({'detail': 'Avatar has updated'}, status=200)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def follow(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(status=404)

    follow = Follow.objects.get(user=user_id).following
    currentUserfollow = Follow.objects.get(user=request.user).following

    if request.method == "GET":
        isFollow = currentUserfollow.contains(user)
        followers = user.following.count()
        following = follow.count()
        # following_users = follow.values('username', 'id')
        return Response({
            "isFollow": isFollow,
            'followers': followers,
            'following': following
            # 'followingUsers': list(following_users)
        }, status=200)

    if request.method == "PUT":

        if currentUserfollow.contains(user) == False:
            # User field of Follow model class was created in serializers.py
            currentUserfollow.add(user_id)

            return Response({"follow": True}, status=201)
        else:
            currentUserfollow.remove(user_id)

            return Response({"follow": False}, status=200)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
# def following(request, user_id):
#     try:
#         user = User.objects.get(id=user_id)
#     except User.DoesNotExist:
#         return Response(status=404)

#     following = Follow.objects.get(user=user_id).following.count()

#     return Response({"following": following}, status=200)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
# def followers(request, user_id):
#     try:
#         user = User.objects.get(id=user_id)
#     except User.DoesNotExist:
#         return Response(status=404)

#     followers = user.following.count()

#     return Response({"followers": followers}, status=200)


@api_view(['POST', 'PUT', 'GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def comment(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({"detail": "Post not found."}, status=404)

    if request.method == "GET":
        comments = post.comments.all().values(
            'id', 'post', 'content', 'user__username', 'user__id', 'user__avatar', 'timestamp')
        comment_data = list(comments)
        # ic(comment_data)

        return Response(comment_data, status=200)

    if request.method == "POST":

        data = json.loads(request.body)
        content = data["content"]

        # Check if forgot input
        if content.strip():
            # Add comment to database
            Comment.objects.create(
                content=content, user=request.user, post=post)
            return Response({"message": "Your comment has been added"}, status=201)
        else:
            return Response({"detail": "Cannot leave comment blank"}, status=400)

    if request.method == "PUT":
        data = json.loads(request.body)
        commentId = data["id"]

        try:
            comment = Comment.objects.get(
                id=commentId)
        except Comment.DoesNotExist:
            return Response({"detail": "Comment not found."}, status=404)

        content = data["content"]

        # Check if contents is blank
        if content.strip():
            comment.content = content
            comment.save()
        else:
            return Response({"detail": "Cannot leave comment blank"}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def post_current_user_comment(request, post_id):
    try:
        comments = Comment.objects.filter(
            post=post_id, user=request.user).all()
    except User.DoesNotExist:
        return Response({"detail": "Comment not found."}, status=404)

    post_current_user_comment = list(
        comments.values('id', 'content', "user__username"))

    # ic(post_current_user_comment)
    return Response(post_current_user_comment, status=200)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def like(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({"detail": "Post not found."}, status=404)

    if request.method == "GET":
        post, created = Post.objects.get(
            id=post_id).like.get_or_create(user=request.user)
        # ic(post.like)
        return Response({"like": post.like}, status=201)

    if request.method == "PUT":
        data = json.loads(request.body)
        like = Like.objects.get(post=post_id, user=request.user)
        like.like = data["like"]
        like.save()

        return Response(status=204)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def like_sum(request, post_id):
    try:
        like_sum = Like.objects.filter(post=post_id, like=True).count()

    except Like.DoesNotExist:
        return Response({"detail": "Post not found."}, status=404)

    return Response(like_sum, status=201)
