from rest_framework import generics
from ..halab.models import Brand, Product, Test, Post, TestDetailVacuum, CrProductData, VocReviews
from .serializers import ProductSerializer, BrandSerializer, PostSerializer
from rest_framework.permissions import IsAdminUser, DjangoModelPermissions, BasePermission, SAFE_METHODS, IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly
from rest_framework import viewsets

class PostUserWritePermission(BasePermission):
    # permission_classes = [DjangoModelPermissions]

    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user
class PostList(viewsets.ModelViewSet):
    permission_classes = [PostUserWritePermission]
    serializer_class = PostSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return generics.get_object_or_404(Post, slug=item)
    #Define Custom Queryset
    def get_queryset(self):
        return Post.objects.all()


# class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
#     permission_classes = [PostUserWritePermission]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer


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