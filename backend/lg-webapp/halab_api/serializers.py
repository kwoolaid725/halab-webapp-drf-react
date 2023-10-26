from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from ..halab.models import Brand, Product, Post

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
        fields = ('id', 'title', 'author', 'excerpt', 'content', 'status')
