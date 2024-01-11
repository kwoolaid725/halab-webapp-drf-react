from django.urls import path
from .views import (ProductList, ProductDetail, CreateProduct, AdminProductDetail, EditProduct, DeleteProduct,
                    CategoryList, BrandList, PostList, PostDetail, PostListDetailfilter,
                    CreatePost, AdminPostDetail, EditPost, DeletePost,
                    SampleList, CreateSample, AdminSampleDetail, EditSample, DeleteSample,
                    TestList, CreateTest, AdminTestDetail, EditTest, DeleteTest,
                    TestDetailVacuumList, TestDetailVacuumCreate, TestDetailVacuumSample, TestDetailVacuumSlug, TestDetailVacuumSlugEdit
                    )
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

    # Category URLs
    path('categories/', CategoryList.as_view(), name='category_listcreate'),
    # Brand URLs
    path('brands/', BrandList.as_view(), name='brand_detailcreate'),
    # Product URLs
    path('products/', ProductList.as_view(), name='product_listcreate'),
    path('products/<str:slug>/', ProductDetail.as_view(), name='product_detailcreate'),
    # Product Admin URLs
    path('admin/products/create/', CreateProduct.as_view(), name='product_createproduct'),
    path('admin/products/edit/productdetail/<int:pk>/', AdminProductDetail.as_view(), name='product_admindetailproduct'),
    path('admin/products/edit/<int:pk>/', EditProduct.as_view(), name='product_editproduct'),
    path('admin/products/delete/<int:pk>/', DeleteProduct.as_view(), name='product_deleteproduct'),
    # Sample URLs
    path('samples/', SampleList.as_view(), name='sample_listsample'),

    # Sample Admin URLs
    path('admin/samples/create/', CreateSample.as_view(), name='sample_createsample'),
    path('admin/samples/edit/sampledetail/<str:inv_no>/', AdminSampleDetail.as_view(), name='sample_admindetailsample'),
    path('admin/samples/edit/<str:inv_no>/', EditSample.as_view(), name='sample_editsample'),
    path('admin/samples/delete/<str:inv_no>/', DeleteSample.as_view(), name='sample_deletesample'),

    # Test URLs
    path('tests/', TestList.as_view(), name='test_listtest'),
    path('tests/<int:pk>/', TestDetailVacuumList.as_view(), name='test_listtestdetail'),

    # Test Admin URLs
    path('admin/tests/create/', CreateTest.as_view(), name='test_createtest'),
    path('admin/tests/edit/testdetail/<int:pk>/', AdminTestDetail.as_view(), name='test_admindetailtest'),
    path('admin/tests/edit/<int:pk>/', EditTest.as_view(), name='test_edittest'),
    path('admin/tests/delete/<int:pk>/', DeleteTest.as_view(), name='test_deletetest'),

    path('admin/tests/vacuum/testdetail/', TestDetailVacuumCreate.as_view(), name='test_createtestdetailvacuum'),
    path('admin/tests/vacuum/testdetail/<int:test>/', TestDetailVacuumSample.as_view(), name='test_listtestdetailvacuumsample'),
    path('admin/tests/vacuum/testdetail/<int:test>/<slug:slug>/', TestDetailVacuumSlug.as_view(), name='test_listtestdetailvacuum'),
    path('admin/tests/vacuum/testdetail/<int:test>/<slug:slug>/<int:pk>/', TestDetailVacuumSlugEdit.as_view(), name='test_edittestdetailvacuum'),


]