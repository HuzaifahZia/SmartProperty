from rest_framework import routers
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from .views import PropertyApi
# router = routers.DefaultRouter()
# router.register('', views.PropertyViewSets)

urlpatterns = [
    #path('', include(router.urls))
  path('',(PropertyApi.as_view())),
  path('<int:pk>/',(PropertyApi.as_view())),
  
]
