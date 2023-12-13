docker build -t djangoapp -f Dockerfile.dev .

docker run -p 8000:8000 --name django_container djangoapp

