from django.urls import path
from .views import ItemViewList

urlpatterns = [
    path('items/', ItemViewList.as_view(), name='item-list'),
]
