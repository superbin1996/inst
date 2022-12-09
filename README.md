### default hostname for development is `http:127.0.0.1:8000`  

### If login in `http:127.0.0.1:8000/admin` and `http:localhost:8000/admin` with the same account with the same time. Then only can login in `http:127.0.0.1:8000` with that account.  

> RuntimeError: You called this URL via POST, but the URL doesn't end in 
a slash and you have APPEND_SLASH set. Django can't redirect to the slash URL while maintaining POST data. Change your form to point to localhost:8000/api/v1/users/ (note the trailing slash), or set APPEND_SLASH=False in your Django settings.  

### UserViewSet used for register need won't allow register if set permission_classes to permissions.IsAuthenticated

### Cannot register if admin is login


<!-- Next, Allow getPost without login. Means that you need to remove authentication Token and change permission to Allow any.  
Next. On Header component. Hide Upload icon and Avatar button if not login. Add register/login button.  
Because there are some functions that require user. So maybe component should return JSX that doesn't trigger any functions like that.  
If not, add condition to check null user before proceeding.  
Or, add a dummy user object with id, location, username.... Remember to change check user condition on ProtectedRoute
 -->