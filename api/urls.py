from django.urls import path, include
from django.http import JsonResponse
# Create your views here.


def home(request):
    return JsonResponse({'Page Name': ' API'})
urlpatterns = [
    path('', home, name='api.home'),
    path('user/', include('api.user.urls')),
    path('property/', include('api.property.urls')),
  
]
