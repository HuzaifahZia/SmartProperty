import imp
from multiprocessing import Condition
from django.db import models

# Create your models here.
from asyncio.windows_events import NULL
from unicodedata import name
from django.db import models
from api.user.models import User
# Create your models here.
class Property(models.Model):
    PropertyTitle = models.CharField(max_length=50,blank=False)
    Price = models.IntegerField(blank=False)
    #Category
    Category = models.CharField(max_length=50)
    SubCategory = models.CharField(max_length=50)
    #Listed
    Purpose = models.CharField(max_length=50)
    Description = models.CharField(max_length=255,blank=True)
    #Property Location
    Address = models.CharField(max_length=255,blank=False)
    City = models.CharField(max_length=50)
    ZipCode = models.IntegerField(blank=False)
    Longitude = models.FloatField(blank=False)
    Latitude = models.FloatField(blank=False)
  
   
# Property Details
    image1 = models.ImageField(upload_to='images/')
    image2 = models.ImageField(upload_to='images/')
    image3 = models.ImageField(upload_to='images/', blank=True, null=True)
    image4 = models.ImageField(upload_to='images/', blank=True, null=True)
    image5 = models.ImageField(upload_to='images/', blank=True, null=True)
    LandArea = models.IntegerField(blank=False)
    Unit = models.CharField(max_length=255,blank=False)
    # Rooms = models.IntegerField(blank=False)
    BedRooms = models.IntegerField(blank=False)
    BathRooms = models.IntegerField(blank=False)
    Structureype = models.CharField(max_length=255,blank=False)
    UserId = models.ForeignKey(User,on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True,blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return self.PropertyTitle