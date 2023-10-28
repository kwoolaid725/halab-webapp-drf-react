from django.contrib import admin
from . import models

# @Admin.register(models.Product)

admin.site.register(models.Brand)
admin.site.register(models.Product)

@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'status', 'slug', 'author')
    prepopulated_fields = {'slug': ('title',), }

admin.site.register(models.Category)
