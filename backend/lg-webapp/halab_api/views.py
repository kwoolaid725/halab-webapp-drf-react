from rest_framework import generics
from ..halab.models import Category, Brand, Product, Post, Sample, Test, TestDetailVacuum, CrProductData, VocReviews
from .serializers import ProductSerializer, BrandSerializer, PostSerializer, SampleSerializer, CategorySerializer, \
    TestSerializer, TestDetailVacuumSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, DjangoModelPermissions, BasePermission, \
    SAFE_METHODS, IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly
from rest_framework import viewsets, filters, generics, permissions
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.db.models import Q


class PostUserWritePermission(BasePermission):
    # permission_classes = [DjangoModelPermissions]

    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class CategoryList(generics.ListCreateAPIView):
    # queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = Category.objects.all()
        name = self.request.query_params.get('name')

        if name:
            queryset = queryset.filter(name=name)

        return queryset


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
    parser_classes = [MultiPartParser,
                      FormParser]  # you typically want to use both in order to fully support all possible client upload scenarios.

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
        model_name = self.request.query_params.get('model_name', None)
        id = self.request.query_params.get('id', None)
        if category is not None:
            queryset = queryset.filter(category=category)
        if brand is not None:
            queryset = queryset.filter(brand__name=brand)
        if model_name is not None:
            queryset = queryset.filter(model_name=model_name)
        if id is not None:
            queryset = queryset.filter(id=id)
        return queryset


class ProductDetail(generics.RetrieveAPIView):
    serializer_class = ProductSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('slug')
        return get_object_or_404(Product, slug=item)


# Product Admin

class CreateProduct(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser,
                      FormParser]  # you typically want to use both in order to fully support all possible client upload scenarios.

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


# search post
class ProductListDetailfilter(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]

    search_fields = ['^brand__name', '^model_name', '^slug']

    def get_queryset(self):
        queryset = Product.objects.all()
        # category = self.request.query_params.get('category', None)
        category = self.kwargs.get('category')

        if category is not None:
            queryset = queryset.filter(category=category)

        return queryset
    # '^' starts-with search.
    # '=' exact matches.
    # '@' full-text search (currently only supported Django's PostgreSQL backend).
    # '$' regex search.


class SampleList(generics.ListCreateAPIView):
    # queryset = Sample.objects.all()
    serializer_class = SampleSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned products to a given category and brand,
        by filtering against `category` and `brand` query parameters in the URL.
        """
        queryset = Sample.objects.all()
        product = self.request.query_params.get('product', None)
        inv_no = self.request.query_params.get('inv_no', None)

        if product is not None:
            queryset = queryset.filter(product=product)

        if inv_no is not None:
            queryset = queryset.filter(inv_no=inv_no)

        return queryset


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
    # queryset = Test.objects.all()
    serializer_class = TestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Test.objects.all()
        test_category = self.request.query_params.get('test_category')
        product_category = self.request.query_params.get('product_category')
        test_status = self.request.query_params.get('test_status')
        description = self.request.query_params.get('description')
        created_at = self.request.query_params.get('created_at')

        if test_category:
            queryset = queryset.filter(test_category=test_category)

        if product_category:
            queryset = queryset.filter(product_category=product_category)

        if test_status:
            queryset = queryset.filter(test_status=test_status)

        if description:
            queryset = queryset.filter(description=description)

        if created_at:
            queryset = queryset.filter(created_at=created_at)

        return queryset


# class CreateTest(APIView):
#     # permission_classes = [permissions.IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]  # you typically want to use both in order to fully support all possible client upload scenarios.
#     def post(self, request, format=None):
#         print(request.data)
#         serializer = TestSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=200)
#         else:
#             return Response(serializer.errors, status=400)
#
class CreateTest(generics.CreateAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class AdminTestDetail(generics.RetrieveAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class EditTest(generics.UpdateAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class DeleteTest(generics.DestroyAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Test.objects.all()
    serializer_class = TestSerializer



class TestDetailVacuumCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = TestDetailVacuum.objects.all()
    serializer_class = TestDetailVacuumSerializer

    #
    # def perform_create(self, serializer):
    #     # Get the logged-in user's ID
    #     tester = self.request.user.id
    #     # Set the tester field to the logged-in user's ID
    #     serializer.save(tester=tester)

class TestDetailVacuumList(generics.ListCreateAPIView):
    # queryset = Test.objects.all()
    serializer_class = TestDetailVacuumSerializer

    def get_queryset(self):
        queryset = TestDetailVacuum.objects.all()

        test_ids = self.request.query_params.getlist('test')

        if test_ids:
            # Use Q objects to filter by multiple test IDs
            query = Q()
            for test_id in test_ids:
                query |= Q(test=test_id)
            queryset = queryset.filter(query)

        return queryset
class TestDetailVacuumSample(generics.ListCreateAPIView):
    serializer_class = TestDetailVacuumSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = TestDetailVacuum.objects.all()
        sample = self.request.query_params.get('sample')
        brush_type = self.request.query_params.get('brush_type')
        test_case = self.request.query_params.get('test_case')
        test_target = self.request.query_params.get('test_target')
        slug = self.request.query_params.get('slug')

        test = self.kwargs.get('test')

        if sample:
            queryset = queryset.filter(sample=sample)

        if brush_type:
            queryset = queryset.filter(brush_type=brush_type)

        if test_case:
            queryset = queryset.filter(test_case=test_case)

        if test_target:
            queryset = queryset.filter(test_target=test_target)

        if test:
            queryset = queryset.filter(test=test)

        if slug:
            queryset = queryset.filter(slug=slug)

        return queryset




class TestDetailVacuumSlug(generics.ListCreateAPIView):
    serializer_class = TestDetailVacuumSerializer

    def get_queryset(self):
        queryset = TestDetailVacuum.objects.all()
        test = self.kwargs.get('test')
        slug = self.kwargs.get('slug')

        if test is not None:
            queryset = queryset.filter(test=test)
        if slug is not None:
            queryset = queryset.filter(slug=slug)

        return queryset


class TestDetailVacuumSlugEdit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TestDetailVacuumSerializer

    def get_queryset(self):
        queryset = TestDetailVacuum.objects.all()
        test = self.kwargs.get('test')
        slug = self.kwargs.get('slug')
        pk = self.kwargs.get('pk')

        if test is not None:
            queryset = queryset.filter(test=test)
        if slug is not None:
            queryset = queryset.filter(slug=slug)
        if pk is not None:
            queryset = queryset.filter(id=pk)

        return queryset


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
