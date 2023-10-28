from django.urls import path
from .views import (ProductList, ProductDetail, BrandList, PostList, PostDetail, PostListDetailfilter,
                    CreatePost, AdminPostDetail, EditPost, DeletePost)
from rest_framework.routers import DefaultRouter

app_name = 'halab_api'

# router = DefaultRouter()
# router.register('posts', PostList, basename='post')
# urlpatterns = router.urls


urlpatterns = [
    path('posts/', PostList.as_view(), name='post_listpost'),
    path('posts/<str:slug>/', PostDetail.as_view(), name='post_detailcreate'),
    path('posts/search/custom/', PostListDetailfilter.as_view(), name='post_postsearch'),
    # Post Admin URLs
    path('admin/posts/create/', CreatePost.as_view(), name='post_createpost'),
    path('admin/posts/edit/postdetail/<str:slug>/', AdminPostDetail.as_view(), name='post_adminpostdetail'),
    path('admin/posts/edit/<str:slug>/', EditPost.as_view(), name='post_editpost'),
    path('admin/posts/delete/<str:slug>/', DeletePost.as_view(), name='post_deletepost'),

    path('products/brands/', BrandList.as_view(), name='brand_detailcreate'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product_detailcreate'),
    path('products/', ProductList.as_view(), name='product_listcreate'),

]