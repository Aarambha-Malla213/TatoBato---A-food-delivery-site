#!/usr/bin/env bash
set -o errexit

echo "Installing system dependencies..."
apt-get update
apt-get install -y libpq-dev python3-dev gcc

echo "Upgrading pip..."
pip install --upgrade pip

echo "Installing Python packages..."
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Running migrations..."
python manage.py migrate
