from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from ..halab.models import Category, Brand, Product, Post, Sample, Test, TestDetailVacuum
from ..users.models import CustomUser
from django.conf import settings
from django.contrib.auth import get_user_model


# is it like schema in fastapi?


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name', 'last_name')
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
    completion_date = serializers.DateField(default=None, allow_null=True)

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

    tester_firstname = serializers.CharField(source='tester.first_name', read_only=True)

    class Meta:
        model = TestDetailVacuum
        fields = ('id', 'test', 'tester', 'tester_firstname', 'sample', 'model', 'brush_type', 'test_target', 'test_group',  'test_case', 'slug', 'test_measure', 'run', 'value', 'units', 'remarks', 'owner', 'created_at', 'last_updated')

    def create(self, validated_data):

        user = self.context['request'].user

        # Set tester to the ID of the logged-in user
        validated_data['tester'] = user

        test_id = validated_data.pop('test')['id']
        test, created = Test.objects.get_or_create(id=test_id)
        sample_id = validated_data.pop('sample')['inv_no']
        sample, created = Sample.objects.get_or_create(inv_no=sample_id)

        testdetailvacuum = TestDetailVacuum.objects.create(test=test, sample=sample, **validated_data)
        return testdetailvacuum

    def update(self, instance, validated_data):
        # Update existing fields
        instance.test = validated_data.get('test_id', instance.test)
        instance.sample = validated_data.get('sample_id', instance.sample)
        instance.model = validated_data.get('model', instance.model)
        instance.tester = validated_data.get('tester', instance.tester)
        instance.brush_type = validated_data.get('brush_type', instance.brush_type)
        instance.test_target = validated_data.get('test_target', instance.test_target)
        instance.test_group = validated_data.get('test_group', instance.test_group)
        instance.test_case = validated_data.get('test_case', instance.test_case)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.test_measure = validated_data.get('test_measure', instance.test_measure)
        instance.run = validated_data.get('run', instance.run)
        instance.value = validated_data.get('value', instance.value)
        instance.units = validated_data.get('units', instance.units)
        instance.remarks = validated_data.get('remarks', instance.remarks)
        instance.owner = validated_data.get('owner', instance.owner)


        # Save the instance with updated data
        instance.save()
        return instance


# SlugRelatedField is used to represent the related Product model. The queryset argument is required, and should be a queryset that includes all items you might want to refer to. The slug_field is the field on the related object that is used to represent it.
#
# When deserializing, the SlugRelatedField will lookup an object based on this slug_field. This means that you should ensure that the slug_field used has unique values to avoid multiple objects returning during the lookup.
#
# Please replace 'model_name' with the actual field name in your Product model that you want to use for selection. If you want to use a different field for selection, just change 'model_name' to your desired field name.