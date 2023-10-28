
from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView
)

urlpatterns = [
    path('Admin/', admin.site.urls),
    path('', include('lg-webapp.halab.urls', namespace='halab')),
    path('api/', include('lg-webapp.halab_api.urls', namespace='halab_api')),
    path('api/user/', include('lg-webapp.users.urls', namespace='users')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('docs/', include_docs_urls(title='LG-HALAB API')),
    path('schema', get_schema_view(
        title="BlogAPI",
        description="API for the BlogAPI",
        version="1.0.0"
    ), name='openapi-schema'),
]
