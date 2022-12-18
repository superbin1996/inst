# Project App: `Instagram`

## Project structure

> `server` directory is project folder, `instagram` directory is app folder, `instagram/client` is client-frontend, `instagram/media` directory stores media/image files

________________
## To setup project (work both for production and development)  
  
On terminal in `root directory` run (if `npm` was installed):  

> npm run setup-production  

________________
## To run project (for both client and server simultaneously)  

on terminal in `root directory` run (if `npm` was installed):  

On `windows`
> npm start

On `ubuntu`
> npm start-ubuntu

________________
## Run server and client separately, more details about setup and operate command

> Open package.jon and look at scripts

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

