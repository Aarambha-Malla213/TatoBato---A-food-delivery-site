from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('get-profile/', get_profile),
    path('update-profile/', update_profile),
    path('delete-profile/', delete_profile),
    path('restaurants/', restaurants_list, name='restaurants-list'),
     path('menu-items/', menu_items_list, name='menu-items-list'),
]