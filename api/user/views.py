from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer,VerifyOtpSerializer,UserLoginSerializer,UserProfileSerializer,UserChangePasswordSerializer,SendPasswordResetEmailSerializer,UserPasswordResetSerializer,VerifyTokenSerializer,UserUpdateProfileSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from django.middleware import csrf
from  backend.settings import SIMPLE_JWT
from .utils import Util
from .models import User
import random
# Create your views here.
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }
#otp code generator
def random_with_N_digits(n):
            range_start = 10**(n-1)
            range_end = (10**n)-1
            return random.randint(range_start, range_end)

class UserRegisterationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        
         serializer = UserRegistrationSerializer(data=request.data)
         if serializer.is_valid(raise_exception=True):
             user = serializer.save()
             body = 'Your verification code is '+ str(user.otp)
             data = {
                'subject':'Email Verification Code',
                'body':body,
                'to_email':user.email
            }
             Util.send_email(data)
             token = get_tokens_for_user(user)
             return Response({'token':token, 'msg':'We have sent a passwrod reset otp to your email '}, status=status.HTTP_201_CREATED)
         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    response = Response()        
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      return Response({'token':token, 'msg':'Login Success'}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not  valid']}}, status=status.HTTP_404_NOT_FOUND)
   
class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)


class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    if len(request.data['password']) > 5:
      serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
      serializer.is_valid(raise_exception=True)
      return Response({'msg':'Password Changed Successfully.'}, status=status.HTTP_200_OK)
    return Response({'error':'Password length must be greater than 8 character. '}, status=status.HTTP_400_BAD_REQUEST)


class UserUpdateProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
      serializer = UserUpdateProfileSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      return Response({'msg':'User profile is  Successfully updated.'}, status=status.HTTP_200_OK)
    

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'info':'Password Reset token is sent to  your email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserPasswordResetSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully. '}, status=status.HTTP_200_OK)

class LogOutAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        print('Logout')
        try:
            refresh_token = request.data.get('refresh_token')
            print(refresh_token)
            token_obj = RefreshToken(refresh_token)
            
            return Response({'msg':"logout"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'err':"Wrong"},status=status.HTTP_400_BAD_REQUEST)


class verifyOTPView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = VerifyOtpSerializer(data=request.data)
        if serializer.is_valid():
          return Response({'msg': "Verification Successful"},status=status.HTTP_200_OK)
        return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        

class verifyTokenView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request):
        otp = request.data['otp']
        if User.objects.filter(otp=otp).exists() and len(otp)!=1:
          user = User.objects.get(otp=otp)
          serializer = VerifyTokenSerializer(data=request.data)
          if serializer.is_valid():
              token = get_tokens_for_user(user)
              return Response({'token':token,'msg': "Verification Successful"},status=status.HTTP_200_OK)
          return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        return Response({'error':'please enter 18 digit valid token.'},status=status.HTTP_400_BAD_REQUEST)