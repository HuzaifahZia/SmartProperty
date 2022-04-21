from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
import random
#  Custom User Manager
class UserManager(BaseUserManager):
  def create_user(self, email, name, phone ,cnic ,password=None,password2=None):
      """
      Creates and saves a User with the given email, name, tc and password.
      """
      if not email:
          raise ValueError('User must have an email address')

      user = self.model(
          email=self.normalize_email(email),
          name=name,
           cnic =cnic,
           phone =phone,
      )
      user.set_password(password)
      user.save(using=self._db)
      return user

  def create_superuser(self, email, name,phone,cnic, password=None):
      """
      Creates and saves a superuser with the given email, name, tc and password.
      """
      user = self.create_user(
          email,
          password=password,
          name=name,
          phone = phone,
          cnic =cnic,
       
      )
      user.is_admin = True
      user.save(using=self._db)
      return user

#otp code generator
def random_with_N_digits(n):
            range_start = 10**(n-1)
            range_end = (10**n)-1
            return random.randint(range_start, range_end)

#  Custom User Model
class User(AbstractBaseUser):
  email = models.EmailField(
      verbose_name='Email',
      max_length=255,
      unique=True,
  )
  name = models.CharField(max_length=200)
  date_of_birth = models.DateField(blank=True,null=True)
  otp = models.CharField(max_length=20,default=random_with_N_digits(6),null=True)
  phone = models.CharField(max_length=20,blank=True,null=True)
  cnic = models.CharField(max_length=20,blank=True,null=True)
  user_status = models.CharField(default='notVerified',max_length=20)
  cnic = models.CharField(max_length=20,blank=True,null=True)
  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name','phone','cnic']
  objects = UserManager()

  def __str__(self):
      return self.email

  def has_perm(self, perm, obj=None):
      "Does the user have a specific permission?"
      # Simplest possible answer: Yes, always
      return self.is_admin

  def has_module_perms(self, app_label):
      "Does the user have permissions to view the app `app_label`?"
      # Simplest possible answer: Yes, always
      return True

  @property
  def is_staff(self):
      "Is the user a member of staff?"
      # Simplest possible answer: All admins are staff
      return self.is_admin