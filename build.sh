#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt
npm run build-client
python manage.py collectstatic --no-input
python manage.py migrate
python manage.py superuser