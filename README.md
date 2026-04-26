# SKY-PARK Apartments Management System

Full-stack apartment management app.  
**Frontend** → React + Vite (port 5173)  
**Backend**  → Node.js + Express (port 5000)  
**Database** → MongoDB via Mongoose (connect when ready)

---

## ⚡ Quick Start (Frontend review without DB)

The frontend falls back to **localStorage** automatically when the backend
is unreachable, so you can review every page right now.

```bash
# 1. Install frontend deps
cd frontend
npm install

# 2. Start frontend
npm run dev
```

Open **http://localhost:5173** and log in with the demo credentials shown on
the login page.

---

## 🖥️  Running the Backend

```bash
cd backend
npm install
npm run dev     # uses nodemon for auto-reload
# or
npm start       # production
```

The server starts on **http://localhost:5000**.  
Health check → `GET http://localhost:5000/api/health`

---

## 🔌 Adding MongoDB (when ready)

1. Open `backend/.env`
2. Set `MONGODB_URI`:

   ```env
   # Local MongoDB
   MONGODB_URI=mongodb://localhost:27017/apartment_mgmt

   # MongoDB Atlas
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/apartment_mgmt
   ```

3. Restart the backend (`npm run dev`).
4. You will see `✅ MongoDB connected` in the console.

> **Nothing else to change.** The frontend switches from localStorage to the
> real backend automatically once the backend responds successfully.

---

## 📁 Project Structure

```
skypark-apartment-mgmt/
├── frontend/                   React + Vite app
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # tries backend → falls back to localStorage
│   │   ├── utils/
│   │   │   ├── api.js                # all backend API calls
│   │   │   └── storage.js            # localStorage helpers + seed data
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── admin/
│   │   │   ├── resident/
│   │   │   └── staff/
│   │   └── components/
│   ├── .env                          # VITE_API_URL=/api
│   └── vite.config.js                # proxy /api → localhost:5000
│
└── backend/                    Express API
    ├── src/
    │   ├── config/
    │   │   └── db.js                 # MongoDB connection (fill MONGODB_URI in .env)
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Apartment.js
    │   │   ├── Complaint.js
    │   │   ├── Payment.js
    │   │   └── Property.js
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── userController.js
    │   │   ├── apartmentController.js
    │   │   ├── complaintController.js
    │   │   ├── paymentController.js
    │   │   └── propertyController.js
    │   ├── middleware/
    │   │   └── auth.js               # JWT protect + authorize
    │   ├── routes/
    │   │   ├── auth.js
    │   │   ├── users.js
    │   │   ├── apartments.js
    │   │   ├── complaints.js
    │   │   ├── payments.js
    │   │   └── properties.js
    │   └── server.js                 # Express entry point
    └── .env                          # MONGODB_URI, JWT_SECRET, PORT, CLIENT_URL
```

---

## 🔐 API Endpoints

| Method | Endpoint                  | Auth         | Description              |
|--------|---------------------------|--------------|--------------------------|
| POST   | `/api/auth/signup`        | Public       | Register new user        |
| POST   | `/api/auth/login`         | Public       | Login → returns JWT      |
| GET    | `/api/auth/me`            | Any role     | Current user info        |
| GET    | `/api/users`              | Admin        | All users                |
| PUT    | `/api/users/:id`          | Admin / Own  | Update user              |
| DELETE | `/api/users/:id`          | Admin        | Delete user              |
| GET    | `/api/apartments`         | Any role     | List apartments          |
| POST   | `/api/apartments`         | Admin        | Create apartment         |
| PUT    | `/api/apartments/:id`     | Admin        | Update apartment         |
| DELETE | `/api/apartments/:id`     | Admin        | Delete apartment         |
| GET    | `/api/complaints`         | Role-filtered| List complaints          |
| POST   | `/api/complaints`         | Resident     | Submit complaint         |
| PUT    | `/api/complaints/:id`     | Admin/Staff  | Update complaint status  |
| GET    | `/api/payments`           | Role-filtered| List payments            |
| POST   | `/api/payments`           | Admin        | Record payment           |
| GET    | `/api/properties`         | Role-filtered| List properties          |
| POST   | `/api/properties`         | Admin        | Add property             |

---

## 🔑 Demo Credentials

| Role     | Email                   | Password    |
|----------|-------------------------|-------------|
| Admin    | admin@skypark.com       | Admin@123   |
| Resident | resident1@skypark.com    | Resident@1  |
| Staff    | staff@skypark.com       | Staff@123   |
