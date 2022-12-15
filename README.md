### default hostname for development is `http:127.0.0.1:8000`  

### If login in `http:127.0.0.1:8000/admin` and `http:localhost:8000/admin` with the same account with the same time. Then only can login in `http:127.0.0.1:8000` with that account.  

> RuntimeError: You called this URL via POST, but the URL doesn't end in 
a slash and you have APPEND_SLASH set. Django can't redirect to the slash URL while maintaining POST data. Change your form to point to localhost:8000/api/v1/users/ (note the trailing slash), or set APPEND_SLASH=False in your Django settings.  

### UserViewSet used for register need won't allow register if set permission_classes to permissions.IsAuthenticated

### Cannot register if admin is login


### Modify Image path need to change in settings.py, instagram/views.py, client/src/context/appContext.js, instagram/models.py, server/urls.py  
