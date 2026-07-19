from django.contrib.auth import authenticate
from django.urls import path
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(['POST'])
@permission_classes([AllowAny])
def obtain_auth_token(request):
    email = request.data.get('username') or request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password required'}, status=400)

    user = authenticate(username=email, password=password)
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=401)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


urlpatterns = [
    path('', obtain_auth_token, name='auth-token'),
]
