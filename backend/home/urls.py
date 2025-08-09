from django.urls import path
from .views import *
from .import views

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('get-profile/', get_profile),
    path('update-profile/', update_profile),
    path('delete-profile/', delete_profile),
    path('restaurants/', restaurants_list, name='restaurants-list'),
    path('menu-items/', menu_items_list, name='menu-items-list'),
    path('search-menu-items/', search_menu_items, name='search-menu-items'),
    path('add_order_details/', views.add_order_details, name='add_order_details'),
    path('create_order/', create_order, name='create_order'),
    path('order-history/', order_history, name='order-history'),
]
