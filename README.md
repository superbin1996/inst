> # Project App: `Instagram`

https://youtu.be/lt2pLhJaFck

## Project structure

- `server` directory is project folder,   
- `instagram` directory is app folder,   
- `instagram/client` is client-frontend,   
- `instagram/media` directory stores media/image files  

________________
## To setup project (work both for production and development)  
  
- On terminal in `root directory` run (if `npm` was installed):  

    ```js
    npm run setup-project  
    ```

________________
## To run project (for both client and server simultaneously, for development)  

on terminal in `root directory`, run (if `npm` was installed):  

- On `windows`:
    ```js
    npm start
    ```

- On `ubuntu`:
    ```js
    npm start-ubuntu
    ```
________________
## Run server only (production)

on terminal in `root directory`, run:  

For `windows`:  
```py
python manage.py runserver --insecure
```

For 'ubuntu':

```py
python3 manage.py runserver --insecure
```
Add `--insecure` because in `server/settings.py`, DEBUG=False

________________
## Run server and client separately or more details about setup and operate command

> Open package.jon and refer to scripts


________________
## For deployment on Render

https://render.com/docs/deploy-django

Refer to `render.yaml`, `build.sh`, `server/wsgi.py`, `instagram/management`, `server/settings.py`, `server/urls.py`

Remember to create `.env` file in `root directory` and define `SUPERUSER_NAME`, `SUPERUSER_PASSWORD`, `SUPERUSER_EMAIL` to create `superuser`  

_________

Modify Image path need to change in `settings.py`, `instagram/views.py`, `client/src/context/appContext.js`, `instagram/models.py`, `server/urls.py`  

  
Default hostname for development is `http:127.0.0.1:8000`  

If login in `http:127.0.0.1:8000/admin` and `http:localhost:8000/admin` with the same account with the same time. Then only can login in `http:127.0.0.1:8000` with that account.  

UserViewSet used for register need won't allow register if set permission_classes to permissions.IsAuthenticated  

Cannot register if admin is login  

