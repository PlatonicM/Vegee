# Full Stack Project Documentation

## React + TypeScript + Vite (Frontend) + Node.js + Express + MongoDB (Backend)

This project is a **full-stack web application** with a modern frontend built using **React + TypeScript + Vite** and a scalable backend built using **Node.js + Express + MongoDB**.

The architecture follows a **REST API based client–server model** where the frontend communicates with the backend using HTTP requests.

---

# 📦 Project Architecture

```
FullStackApp
│
├── frontend (React + Vite + TypeScript)
│
└── backend (Node.js + Express + MongoDB)
```

Frontend handles:

* UI
* State management
* API calls
* Authentication handling

Backend handles:

* Business logic
* Database operations
* Authentication & authorization
* REST API

---

# 🚀 Frontend Documentation

## ⚛️ Tech Stack

* React 18
* TypeScript
* Vite
* Axios
* Tailwind CSS
* React Router
* React Toastify
* Framer Motion
* Lucide React Icons

---

# 📁 Frontend Folder Structure

```
frontend
│
├── public
│
├── src
│   ├── assets
│   ├── components
│   │   ├── Navbar
│   │   ├── Footer
│   │   └── UI
│   │
│   ├── pages
│   │   ├── Home
│   │   ├── Products
│   │   ├── Cart
│   │   ├── Checkout
│   │   └── AdminDashboard
│   │
│   ├── context
│   │   └── AppContext.tsx
│   │
│   ├── hooks
│   │
│   ├── services
│   │   └── api.ts
│   │
│   ├── types
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

# ⚙️ Frontend Installation

Navigate to the frontend folder

```
cd frontend
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Build production version

```
npm run build
```

Preview production build

```
npm run preview
```

---

# 🔌 Frontend Environment Variables

Create `.env` file

```
VITE_API_URL=http://localhost:5000/api
```

Access variable in code

```
import.meta.env.VITE_API_URL
```

---

# 🔗 API Integration Example

Using Axios

```
import axios from "axios"

const API = import.meta.env.VITE_API_URL

export const getProducts = async () => {
  const res = await axios.get(`${API}/products`)
  return res.data
}
```

---

# 🎨 UI Libraries

Frontend uses:

* Tailwind CSS for styling
* Framer Motion for animations
* Lucide Icons
* React Toastify for notifications

---

# 🧹 ESLint Configuration (Frontend)

Enable TypeScript aware linting

```
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname
    }
  }
})
```

Add React rules

```
import react from "eslint-plugin-react"

export default tseslint.config({
  settings: {
    react: {
      version: "18.3"
    }
  },

  plugins: {
    react
  },

  rules: {
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules
  }
})
```

---

# 🧠 Backend Documentation

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* dotenv
* CORS
* Morgan
* Multer (optional file uploads)

---

# 📁 Backend Folder Structure

```
backend
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   └── inventoryController.js
│
├── models
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Inventory.js
│
├── routes
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── inventoryRoutes.js
│
├── middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── utils
│
├── server.js
└── package.json
```

---

# ⚙️ Backend Installation

Navigate to backend folder

```
cd backend
```

Install dependencies

```
npm install
```

Run server

```
npm run dev
```

Server will start at

```
http://localhost:5000
```

---

# 🔐 Backend Environment Variables

Create `.env`

```
PORT=5000

MONGO_URI=mongodb://localhost:27017/vegstore

JWT_SECRET=your_secret_key

NODE_ENV=development
```

---

# 🗄 Database Connection Example

```
import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
```

---

# 🔑 Authentication Flow

1. User registers
2. Password hashed with bcrypt
3. JWT token generated
4. Token stored in frontend
5. Requests authenticated using middleware

Example JWT middleware

```
const jwt = require("jsonwebtoken")

module.exports = function(req,res,next){

 const token = req.headers.authorization?.split(" ")[1]

 if(!token){
   return res.status(401).json({message:"Unauthorized"})
 }

 const decoded = jwt.verify(token,process.env.JWT_SECRET)

 req.user = decoded

 next()
}
```

---

# 📡 Example API Routes

### Products

```
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Orders

```
GET    /api/orders
POST   /api/orders
PUT    /api/orders/:id/status
```

### Inventory

```
GET /api/inventory
PUT /api/inventory/:id
```

---

# 🧪 Example Request

```
POST /api/products
```

Body

```
{
 "name": "Tomato",
 "price": 40,
 "category": "Vegetable",
 "image": "url",
 "description": "Fresh farm tomatoes"
}
```

---

# 🔒 Security Best Practices

* Use JWT authentication
* Hash passwords with bcrypt
* Use environment variables
* Validate request inputs
* Rate limit API
* Use Helmet middleware

---

# 🚀 Deployment

## Frontend

Deploy on:

* Vercel
* Netlify
* Cloudflare Pages

Build command

```
npm run build
```

---

## Backend

Deploy on:

* Render
* Railway
* DigitalOcean
* AWS EC2

Start command

```
node server.js
```

---

# 🧩 Future Improvements
* Redis caching
* WebSocket real-time updates
* GraphQL API
* Docker containerization
* CI/CD pipeline
* Role-based admin panel

---

# 📄 License
MIT License



# admin@vegge.com / admin123 login 