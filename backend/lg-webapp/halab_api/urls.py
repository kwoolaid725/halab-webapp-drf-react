from django.urls import path
from .views import ProductList, ProductDetail, BrandList, PostList, PostDetail

app_name = 'halab_api'

urlpatterns = [
    path('posts/', PostList.as_view(), name='post_listcreate'),
    path('posts/<int:pk>/', PostDetail.as_view(), name='post_detailcreate'),
    path('products/brands/', BrandList.as_view(), name='brand_detailcreate'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product_detailcreate'),
    path('products/', ProductList.as_view(), name='product_listcreate'),

]