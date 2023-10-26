from django.test import TestCase
from django.contrib.auth.models import User
from ..halab.models import Product, Brand, Sample, Test, TestDetailVacuum, CrProductData, VocReviews

class Test_Create_Product(TestCase):

    @classmethod
    def setUpTestData(cls):
        test_Brand = Brand.objects.create(name='LG', country='Korea')
        testuser1 = User.objects.create_user(username='testuser1', password='abc123')
        test_Product = Product.objects.create(
            category='VAC_CORDLESS_STICK',
            brand_id=1,
            model_name='CordZero A9',
            color='Silver',
            release_date='2020-01-01',
        )
        test_Sample = Sample.objects.create(
            inv_no=1234,
            product_id=1,
            product_stage='MP',
            owner_id=1,
            remark='test remark',
        )
        test_Test = Test.objects.create(
            description='test description',
            test_category='CR',
            product_category='VAC_CORDLESS_STICK',
            test_status='PENDING',
            due_date='2024-01-01',
            completion_date='2024-01-01',
            remark='test remark',
            owner_id=1
        )
        # test_TestDetailVacuum = TestDetailVacuum.objects.create(
        #     test_id=1,
        #     sample_id=1,
        #     test_target='test target',
        #     test_group='test method',
        #     test_case='test case',
        #
        # )

    def test_product_content(self):
        product = Product.objects.get(id=1)
        brand = Brand.objects.get(id=1)
        category = f'{product.category}'
        model_name = f'{product.model_name}'
        color = f'{product.color}'
        release_date = f'{product.release_date}'
        self.assertEqual(str(brand), 'LG')
        self.assertEqual(category, 'VAC_CORDLESS_STICK')
        self.assertEqual(model_name, 'CordZero A9')
        self.assertEqual(color, 'Silver')
        self.assertEqual(release_date, '2020-01-01')
        self.assertEqual(str(product), 'VAC_CORDLESS_STICK - LG CordZero A9')

    def test_sample_content(self):
        sample = Sample.objects.get(id=1)
        inv_no = f'{sample.inv_no}'
        product_stage = f'{sample.product_stage}'
        remark = f'{sample.remark}'
        self.assertEqual(inv_no, '1234')
        self.assertEqual(product_stage, 'MP')
        self.assertEqual(remark, 'test remark')
        self.assertEqual(str(sample), 'VAC_CORDLESS_STICK - LG CordZero A9 - 1234')

    def test_test_content(self):
        test = Test.objects.get(id=1)
        description = f'{test.description}'
        test_category = f'{test.test_category}'
        product_category = f'{test.product_category}'
        test_status = f'{test.test_status}'
        remark = f'{test.remark}'
        self.assertEqual(description, 'test description')
        self.assertEqual(test_category, 'CR')
        self.assertEqual(product_category, 'VAC_CORDLESS_STICK')
        self.assertEqual(test_status, 'PENDING')
        self.assertEqual(remark, 'test remark')
        self.assertEqual(str(test), 'test description')