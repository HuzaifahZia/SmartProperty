import email
from unicodedata import name
from rest_framework import serializers
from .models import User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util
import random
#otp code generator
def random_with_N_digits(n):
            range_start = 10**(n-1)
            range_end = (10**n)-1
            return random.randint(range_start, range_end)



class UserRegistrationSerializer(serializers.ModelSerializer):
  # We are writing this becoz we need confirm password field in our Registratin Request
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  class Meta:
    model = User
    fields=['email', 'name', 'phone','cnic','user_status' ,'password', 'password2' ]
    extra_kwargs={
      'password':{'write_only':True}
    }

  # Validating Password and Confirm Password while Registration
  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

  def create(self, validate_data):
    return User.objects.create_user(**validate_data)

class VerifyOtpSerializer(serializers.Serializer):
  otp = serializers.CharField(max_length=20)
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['otp','email']
  def validate(self, attrs):
    otp = attrs.get('otp')
    email = attrs.get('email')
    if User.objects.filter(email=email).exists():
      if User.objects.filter(otp=otp,email=email).exists():
        user = User.objects.get(email = email)
        user.otp = 0
        user.user_status='verified'
        user.save()
      else:
       raise serializers.ValidationError("Otp code  is  invalid.")
    else:
      raise serializers.ValidationError("Email address is  invalid.")
    return attrs

class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = User
    fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'name', 'email' ,'phone','cnic']

class UserChangePasswordSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    user = self.context.get('user')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    user.set_password(password)
    user.save()
    return attrs


class UserUpdateProfileSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  name = serializers.CharField(max_length=200)
  phone = serializers.CharField(max_length=20)
  cnic = serializers.CharField(max_length=20)
  class Meta:
    fields = ['name', 'phone','cnic','email']
  
  def validate(self, attrs):
    email = attrs.get('email')
    if User.objects.filter(email=email).exists():
      user = User.objects.get(email = email)
      user.name = attrs.get('name')
      user.phone = attrs.get('phone')
      user.cnic = attrs.get('cnic')
      user.save()
      return attrs
    else:
      raise serializers.ValidationError('User email address is not valid.')

class SendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['email']

  def validate(self, attrs):
    email = attrs.get('email')
    if User.objects.filter(email=email).exists():
      user = User.objects.get(email = email)
      otp = random_with_N_digits(20)
      user.otp = otp
      user.save()
      # Send EMail
      body = 'Password Reset token '+ str(otp)
      data = {
        'subject':'Reset Your Password',
        'body':body,
        'to_email':user.email
      }
      Util.send_email(data)
      return attrs
    else:
      raise serializers.ValidationError('You are not a Registered User')

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('your token is  expired.')
      user.set_password(password)
      user.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('your token is  expired.')



class VerifyTokenSerializer(serializers.Serializer):
  otp = serializers.CharField(max_length=20)
  class Meta:
    fields = ['otp']
  def validate(self, attrs):
    otp = attrs.get('otp')
    if User.objects.filter(otp=otp).exists():
      user = User.objects.get(otp=otp)
      user.otp = 0
      user.save()  
    else:
      raise serializers.ValidationError(" your token key is invalid.")
    return attrs