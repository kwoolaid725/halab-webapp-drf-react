from django.urls import path
from .views import (ProductList, ProductDetail, CreateProduct, AdminProductDetail, EditProduct,
                    DeleteProduct, BrandList, PostList, PostDetail, PostListDetailfilter,
                    CreatePost, AdminPostDetail, EditPost, DeletePost)
from rest_framework.routers import DefaultRouter

app_name = 'halab_api'

# router = DefaultRouter()
# router.register('posts', PostList, basename='post')
# urlpatterns = router.urls


urlpatterns = [
    # Post URLs
    path('posts/', PostList.as_view(), name='post_listpost'),
    path('posts/<str:slug>/', PostDetail.as_view(), name='post_detailcreate'),
    # path('posts/search/custom/', PostListDetailfilter.as_view(), name='post_postsearch'),
    # Post Admin URLs
    path('admin/posts/create/', CreatePost.as_view(), name='post_createpost'),
    path('admin/posts/edit/postdetail/<int:pk>/', AdminPostDetail.as_view(), name='post_admindetailpost'),
    path('admin/posts/edit/<int:pk>/', EditPost.as_view(), name='post_editpost'),
    path('admin/posts/delete/<int:pk>/', DeletePost.as_view(), name='post_deletepost'),

    path('brands/', BrandList.as_view(), name='brand_detailcreate'),
    # Product URLs
    path('products/', ProductList.as_view(), name='product_listcreate'),
    path('products/<str:slug>/', ProductDetail.as_view(), name='product_detailcreate'),
    # Product Admin URLs
    path('admin/products/create/', CreateProduct.as_view(), name='product_createproduct'),
    path('admin/products/edit/productdetail/<int:pk>/', AdminProductDetail.as_view(), name='product_admindetailproduct'),
    path('admin/products/edit/<int:pk>/', EditProduct.as_view(), name='product_editproduct'),
    path('admin/products/delete/<int:pk>/', DeleteProduct.as_view(), name='product_deleteproduct'),

]