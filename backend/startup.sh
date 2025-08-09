#!/bin/bash
echo "Running database migrations..."
python manage.py migrate --no-input

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Starting server..."
gunicorn tatobato.wsgi --log-file -
