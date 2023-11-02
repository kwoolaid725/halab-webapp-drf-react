from rest_framework import generics
from ..halab.models import Category, Brand, Product,Post, Sample, Test, TestDetailVacuum, CrProductData, VocReviews
from .serializers import ProductSerializer, BrandSerializer, PostSerializer, SampleSerializer, CategorySerializer, TestSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, DjangoModelPermissions, BasePermission, SAFE_METHODS, IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly
from rest_framework import viewsets, filters, generics, permissions
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

class PostUserWritePermission(BasePermission):
    # permission_classes = [DjangoModelPermissions]

    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class CategoryList(generics.ListCreateAPIView):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# Display Posts
class PostList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        # return Post.objects.filter(author=user)
        return Post.objects.all()

# class PostDetail(generics.RetrieveAPIView):
#    serializer_class = PostSerializer
#    lookup_field = 'slug'
#    def get_queryset(self):
#         # slug = self.request.query_params.get('slug', None)
#         # print(slug)
#         # above works when url is like '/' for post list
#
#         return Post.objects.all()
class PostDetail(generics.RetrieveAPIView):

    serializer_class = PostSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('slug')
        return get_object_or_404(Post, slug=item)


# search post
class PostListDetailfilter(generics.ListAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']

    # '^' starts-with search.
    # '=' exact matches.
    # '@' full-text search (currently only supported Django's PostgreSQL backend).
    # '$' regex search.

# Post Admin

# class CreatePost(generics.CreateAPIView):
#     # permission_classes = [permissions.IsAuthenticated]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)

class CreatePost(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # you typically want to use both in order to fully support all possible client upload scenarios.
    def post(self, request, format=None):
        print(request.data)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)
class AdminPostDetail(generics.RetrieveAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class EditPost(generics.UpdateAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class DeletePost(generics.DestroyAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer



# class PostList(viewsets.ModelViewSet):
#     permission_classes = [PostUserWritePermission]
#     serializer_class = PostSerializer
#
#     def get_object(self, queryset=None, **kwargs):
#         item = self.kwargs.get('pk')
#         return generics.get_object_or_404(Post, slug=item)
#     #Define Custom Queryset
#     def get_queryset(self):
#         return Post.objects.all()




class BrandList(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    pass

class BrandDetail(generics.RetrieveUpdateDestroyAPIView):
    pass


class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned products to a given category and brand,
        by filtering against `category` and `brand` query parameters in the URL.
        """
        queryset = Product.objects.all()
        category = self.request.query_params.get('category', None)
        brand = self.request.query_params.get('brand', None)
        if category is not None:
            queryset = queryset.filter(category=category)
        if brand is not None:
            queryset = queryset.filter(brand__name=brand)
        return queryset


class ProductDetail(generics.RetrieveAPIView):

    serializer_class = ProductSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('slug')
        return get_object_or_404(Product, slug=item)


# search post
class ProductListDetailfilter(generics.ListAPIView):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']

    # '^' starts-with search.
    # '=' exact matches.
    # '@' full-text search (currently only supported Django's PostgreSQL backend).
    # '$' regex search.

# Product Admin

class CreateProduct(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # you typically want to use both in order to fully support all possible client upload scenarios.
    def post(self, request, format=None):
        print(request.data)
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)
class AdminProductDetail(generics.RetrieveAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class EditProduct(generics.UpdateAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class DeleteProduct(generics.DestroyAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class SampleList(generics.ListCreateAPIView):
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer
    pass

class CreateSample(generics.CreateAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer


class AdminSampleDetail(generics.RetrieveAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer

class EditSample(generics.UpdateAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer

class DeleteSample(generics.DestroyAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer


# Test
class TestList(generics.ListCreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    pass

class CreateTest(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # you typically want to use both in order to fully support all possible client upload scenarios.
    def post(self, request, format=None):
        print(request.data)
        serializer = TestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)


class AdminTestDetail(generics.RetrieveAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Test.objects.all()
    serializer_class = TestSerializer

class EditTest(generics.UpdateAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Test.objects.all()
    serializer_class = SampleSerializer

class DeleteTest(generics.DestroyAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Test.objects.all()
    serializer_class = SampleSerializer


""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
#ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
#RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""