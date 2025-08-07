from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Django API backend is running!"}, status=200)

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
        cursor.execute("SELECT name, email, phone_no, address FROM Customers WHERE email = %s AND password = %s", [email, password])
        user = cursor.fetchone()

    if user:
        name, email, phone_no, address = user
        return Response({
            "message": "Login successful",
            "name": name,
            "email": email,
            "phoneNumber": phone_no or '',
            "address": address or ''
        })
    else:
        return Response({"error": "Invalid credentials"}, status=401)

@api_view(['PUT'])
def update_profile(request):
    try:
        email = request.data.get('email')
        name = request.data.get('name')
        phone_number = request.data.get('phoneNumber')
        address = request.data.get('address')

        if not email:
            return Response({"error": "Email is required"}, status=400)

        with connection.cursor() as cursor:
            cursor.execute(
                "UPDATE Customers SET name = %s, phone_no = %s, address = %s WHERE email = %s",
                [name, phone_number or '', address or '', email]
            )
            if cursor.rowcount == 0:
                return Response({"error": "User not found"}, status=404)

        return Response({"message": "Profile updated successfully"}, status=200)

    except Exception as e:
        print("Error:", e)
        return Response({"error": str(e)}, status=500)

@api_view(['DELETE'])
def delete_profile(request):
    try:
        email = request.data.get('email')

        if not email:
            return Response({"error": "Email is required"}, status=400)

        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM Customers WHERE email = %s", [email])
            if cursor.rowcount == 0:
                return Response({"error": "User not found"}, status=404)

        return Response({"message": "Profile deleted successfully"}, status=200)

    except Exception as e:
        print("Error:", e)
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
def get_profile(request):
    try:
        email = request.GET.get('email')
        
        if not email:
            return Response({"error": "Email is required"}, status=400)
        
        with connection.cursor() as cursor:
            cursor.execute("SELECT name, email, phone_no, address FROM Customers WHERE email = %s", [email])
            user = cursor.fetchone()
            
        if user:
            name, email, phone_no, address = user
            return Response({
                "name": name,
                "email": email,
                "phoneNumber": phone_no or '',
                "address": address or ''
            })
        else:
            return Response({"error": "User not found"}, status=404)
            
    except Exception as e:
        print("Error:", e)
        return Response({"error": str(e)}, status=500)
