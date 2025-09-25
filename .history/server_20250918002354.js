import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { register, Login, logout } from "./controllers/authControllers.js";
import { Add_task, duplicateTasks, editTasks, getTasks, removeTasks } from "./controllers/taskControllers.js";
import { setupDatabase, checkDatabase } from "./controllers/databaseController.js";
import { get_Profile_Picture, profileEdit, profileRender } from "./controllers/profileController.js";
import { get_Reminder } from "./controllers/reminderControllers.js";

dotenv.config();
const app = express();

// CORS configuration for production
const corsOptions = {
  origin: [
    'https://mind-script-backend.onrender.com/',
    'http://localhost:3306',
    'http://127.0.0.1:5173',
    'http://localhost:5000',
    'http://localhost:5173',
    'https://maghafri2010.github.io',
    'https://maghafri2010.github.io/Mind-Script_Frontend' // Your actual GitHub Pages domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    success: true,
    message: "API is running successfully",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// API Routes
app.post("/api/login", Login);
app.post("/api/register", register);
app.post("/api/logout", logout);
// Tasks management
app.post("/api/tasks/add", Add_task);
app.post("/api/tasks/render", getTasks);
app.post("/api/tasks/delete", removeTasks);
app.post("/api/tasks/duplicate", duplicateTasks);
app.post("/api/tasks/edit", editTasks);
app.post("/api/profile/edit", profileEdit );
app.post("/api/profile/render", profileRender);
app.post("/api/profile/picture", get_Profile_Picture);

// Reminders management
app.post("/api/reminders/render", get_Reminder);
// Database management routes (for setup and debugging)
app.post("/api/database/setup", setupDatabase);
app.get("/api/database/check", checkDatabase);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    path: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  // Don't expose error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
    ...(isDevelopment && { stack: error.stack })
  });
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = process.env.SERVER_PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

