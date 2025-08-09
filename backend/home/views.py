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
            cursor.execute("SELECT customer_id, name, email, phone_no, address FROM Customers WHERE email = %s", [email])
            user = cursor.fetchone()
            
        if user:
            customer_id, name, email, phone_no, address = user
            return Response({
                "id": customer_id,          # Return id here!
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


@api_view(['GET'])
def restaurants_list(request):
    """
    Return all restaurants as JSON.
    """
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT restaurant_id, name, location, contact, restaurant_image
            FROM restaurants
            ORDER BY name;
        """)
        rows = cursor.fetchall()
        # rows is a list of tuples: (id, restaurant_name, location, contact, restaurant_image)
    results = []
    for r in rows:
        results.append({
            "restaurant_id": r[0],
            "name": r[1],
            "location": r[2],
            "contact": r[3],
            "restaurant_image": r[4],
        })
    return Response(results)


@api_view(['GET'])
def menu_items_list(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT mi.item_id, r.restaurant_id, r.name as restaurant_name,
                   mi.item_name, mi.description, mi.price
            FROM Menu_Items mi
            JOIN restaurants r ON mi.restaurant_id = r.restaurant_id
            ORDER BY r.name, mi.item_name;
        """)
        rows = cursor.fetchall()
    
    results = []
    for row in rows:
        results.append({
            "item_id": row[0],
            "restaurant_id": row[1],
            "restaurant_name": row[2],
            "item_name": row[3],
            "description": row[4],
            "price": float(row[5]),
        })
    
    return Response(results)

@api_view(['GET'])
def search_menu_items(request):
    """
    Search for menu items by name.
    """
    search_query = request.GET.get('q', '').strip()
    
    if not search_query:
        return Response({"error": "Search query is required"}, status=400)
    
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT mi.item_id, r.restaurant_id, r.name as restaurant_name,
                   mi.item_name, mi.description, mi.price
            FROM Menu_Items mi
            JOIN restaurants r ON mi.restaurant_id = r.restaurant_id
            WHERE LOWER(mi.item_name) LIKE LOWER(%s)
               OR LOWER(mi.description) LIKE LOWER(%s)
               OR LOWER(r.name) LIKE LOWER(%s)
            ORDER BY r.name, mi.item_name;
        """, [f'%{search_query}%', f'%{search_query}%', f'%{search_query}%'])
        rows = cursor.fetchall()
    
    results = []
    for row in rows:
        results.append({
            "item_id": row[0],
            "restaurant_id": row[1],
            "restaurant_name": row[2],
            "item_name": row[3],
            "description": row[4],
            "price": float(row[5]),
        })
    
    return Response(results)


@api_view(['POST','GET'])
def add_order_details(request):
    """
    Insert order details into Order_Details table.
    order_id is NULL for now; will link later.
    """
    try:
        order_details = request.data.get("order_details", [])

        if not order_details:
            return Response({"error": "No order details provided"}, status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            for detail in order_details:
                item_id = detail.get("item_id")
                quantity = detail.get("quantity")
                price = detail.get("price")

                if not item_id or not quantity or not price:
                    return Response({"error": "Invalid data in one of the order items"}, status=status.HTTP_400_BAD_REQUEST)

                # Validate that item_id exists in Menu_Items table
                cursor.execute("SELECT item_id FROM Menu_Items WHERE item_id = %s", [item_id])
                if not cursor.fetchone():
                    return Response({"error": f"Item ID {item_id} not found in Menu_Items"}, status=status.HTTP_400_BAD_REQUEST)

                cursor.execute("""
                    INSERT INTO Order_Details (order_id, item_id, quantity, price)
                    VALUES (NULL, %s, %s, %s)
                """, [item_id, quantity, price])

        return Response({"message": "Order details added successfully"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("Error:", e)
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

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

        with connection.cursor() as cursor:
            cursor.execute("SELECT email FROM customers WHERE email = %s", [email])
            if cursor.fetchone():
                return Response({"error": "User with this email already exists"}, status=400)

            cursor.execute(
                "INSERT INTO customers (name, email, phone_no, address, password) VALUES (%s, %s, %s, %s, %s)",
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
    password = request.data.get('password')

    with connection.cursor() as cursor:
        cursor.execute("SELECT name, email, phone_no, address FROM customers WHERE email = %s AND password = %s", [email, password])
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
                "UPDATE customers SET name = %s, phone_no = %s, address = %s WHERE email = %s",
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
            cursor.execute("DELETE FROM customers WHERE email = %s", [email])
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
            cursor.execute("SELECT customer_id, name, email, phone_no, address FROM customers WHERE email = %s", [email])
            user = cursor.fetchone()
            
        if user:
            customer_id, name, email, phone_no, address = user
            return Response({
                "id": customer_id,
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


@api_view(['GET'])
def restaurants_list(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT restaurant_id, name, location, contact, restaurant_image
            FROM restaurants
            ORDER BY name;
        """)
        rows = cursor.fetchall()

    results = []
    for r in rows:
        results.append({
            "restaurant_id": r[0],
            "name": r[1],
            "location": r[2],
            "contact": r[3],
            "restaurant_image": r[4],
        })
    return Response(results)


@api_view(['GET'])
def menu_items_list(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT mi.item_id, r.restaurant_id, r.name as restaurant_name,
                   mi.item_name, mi.description, mi.price
            FROM menu_items mi
            JOIN restaurants r ON mi.restaurant_id = r.restaurant_id
            ORDER BY r.name, mi.item_name;
        """)
        rows = cursor.fetchall()
    
    results = []
    for row in rows:
        results.append({
            "item_id": row[0],
            "restaurant_id": row[1],
            "restaurant_name": row[2],
            "item_name": row[3],
            "description": row[4],
            "price": float(row[5]),
        })
    
    return Response(results)

@api_view(['GET'])
def search_menu_items(request):
    search_query = request.GET.get('q', '').strip()
    
    if not search_query:
        return Response({"error": "Search query is required"}, status=400)
    
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT mi.item_id, r.restaurant_id, r.name as restaurant_name,
                   mi.item_name, mi.description, mi.price
            FROM menu_items mi
            JOIN restaurants r ON mi.restaurant_id = r.restaurant_id
            WHERE LOWER(mi.item_name) LIKE LOWER(%s)
               OR LOWER(mi.description) LIKE LOWER(%s)
               OR LOWER(r.name) LIKE LOWER(%s)
            ORDER BY r.name, mi.item_name;
        """, [f'%{search_query}%', f'%{search_query}%', f'%{search_query}%'])
        rows = cursor.fetchall()
    
    results = []
    for row in rows:
        results.append({
            "item_id": row[0],
            "restaurant_id": row[1],
            "restaurant_name": row[2],
            "item_name": row[3],
            "description": row[4],
            "price": float(row[5]),
        })
    
    return Response(results)


@api_view(['POST'])
def create_order(request):
    try:
        data = request.data
        print("Received create_order data:", data)  # debug log

        total_amount = data.get("total_amount")
        order_details = data.get("order_details")
        customer_id = data.get("customer_id")
        
        if not customer_id:
            return Response({"error": "Please log in before placing an order."}, status=400)

        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO orders (customer_id, total_amount) VALUES (%s, %s) RETURNING order_id",
                [customer_id, total_amount]
            )
            new_order_id = cursor.fetchone()[0]

            for detail in order_details:
                item_id = detail.get("item_id")
                quantity = detail.get("quantity")
                price = detail.get("price")

                if not item_id or not quantity or not price:
                    return Response({"error": "Order detail missing item_id, quantity or price"}, status=400)

                cursor.execute(
                    "INSERT INTO order_details (order_id, item_id, quantity, price) VALUES (%s, %s, %s, %s)",
                    [new_order_id, item_id, quantity, price]
                )

        return Response({"order_id": new_order_id}, status=201)

    except Exception as e:
        print("Error in create_order:", e)
        return Response({"error": str(e)}, status=500)

# Optional: Remove or fix this endpoint if you want, since order details are inserted inside create_order
@api_view(['POST'])
def add_order_details(request):
    try:
        order_details = request.data.get("order_details", [])

        if not order_details:
            return Response({"error": "No order details provided"}, status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            for detail in order_details:
                item_id = detail.get("item_id")
                quantity = detail.get("quantity")
                price = detail.get("price")

                if not item_id or not quantity or not price:
                    return Response({"error": "Invalid data in one of the order items"}, status=status.HTTP_400_BAD_REQUEST)

                cursor.execute("SELECT item_id FROM menu_items WHERE item_id = %s", [item_id])
                if not cursor.fetchone():
                    return Response({"error": f"Item ID {item_id} not found in menu_items"}, status=status.HTTP_400_BAD_REQUEST)

                # Note: order_id must NOT be null here, so you should provide a valid order_id or remove this endpoint if unused
                # For now, raising error if no order_id
                order_id = detail.get("order_id")
                if not order_id:
                    return Response({"error": "order_id is required for order details"}, status=status.HTTP_400_BAD_REQUEST)

                cursor.execute("""
                    INSERT INTO order_details (order_id, item_id, quantity, price)
                    VALUES (%s, %s, %s, %s)
                """, [order_id, item_id, quantity, price])

        return Response({"message": "Order details added successfully"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("Error:", e)
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['GET'])
def order_history(request):

    print("Query params:", request.GET)
    email = request.GET.get('email')
    if not email:
        return Response({"error": "Email is required"}, status=400)
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT o.order_id, o.total_amount, o.order_date
            FROM Orders o
            JOIN Customers c ON o.customer_id = c.customer_id
            WHERE c.email = %s
            ORDER BY o.order_date DESC
        """, [email])
        orders = cursor.fetchall()

        result = []
        for order in orders:
            order_id, total_amount, order_date = order
            cursor.execute("""
                SELECT od.item_id, mi.item_name, od.quantity, od.price
                FROM Order_Details od
                JOIN Menu_Items mi ON od.item_id = mi.item_id
                WHERE od.order_id = %s
            """, [order_id])
            items = cursor.fetchall()

            item_list = [{
                "item_id": item[0],
                "item_name": item[1],
                "quantity": item[2],
                "price": float(item[3])
            } for item in items]

            result.append({
                "order_id": order_id,
                "total_amount": float(total_amount),
                "order_date": order_date.strftime('%Y-%m-%d'),
                "items": item_list,
            })

    return Response(result)