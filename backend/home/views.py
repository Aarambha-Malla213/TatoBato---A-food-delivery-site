from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.http import HttpResponse

def home(request):
    return HttpResponse("Django API backend is running!")
@api_view(['POST'])
def register(request):
    try:
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        phone_number = request.data.get('phoneNumber')
        address = request.data.get('address')

        print(f"Got: name={name}, email={email}, password={password}, phone={phone_number}, address={address}")  # DEBUG

        if not name or not email or not password:
            return Response({"error": "Name, email and password are required"}, status=400)

        # Check if user already exists
        with connection.cursor() as cursor:
            cursor.execute("SELECT email FROM Customers WHERE email = %s", [email])
            if cursor.fetchone():
                return Response({"error": "User with this email already exists"}, status=400)

            # Insert new user
            cursor.execute(
                "INSERT INTO Customers (name, email, phone_no, address, password) VALUES (%s, %s, %s, %s, %s)",
                [name, email, phone_number or '', address or '', password]
            )

        return Response({
            "message": "User registered successfully!",
            "name": name,
            "email": email
        }, status=201)

    except Exception as e:
        print("Error:", e)  # DEBUG
        return Response({"error": str(e)}, status=500)
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')  # Assuming password = phone_no for now

    with connection.cursor() as cursor:
        cursor.execute("SELECT name, email FROM Customers WHERE email = %s AND phone_no = %s", [email, password])
        user = cursor.fetchone()

    if user:
        name, email = user
        return Response({
            "message": "Login successful",
            "name": name,
            "email": email
        })
    else:
        return Response({"error": "Invalid credentials"}, status=401)