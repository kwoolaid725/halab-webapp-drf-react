from django.db import models
# from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Post(models.Model):

    # by default only published posts will be returned
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=1)
    title = models.CharField(max_length=250)
    excerpt = models.TextField(null=True, blank=True)
    content = models.TextField()
    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blog_posts')
    status = models.CharField(
        max_length=10, choices=options, default='published')
    objects = models.Manager()  # default manager
    postobjects = PostObjects()  # custom manager

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title


PRODUCT_CATEGORY = [
    ('VACUUM', (
        ('VAC_CORDLESS_STICK', 'Cordless Stick Vacuum'),
        ('VAC_CORDLESS_MOP', 'Cordless Mop/Wet Vacuum'),
        ('VAC_CORDED_UPRIGHT', 'Corded Upright Vacuum'),
        ('VAC_CORDED_STICK', 'Corded Stick Vacuum'),
        ('VAC_CORDED_CANISTER', 'Corded Canister Vacuum'),
        ('VAC_ROBOT', 'Robot Vacuum'),
        ('VAC_ROBOT_MOP', 'Robot Mop')
    )),
]

class Brand(models.Model):
    name = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):

    category = models.CharField(max_length=50, choices=PRODUCT_CATEGORY)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    model_name = models.CharField(max_length=100)
    color = models.CharField(max_length=50, null=True, blank=True)
    release_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='vacuum_images', null=True, blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products', default="")


    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{str(self.category)} - {self.brand} {self.model_name}' # will give error in admin

class Sample(models.Model):
    PRODUCT_STAGE = [
        ('MP', 'MP'),
        ('DV', 'DV'),

    ]
    inv_no = models.IntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_stage = models.CharField(max_length=3, choices=PRODUCT_STAGE)
    created_at = models.DateTimeField(default=timezone.now)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='vacuum_inventories')
    remark = models.CharField(max_length=200, null=True, blank=True)


    def __str__(self):
        return f'{self.product} - {self.inv_no}'


class Test(models.Model):
    TEST_CATEGORY = [
        ('CR', 'CR'),
        ('RU', 'Real-Use'),
        ('FT', 'Field Test'),
        ('CRDI', 'CRDI'),
    ]

    TEST_STATUS = [
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
    ]

    description = models.CharField(max_length=100)
    test_category = models.CharField(max_length=100, choices=TEST_CATEGORY)
    product_category = models.CharField(max_length=100, choices=PRODUCT_CATEGORY)
    samples = models.ManyToManyField(Sample)
    test_status = models.CharField(max_length=20, choices=TEST_STATUS, default='PENDING')
    testers = models.ManyToManyField(settings.AUTH_USER_MODEL)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)
    due_date = models.DateField(null=True, blank=True)
    completion_date = models.DateField(null=True, blank=True)
    remark = models.CharField(max_length=200, null=True, blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tests')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.description

class TestDetailVacuum(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE)
    test_target = models.CharField(max_length=100, null=True, blank=True)
    test_group = models.CharField(max_length=100, null=True, blank=True)
    test_case = models.CharField(max_length=100, null=True, blank=True)
    tester = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    brush_type = models.CharField(max_length=50, null=True, blank=True)
    test_measure = models.CharField(max_length=100, null=True, blank=True)
    value = models.FloatField(null=True, blank=True)
    units = models.CharField(max_length=10, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)
    remark = models.CharField(max_length=200, null=True, blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='test_detail_vacuums')

    def __str__(self):
        return f'{self.test} - {self.sample}'

class CrProductData(models.Model):

    category = models.CharField(max_length=100, choices=PRODUCT_CATEGORY)
    subcategory = models.CharField(max_length=100)
    date = models.DateField(null=True, blank=True)
    ranking = models.IntegerField(null=True, blank=True)
    model_name = models.CharField(max_length=100)
    price = models.FloatField(null=True, blank=True)
    overall_score = models.FloatField(null=True, blank=True)
    predicted_reliability = models.CharField(max_length=100, null=True, blank=True)
    owner_satisfaction = models.CharField(max_length=100, null=True, blank=True)
    score1 = models.FloatField(null=True, blank=True)
    score2 = models.FloatField(null=True, blank=True)
    score3 = models.FloatField(null=True, blank=True)
    score4 = models.FloatField(null=True, blank=True)
    score5 = models.FloatField(null=True, blank=True)
    score6 = models.FloatField(null=True, blank=True)
    score7 = models.FloatField(null=True, blank=True)
    score8 = models.FloatField(null=True, blank=True)
    score9 = models.FloatField(null=True, blank=True)
    score10 = models.FloatField(null=True, blank=True)
    spec1 = models.CharField(max_length=100, null=True, blank=True)
    spec2 = models.CharField(max_length=100, null=True, blank=True)
    spec3 = models.CharField(max_length=100, null=True, blank=True)
    spec4 = models.CharField(max_length=100, null=True, blank=True)
    spec5 = models.CharField(max_length=100, null=True, blank=True)
    spec6 = models.CharField(max_length=100, null=True, blank=True)
    spec7 = models.CharField(max_length=100, null=True, blank=True)
    spec8 = models.CharField(max_length=100, null=True, blank=True)
    spec9 = models.CharField(max_length=100, null=True, blank=True)
    spec10 = models.CharField(max_length=100, null=True, blank=True)
    spec11 = models.CharField(max_length=100, null=True, blank=True)
    spec12 = models.CharField(max_length=100, null=True, blank=True)
    slug = models.SlugField(max_length=100, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cr_product_data', default="")

    def __str__(self):
        return f'{self.category} - {self.subcategory} -  {self.model_name}'

class VocReviews(models.Model):
    retailer = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    rating = models.IntegerField(null=True, blank=True)
    post_date = models.DateField(null=True, blank=True)
    reviewer = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    review = models.TextField(null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='voc_reviews')

    def __str__(self):
        return f'{self.retailer} - {self.brand} - {self.model_name} - {self.rating}'

