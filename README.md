# ReactJS Assignment - Employee Data Dashboard

A comprehensive React application built as part of the Jotish Internship Assignment. This dashboard provides employee data visualization, camera integration, and interactive mapping features with a secure authentication system.

### Core Requirements (4 Screens)
- ✅ **Login Page** - Authentication with testuser/Test123
- ✅ **List Page** - Display data from REST API with dynamic table
- ✅ **Details Page** - Show item details with camera capture button
- ✅ **Photo Result Page** - Display captured photo with retake option

### Bonus Features
- ✅ **Bar Chart** - Salary distribution graph for first 10 employees
- ✅ **Map View** - Geographic visualization of employee cities

## 🚀 Live Demo Features

### 1. **Authentication System**
- Secure login with credentials: `testuser` / `Test123`
- Protected routes with AuthContext
- Automatic redirect after login/logout

### 2. **Data Management**
- Fetches data from: `https://backend.jotish.in/backend_dev/gettabledata.php`
- POST request with: `{"username":"test","password":"123456"}`
- Dynamic table generation from API response
- Graceful fallback to mock data if API fails

### 3. **Camera Integration**
- Access device camera with permission handling
- Real-time video preview
- Capture photo functionality
- Preserve data across navigation

### 4. **Data Visualization**
- **Bar Chart**: Salary distribution using Recharts
- **Interactive Map**: City locations with React Leaflet
- Responsive design for all screen sizes

## 🛠️ Technology Stack

- **React 19** - UI library
- **React Router 7** - Navigation and routing
- **Recharts** - Chart visualization
- **React Leaflet** - Interactive maps
- **Vite** - Build tool and development server
- **Context API** - State management
- **CSS3** - Styling with animations

## 📁 Project Structure
    src/
    ├── components/
    │ ├── Login.jsx # Authentication screen
    │ ├── List.jsx # Main data table
    │ ├── Details.jsx # Item details + camera
    │ ├── PhotoResult.jsx # Captured photo display
    │ ├── BarChart.jsx # Salary visualization
    │ └── MapView.jsx # Geographic visualization
    ├── context/
    │ └── AuthContext.jsx # Authentication state
    ├── services/
    │ └── api.js # API integration
    ├── styles/
    │ ├── Login.css
    │ ├── List.css
    │ ├── Details.css
    │ ├── PhotoResult.css
    │ ├── BarChart.css
    │ └── MapView.css
    ├── App.jsx # Main app with routing
    └── main.jsx # Entry point

text

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Modern browser with camera access

### Steps

1. Clone the repository

       git clone <https://github.com/Priyankashinde06/Jotish-assignment->
       cd jotish-assignment

2. Install dependencies

       npm install
       
3. Run development server

       npm run dev
   
4. Build for production

        npm run build

🔑 Application Flow

    Login (testuser/Test123) 
      ↓
    List Page (View all employees)
      ↓
    ├── View Details → Camera → Photo Result
    ├── View Chart → Salary Distribution
    └── View Map → City Locations
    
🌐 API Integration

The application connects to:

    POST https://backend.jotish.in/backend_dev/gettabledata.php
    Body: { "username": "test", "password": "123456" }
    
Features:

    Automatic CORS handling via Vite proxy

    Mock data fallback on API failure

    Comprehensive error logging

📸 Screenshots

Login Screen
<img width="1920" height="912" alt="Login page" src="https://github.com/user-attachments/assets/78a0c908-b326-473e-aea6-708538f6f5ff" />

Secure authentication with validation

List View
<img width="1920" height="1272" alt="List view" src="https://github.com/user-attachments/assets/fc3c6319-24b9-4df3-be3e-44b95c65328d" />

Dynamic data table with navigation options

Details with Camera
<img width="1920" height="912" alt="details page" src="https://github.com/user-attachments/assets/c04f2572-b8ff-4b63-a81b-3bf1da03832e" />

Item details with camera integration

Photo Result
<img width="1920" height="912" alt="photo result" src="https://github.com/user-attachments/assets/1b6f1b4c-53fc-4eee-8c02-744d307eb03c" />

Captured photo display with retake option

Bar Chart
<img width="1920" height="952" alt="salary chart" src="https://github.com/user-attachments/assets/64908472-c433-43fd-82b2-a8da58b68bb1" />

Salary distribution visualization

Map View
<img width="1920" height="952" alt="map" src="https://github.com/user-attachments/assets/dac4b5f3-0ac8-4317-8ce8-8de50fa1a95c" />

Interactive city locations

🎯 Key Features Explained

1. Professional Authentication

       Context-based auth management
       Protected route wrapper
       Persistent login state

2. Robust Data Handling

       Dynamic table generation
       API error recovery
       Loading states with animations

4. Camera Integration

       Real-time video stream
       Permission handling
       Cross-browser compatibility

5. Data Visualization

       Interactive charts with tooltips
       World map with markers
       Responsive containers

***🔧 Troubleshooting***

***Common Issues***

Camera not working:

    Ensure HTTPS or localhost

    Grant camera permissions

    Check browser settings

API connection failed:

    Check internet connection

    App automatically uses mock data

    Verify CORS settings

Maps not displaying:

    Internet required for tile layers

    Leaflet CSS must be loaded


