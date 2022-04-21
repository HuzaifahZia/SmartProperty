from ast import Delete
from pyexpat import model
from rest_framework import serializers
from .models import Property
from django import forms
from asyncio.windows_events import NULL
class PropertySerilizers(forms.ModelForm):
    # image1 = serializers.ImageField(
    #     max_length=None, allow_empty_file=False, allow_null=False, required=True)
    # image2 = serializers.ImageField(
    #     max_length=None, allow_empty_file=False, allow_null=False, required=True)
    # image3 = serializers.ImageField(
    #     max_length=None, allow_empty_file=False, allow_null=True, required=False)
    # image4 = serializers.ImageField(
    #     max_length=None, allow_empty_file=False, allow_null=True, required=False)
    # image5 = serializers.ImageField(
    #     max_length=None, allow_empty_file=False, allow_null=True, required=False)
    class Meta:
        model = Property
        fields = '__all__'
    # def validate(self, attrs):
    #         image1 = attrs.get('image1')
    #         if image1 is NULL:
    #             raise serializers.ValidationError('Image1 is required')
    #         image2 = attrs.get('image2')
    #         if image2 is NULL:
    #              raise serializers.ValidationError('Image2 is required')
    #         return attrs
            
    
    # def create(self, validated_data):
    #     return super().create(validated_data)
    # def update(self, instance, validated_data):
    #     instance.Purpose = validated_data.get('Purpose',instance.Purpose)
    #     instance.Category = validated_data.get('Propertytype',instance.Propertytype)
    #     instance.SubCategory = validated_data.get('PropertySubtype',instance.PropertySubtype)
    #     instance.City = validated_data.get('City',instance.City)
    #     instance.Address = validated_data.get('Location',instance.Location)
    #     instance.ZipCode = validated_data.get('ZipCode',instance.ZipCode)
    #     instance.Longitude = validated_data.get('Longitude',instance.Longitude)
    #     instance.Latitude = validated_data.get('Latitude',instance.Latitude)
    #     instance.PropertyTitle = validated_data.get('PropertyTitle',instance.PropertyTitle)
    #     instance.Description = validated_data.get('Description',instance.Description)
    #     instance.LandArea = validated_data.get('LandArea',instance.LandArea)
    #     instance.Unit = validated_data.get('Unit',instance.Unit)
    #     instance.BedRooms = validated_data.get('BedRooms',instance.BedRooms)
    #     instance.BathRooms = validated_data.get('BathRooms',instance.BathRooms)
    #     instance.UserId = validated_data.get('UserId',instance.UserId)

    #     instance.save()
    #     return instance

class GetPropertySerilizers(serializers.ModelSerializer):
       class Meta:
        model = Property
        fields = '__all__'

    
   
   
