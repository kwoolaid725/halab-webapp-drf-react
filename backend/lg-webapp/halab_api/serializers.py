from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from ..halab.models import Category, Brand, Product, Post, Sample, Test, TestDetailVacuum
from django.conf import settings

# is it like schema in fastapi?

class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('category', 'id', 'title', 'image', 'slug', 'author', 'excerpt', 'content', 'status')


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"
class ProductSerializer(serializers.ModelSerializer):
    brand = serializers.CharField(source='brand.name')
    category = serializers.CharField(source='category.name')

    class Meta:
        model = Product
        fields = ('id', 'category', 'brand', 'model_name', 'slug', 'color', 'release_date', 'image', 'owner')

    def create(self, validated_data):
        brand_name = validated_data.pop('brand')['name']
        brand, created = Brand.objects.get_or_create(name=brand_name)  # create brand if not exist

        category_name = validated_data.pop('category')['name']
        category, created = Category.objects.get_or_create(name=category_name)  # create category if not exist

        product = Product.objects.create(brand=brand, category=category, **validated_data)
        return product


class SampleSerializer(serializers.ModelSerializer):
    # select from product table
    product = serializers.SlugRelatedField(
        queryset=Product.objects.all(),
        slug_field='model_name'
    )

    class Meta:
        model = Sample
        fields = ('id', 'inv_no', 'product', 'product_stage', 'remarks', 'serial_no', 'owner')

class TestSerializer(serializers.ModelSerializer):
    product_category = serializers.CharField(source='product_category.name')
    created_at = serializers.DateTimeField(read_only=True)
    completion_date = serializers.DateField(read_only=True) #Change to DateTimeField Later 11.2.2023

    class Meta:
        model = Test
        fields = ('id', 'test_category', 'product_category', 'description', 'test_status', 'created_at','due_date','completion_date',  'remarks', 'owner')
    #
    def create(self, validated_data):
        category_name = validated_data.pop('product_category')['name']
        category, created = Category.objects.get_or_create(name=category_name)  # create brand if not exist

        test = Test.objects.create(product_category=category, **validated_data)
        return test

class TestDetailVacuumSerializer(serializers.ModelSerializer):
    test = serializers.IntegerField(source='test.id')
    sample = serializers.CharField(source='sample.inv_no')
    created_at = serializers.DateTimeField(read_only=True)
    last_updated = serializers.DateTimeField(read_only=True)

    class Meta:
        model = TestDetailVacuum
        fields = ('id', 'test', 'tester', 'sample', 'brush_type', 'test_target', 'test_group',  'test_case', 'test_measure', 'run', 'value', 'units', 'remarks', 'owner','created_at','last_updated')

    def create(self, validated_data):
        test_id = validated_data.pop('test')['id']
        test, created = Test.objects.get_or_create(id=test_id)
        sample_id = validated_data.pop('sample')['inv_no']
        sample, created = Sample.objects.get_or_create(inv_no=sample_id)

        testdetailvacuum = TestDetailVacuum.objects.create(test=test, sample=sample, **validated_data)
        return testdetailvacuum
# SlugRelatedField is used to represent the related Product model. The queryset argument is required, and should be a queryset that includes all items you might want to refer to. The slug_field is the field on the related object that is used to represent it.
#
# When deserializing, the SlugRelatedField will lookup an object based on this slug_field. This means that you should ensure that the slug_field used has unique values to avoid multiple objects returning during the lookup.
#
# Please replace 'model_name' with the actual field name in your Product model that you want to use for selection. If you want to use a different field for selection, just change 'model_name' to your desired field name.