from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, CustomUserDetails

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('details/', CustomUserDetails.as_view(), name='user_details')


]
