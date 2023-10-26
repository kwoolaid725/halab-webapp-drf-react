from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..halab.models import Brand, Product, Sample, Test, TestDetailVacuum, CrProductData, VocReviews
from django.contrib.auth.models import User

class ProductTests(APITestCase):

    def test_view_posts(self):
        url = reverse('halab_api:product_listcreate')
        response = self.client.get(url, format='json') # client is a dummy web browser
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def create_product(self):

        self.test_brand = Brand.objects.create(name='LG', country='Korea')
        self.testuser1 = User.objects.create_user(username='testuser1', password='abc123')

        data = {
            "category": "VAC_CORDLESS_STICK",
            "brand_id": 1,
            "model_name": "CordZero A9",
            "color": "White",
            "release_date": "2020-01-01",
            "image": 'image.jpg'
        }
        url = reverse('halab_api:product_listcreate')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)