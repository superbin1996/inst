services:
	postgres_db:
		image: postgres
		volumes:
			- ./data/db:/var/lib/postgresql/data
		env_file:
			- ./env/postgres_db.env
		container_name: postgres_db
  backend: 
    build:
      context: ./backend
      dockerfile: Dockerfile
    volumes: 
      - ./django/instagram/views.py:/app/instgram/views.py
			- ./django/instagram/urls.py:/app/instgram/urls.py
    ports:
      - 8000:8000
    env_file:
      - ./env/django.env
    depends_on:
      - postgres_db
    container_name: backend
  frontend:
    build: ./react
    ports:
      - 80:80
    depends_on:
      - backend
    stdin_open: false
    tty: false

volumes: 
  mongodbdata: