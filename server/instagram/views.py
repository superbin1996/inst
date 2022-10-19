import math
from icecream import ic
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from .serializers import UserSerializer
from .models import User, Post, Follow, Comment, Like
from django.core.paginator import Paginator
from rest_framework.parsers import FileUploadParser
from rest_framework.authtoken.models import Token


class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)

# Remember @api_view is placed above @authentication_classes
@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
def posts(request, page):
    if request.method == 'GET':
        all_posts = Post.objects.all().values(
            'id', 'status', 'user__username', 'user__id', 'user__avatar', 'image', 'timestamp')

        posts_length = len(all_posts)
        num_of_pages = math.ceil(posts_length/10)
        pagination = Paginator(all_posts, 20)
        posts = pagination.page(page).object_list
        # ic(posts)

        return Response({
            'posts': posts,
            'totalPosts': posts_length,
            "numOfPages": num_of_pages,
        }, status=200)
        
    if request.method == 'POST':
        # ic(request.user.username)
        data = request.data
        status = data.get('status')
        # user_id = data.get('user')
        image = data.get('image')
        user = request.user
        if not image:
            Post.objects.create(user=user, status=status)
        else:
            Post.objects.create(user=user, status=status, image=image)
        return Response({'status': True, 'detail':'create post success'}, status=200)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def profile_posts(request, profile_name, page):
    try:
        an_user = User.objects.get(username=profile_name)
    except User.DoesNotExist:
        return Response({'status': True, 'detail': 'User not found'}, status=404)

    try:
        all_posts = Post.objects.filter(user=an_user).values(
            'id', 'status', 'user__username', 'user__id', 'user__avatar', 'image', 'timestamp')
    except Post.DoesNotExist:
        return Response({'status': False, "detail": "User don't have any post yet."}, status=404)

    try:
        follow_obj, created = Follow.objects.prefetch_related('following').get_or_create(user=an_user)
        follow = follow_obj.following
    except Follow.DoesNotExist:
        return Response({'status': False, "detail": "Follow object does not exist."}, status=404)

    if an_user != request.user:
        try:
            users_following_obj, created = Follow.objects.prefetch_related('following').get_or_create(user=request.user)
            is_follow = users_following_obj.following.contains(an_user)
        except Follow.DoesNotExist:
            return Response({'status': False, "detail": "Follow object does not exist."}, status=404)
    else:
        is_follow = False
    
    profile_user = {
        'id': an_user.id,
        'username': an_user.username,
        'avatar': str(an_user.avatar),
    }

    followers = an_user.following.count()
    following = follow.count()

    posts_length = len(all_posts)
    num_of_pages = math.ceil(posts_length/10)
    pagination = Paginator(all_posts, 20)
    posts = pagination.page(page).object_list
    # ic(post_data)

    return Response({
        'profilePosts': posts,
        'totalProfilePosts': posts_length,
        "numOfProfilePages": num_of_pages,
        'isFollow':is_follow,
        'followers':followers,
        'following':following,
        'profileUser':profile_user,
    }, status=200)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def following_posts(request, page):
    follow_obj, is_created = Follow.objects.get_or_create(user=request.user)
    users_following = Follow.objects.get(user=request.user).following.all()
    if not users_following:
        return Response({
            "detail": "User haven't followed anybody yet",
        }, status=404)
    else:
        following_posts = Post.objects.filter(
            user__in=users_following).values(
            'id', 'status', 'user__username', 'user__id', 'user__avatar', 'image', 'timestamp')

        posts_length = len(following_posts)
        num_of_pages = math.ceil(posts_length/10)
        pagination = Paginator(following_posts, 20)
        posts = pagination.page(page).object_list

        return Response({
            'posts': posts,
            'posts_length': posts_length,
            "num_of_pages": num_of_pages,
        }, status=200)


@api_view(['GET', 'PATCH'])
@parser_classes([FileUploadParser])
@authentication_classes([TokenAuthentication])
def user(request, filename):
    if request.method == 'GET':
        # request.user only work when have token Authorization
        current_user = request.user
        user = {
            'id': current_user.id,
            'username': current_user.username,
            'avatar': str(current_user.avatar),
        }

        return Response(user, status=200)

    """Update Avatar"""
    if request.method == 'PATCH':
        if request.data['file']:
            # if data-name is 'file', it will get the file with filename in fnc arguments
            data = request.data['file']
            # ic(data)
            a = User.objects.prefetch_related('avatar').get(id=request.user.id)
            a.avatar = data
            a.save()

            return Response({'status': True, 'detail': 'Avatar has updated'}, status=200)

@api_view(['GET', 'PATCH'])
@authentication_classes([TokenAuthentication])
def follow(request, user_id):
    try:
        an_user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'status': False, 'detail': 'User does not exist'}, status=404)

    if an_user != request.user:
        users_following_obj, created = Follow.objects.get_or_create(user=request.user)
        is_follow = users_following_obj.following.contains(an_user)
    else:
        is_follow = False

    if request.method == "GET":
        return Response({
            "isFollow": is_follow,
        }, status=200)

    if request.method == "PATCH":
        users_following = Follow.objects.get(user=request.user).following
        if not is_follow:
            users_following.add(user_id)
            return Response({"isFollow": True}, status=201)
        else:
            users_following.remove(user_id)
            return Response({"isFollow": False}, status=201)


@api_view(['POST', 'PATCH', 'GET'])
@authentication_classes([TokenAuthentication])
def comment(request, post_id):
    try:
        post = Post.objects.prefetch_related('comments').get(id=post_id)
    except Post.DoesNotExist:
        return Response({"detail": "Post not found."}, status=404)

    # Get comments
    if request.method == "GET":
        comments = post.comments.all().values(
            'id', 'post', 'content', 'user__username', 'user__id', 'user__avatar', 'timestamp')

        return Response(comments, status=200)

    # Post comment
    if request.method == "POST":

        data = request.data
        content = data["comment"]

        # Check if blank
        if content.strip():
            # Add comment to database
            Comment.objects.create(
                content=content, user=request.user, post=post)
            return Response({'status': True, "message": "Your comment has been added"}, status=201)
        else:
            return Response({'status': False, "detail": "Cannot leave comment blank"}, status=400)

    if request.method == "PATCH":
        data = request.data
        commentId = data["id"]

        try:
            comment = Comment.objects.prefetch_related('content').get(
                id=commentId)
        except Comment.DoesNotExist:
            return Response({'status': False, "detail": "Comment not found."}, status=404)

        content = data["comment"]

        # Check if contents is blank
        if content.strip():
            comment.content = content
            comment.save()
        else:
            return Response({'status': False, "detail": "Cannot leave comment blank"}, status=400)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def post_user_comment(request, post_id):
    try:
        comments = Comment.objects.prefetch_related(
        'id', 'content', "user__username").filter(
            post=post_id, user=request.user).all()
    except User.DoesNotExist:
        return Response({'status': False, "detail": "Comment not found."}, status=404)

    post_user_comment = comments.values(
        'id', 'content', "user__username")

    # ic(post_user_comment)
    return Response(post_user_comment, status=200)


@api_view(['GET', 'PATCH'])
@authentication_classes([TokenAuthentication])
def like(request, post_id):
    try:
        post = Post.objects.prefetch_related('like').get(id=post_id)
    except Post.DoesNotExist:
        return Response({'status': False, "detail": "Post not found."}, status=404)

    if request.method == "GET":
        post_obj, created = Post.objects.get(
            id=post_id).like.get_or_create(user=request.user)
        # ic(post.like)
        return Response({"like": post_obj.like}, status=201)

    if request.method == "PATCH":
        data = request.data
        like = Like.objects.prefetch_related('is_like').get(post=post_id, user=request.user)
        like.is_like = data["isLike"]
        like.save()

        return Response(status=204)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def like_sum(request, post_id):
    try:
        like_sum = Like.objects.filter(post=post_id, like=True).count()

    except Like.DoesNotExist:
        return Response({'status': False, "detail": "Post not found."}, status=404)

    return Response(like_sum, status=201)
