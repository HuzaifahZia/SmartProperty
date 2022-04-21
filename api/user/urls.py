from django.urls import path, include
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import UserRegisterationView,verifyOTPView,UserLoginView,UserProfileView,UserChangePasswordView,SendPasswordResetEmailView,UserPasswordResetView,LogOutAPIView,verifyTokenView,UserUpdateProfileView
# Create your views here.

def home(request):
    return JsonResponse({'Page Name': 'User API'})
urlpatterns = [
    path('', home, name='api.home'),
    path('register/', UserRegisterationView.as_view(),name='register'),
    path('verify-email/', verifyOTPView.as_view(),name='verify-email'),
    path('verify-token/', verifyTokenView.as_view(),name='verify-token'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('logout/', LogOutAPIView.as_view(),name='logout'),
    path('profile/', UserProfileView.as_view(),name='profile'),
    path('update-profile/', UserUpdateProfileView.as_view(),name='update-profile'),
    path('changepassword/', UserChangePasswordView.as_view(),name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/', UserPasswordResetView.as_view(), name='reset-password'),
]