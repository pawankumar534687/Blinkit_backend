import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import Dbconnection from './config/db.js'
import authRoute from './routes/auth.route.js'
import findbycategory from './routes/findbycategory.route.js'
import MongoStore from 'connect-mongo';
import deleted from './routes/deleted.route.js'
import address from './routes/address.route.js'
import order from './routes/order.route.js'
import cors from 'cors'
import session from 'express-session'

const app = express()
Dbconnection()

const allowedOrigins = [
  'https://blinkit-frontend-kvyy.onrender.com',
  'http://localhost:5173'
];

// 1. CORS should be first
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

// 2. JSON parser next
app.use(express.json())

// 3. Session middleware after that
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    dbName: 'myAppDB',
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 15,
    httpOnly: true,
    secure: false,
  }
}))

// Routes
app.use("/api", authRoute)
app.use("/api", findbycategory)
app.use("/api", deleted)
app.use("/api", address)
app.use("/api", order)

// Error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err
  res.status(status).json({ success: false, message })
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log("server running on port", port)
})
