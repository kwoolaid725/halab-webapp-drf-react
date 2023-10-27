from rest_framework import generics
from ..halab.models import Brand, Product, Test, Post, TestDetailVacuum, CrProductData, VocReviews
from .serializers import ProductSerializer, BrandSerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, DjangoModelPermissions, BasePermission, SAFE_METHODS, IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly
from rest_framework import viewsets
from rest_framework import filters

class PostUserWritePermission(BasePermission):
    # permission_classes = [DjangoModelPermissions]

    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user

class PostList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        # return Post.objects.filter(author=user)
        return Post.objects.all()

class PostDetail(generics.RetrieveAPIView):
   serializer_class = PostSerializer
   lookup_field = 'slug'
   def get_queryset(self):
        # slug = self.request.query_params.get('slug', None)
        # print(slug)
        # above works when url is like '/' for post list

        return Post.objects.all()


class PostListDetailfilter(generics.ListAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']

    # '^' starts-with search.
    # '=' exact matches.
    # '@' full-text search (currently only supported Django's PostgreSQL backend).
    # '$' regex search.


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



class ProductList(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    # permission_classes = [DjangoModelPermissions] # View-level permissions
    queryset = Product.objects.all()
    serializer_class = ProductSerializer





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