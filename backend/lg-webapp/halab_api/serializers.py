from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from ..halab.models import Brand, Product, Post
from django.conf import settings

# is it like schema in fastapi?

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"
class ProductSerializer(serializers.ModelSerializer):
    brand = ReadOnlyField(source='brand.name')

    class Meta:
        model = Product
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('category', 'id', 'title', 'image', 'slug', 'author', 'excerpt', 'content', 'status')

class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}
