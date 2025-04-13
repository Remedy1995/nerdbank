const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const path = require("path");
const PORT = process.env.PORT || 60000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Account = require('./routes/account');
const Deposit = require('./routes/deposits');
const Transfer = require('./routes/transfers');
const User =  require('./routes/user');
const Bank = require('./routes/bank');
const Card = require('./routes/card');
const Pin = require('./routes/pin');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: path.join(__dirname, "../nerdbank") }); // Ensure Next.js runs from frontend folder
const handle = app.getRequestHandler();
const server = express();

// Swagger options for API documentation
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transfers API",
      version: "1.0.0",
      description: "API for managing transfers",
    },
    servers: [
      {
        url: process.env.BACKEND_APP_URL + "/api" // Base URL of your backend API
      },
    ],
  },
  apis: [path.join(__dirname, "routes/*.js"), path.join(__dirname, "controllers/*.js")]
 // Adjust folder structure as needed
};

// Middleware
server.use(express.json());
server.use(cookieParser());

// ✅ Fix CORS for Cookies & API Requests
server.use(cors({
  origin: process.env.FRONTEND_APP_URL,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
  exposedHeaders: ['Set-Cookie'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
}));

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Setup Swagger UI to expose API documentation
server.use('/api/swagger-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Swagger JSON route
server.get('/api/swagger-json', (req, res) => {
  res.json(swaggerDocs);
});

//health check of api up
server.get('/api', (req,res) => {
  res.send('You are on the Bank APi')
})

// ✅ API routes
server.use('/api/user',User);
server.use('/api/transfers',Transfer)
server.use('/api/accounts',Account);
server.use('/api/deposits',Deposit);
server.use('/api/bank',Bank);
server.use('/api/card',Card);
server.use('/api/pin',Pin);

// Error handling middleware
server.use((err, req, res, next) => {
   console.log('request',req)
  console.error(err);
  res.status(500).send('Something went wrong!');
});
// ✅ Fix Safari Cookie Issues
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});



mongoose.connect(process.env.MONGO_ONLINE,{
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 20000 //
})
.then(() => console.log("✅ Successfully connected to MongoDB"))
.catch(err => console.log("❌ Error connecting to MongoDB", err));

mongoose.connection.once('open', () => {
console.log("🔗 MongoDB connection is open and ready to use.");
});
mongoose.connection.on("error", (err) => {
console.error("MongoDB connection error:", err);
});

// ✅ MongoDB connection





app.prepare().then(() => {
  // ✅ API routes are handled first
  server.use('/api', (req, res, next) => {
    next();
  });

  // ✅ Redirect root requests if needed
  server.get('/', (req, res) => {
     return handle(req, res);
  });

  // ✅ Serve Next.js frontend only for non-API routes
  server.all('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      return handle(req, res);
    }
    res.status(404).json({ error: "API route not found" });
  });

  // ✅ Keep Render awake (Prevent idle shutdown)
  setInterval(() => {
    fetch(`https://nerd-v43u.onrender.com/api`)
      .then(res => console.log(`✅ Keep-alive ping sent. Status: ${res.status}`))
      .catch(err => console.error(`❌ Keep-alive ping failed: ${err.message}`));
  }, 60000 * 5); // Ping every 5 minutes

  // ✅ Start Express server
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running at http://localhost:${PORT}/api`);
  });
});



