# 🍕 TatoBato - Food Delivery Platform

**TatoBato** is a modern, full-stack food delivery web application that brings delicious meals from local restaurants right to your doorstep. Built with cutting-edge technologies, TatoBato offers a seamless ordering experience with an intuitive user interface and robust backend infrastructure.

## 🌟 Why TatoBato?

In today's fast-paced world, convenience is key. TatoBato bridges the gap between hungry customers and quality restaurants by providing:

- **Effortless Discovery** - Browse through a curated selection of restaurants and their mouth-watering menu items
- **Smart Search** - Find exactly what you're craving with our intelligent search functionality
- **Secure Ordering** - Place orders with confidence through our secure, user-friendly platform

## 🎯 Project Vision

TatoBato was created to demonstrate modern web development best practices while solving a real-world problem. This project showcases:

- **Full-Stack Development** - Complete implementation from database design to user interface
- **Modern Architecture** - Separation of concerns with React frontend and Django REST API backend
- **Production Deployment** - Real-world hosting and deployment on cloud platforms
- **Scalable Design** - Built to handle growing user bases and expanding restaurant networks

Whether you're a developer looking to understand full-stack application development or a food lover seeking a convenient ordering platform, TatoBato delivers both technical excellence and practical functionality.

## 🌐 Live Demo

- **Frontend:** https://tatobato.onrender.com
- **Backend API:** https://tatobato-backend.onrender.com
- **Admin Panel:** https://tatobato-backend.onrender.com/admin/

## 🚀 Features

### Customer Features
- 🔐 **User Authentication** - Register, Login, Profile Management
- 🍽️ **Browse Menu** - View restaurants and their menu items
- 🔍 **Search Functionality** - Find food items by name, description, or restaurant
- 🛒 **Shopping Cart** - Add/remove items, view cart total
- 💳 **Order Management** - Place orders and view order history
- 📱 **Responsive Design** - Works on desktop and mobile devices

### Technical Features
- ⚡ **Fast Loading** - Static site deployment with global CDN
- 🔒 **Secure API** - CORS configured, environment-based configuration
- 💾 **PostgreSQL Database** - Hosted on Supabase for reliability
- 🎨 **Modern UI** - Clean, user-friendly interface
- 📊 **Admin Interface** - Django admin for content management

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - User interface library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling

### Backend
- **Django 5.2.4** - Web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Database (hosted on Supabase)
- **Gunicorn** - WSGI server for production
- **WhiteNoise** - Static file serving

### Infrastructure
- **Render** - Hosting platform (both frontend and backend)
- **Supabase** - PostgreSQL database hosting
- **GitHub** - Version control and CI/CD

## 📁 Project Structure

```
tatobato/
├── Frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context for state management
│   │   ├── assets/            # Images and static assets
│   │   └── config/            # Configuration files
│   ├── public/                # Public static files
│   └── package.json           # Frontend dependencies
├── backend/                   # Django backend application
│   ├── tatobato/             # Main Django project
│   ├── home/                 # Main Django app
│   │   ├── views.py          # API endpoints
│   │   ├── urls.py           # URL routing
│   │   └── models.py         # Database models
│   ├── requirements.txt      # Backend dependencies
│   └── startup.sh           # Production startup script
└── README.md                # Project documentation
```

## 🗄️ Database Schema

The application uses the following main tables:
- **customers** - User account information
- **restaurants** - Restaurant details
- **menu_items** - Food items available for order
- **orders** - Customer orders
- **order_details** - Individual items in each order

## 🚀 Deployment

### Frontend (Static Site)
- **Platform:** Render
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Environment Variables:**
  - `VITE_API_URL=https://tatobato-backend.onrender.com`

### Backend (Web Service)
- **Platform:** Render
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `chmod +x startup.sh && ./startup.sh`
- **Environment Variables:**
  - `DATABASE_URL` - Supabase PostgreSQL connection string
  - `SECRET_KEY` - Django secret key
  - `DEBUG=False`
  - `ALLOWED_HOSTS` - Render domain
  - `CORS_ALLOWED_ORIGINS` - Frontend domain

## 🔧 Local Development

### Prerequisites
- Node.js 16+ and npm
- Python 3.12+
- PostgreSQL (or use Supabase for development)

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## 📝 API Endpoints

### Authentication
- `POST /api/register/` - User registration
- `POST /api/login/` - User login
- `GET /api/get-profile/` - Get user profile
- `PUT /api/update-profile/` - Update user profile

### Menu & Restaurants
- `GET /api/restaurants/` - List all restaurants
- `GET /api/menu-items/` - List all menu items
- `GET /api/search-menu-items/?q=query` - Search menu items

### Orders
- `POST /api/create_order/` - Create new order
- `GET /api/order-history/` - Get user's order history

## 🔐 Environment Variables

### Frontend
```env
VITE_API_URL=https://tatobato-backend.onrender.com
```

### Backend
```env
DEBUG=False
SECRET_KEY=secret-key (not showing for security purposes)
DATABASE_URL=postgresql://postgres.dvsxuyrmwzqknitfejqu:tatobato@123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?sslmode=require
ALLOWED_HOSTS=tatobato-backend.onrender.com,localhost
CORS_ALLOWED_ORIGINS=https://tatobato.onrender.com,http://localhost:5173
```

## 🧪 Testing

The application includes:
- API endpoint testing via Django's built-in tools
- Frontend component testing setup with Vite
- Manual testing procedures for all user flows

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Authors

- **Aarambha Bom Malla**  
  GitHub: [@Aarambha-Malla213](https://github.com/Aarambha-Malla213)

- **Pranjal Barnwal**  
  GitHub: [@Pranjal0512](https://github.com/Pranjal0512)


## 🙏 Acknowledgments

- React team for the amazing frontend framework
- Django team for the robust backend framework
- Render for reliable hosting services
- Supabase for database hosting
- All contributors and testers

---

⭐ If you found this project helpful, please give it a star on GitHub!

## 📞 Support

For support, email mallaaarambha213@gmail.com or create an issue in this repository.
