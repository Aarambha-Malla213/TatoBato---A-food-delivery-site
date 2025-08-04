from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('update-profile/', update_profile),
    path('delete-profile/', delete_profile),
]