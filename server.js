import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import { authenticateJWT } from './middlewares/authMiddleware.js';

import { register, Login, logout } from "./controllers/authControllers.js";
import { Add_task, duplicateTasks, editTasks, getTasks, removeTasks } from "./controllers/taskControllers.js";
import { setupDatabase, checkDatabase } from "./controllers/databaseController.js";
import { get_Profile_Picture, profileEdit, profileRender } from "./controllers/profileController.js";
import { create_reminder, duplicate_reminder, get_Reminder, remove_reminder } from "./controllers/reminderControllers.js";
import { create_project, duplicate_project, edit_project, get_projects } from "./controllers/projectController.js";
import { editReminder } from "./models/reminderModel.js";

dotenv.config();
const app = express();

// CORS configuration for production
const corsOptions = {
  origin: [
    'https://mind-scriptbackend-production-0888.up.railway.app',
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
app.post("/api/logout", authenticateJWT, logout);
// Tasks management
app.post("/api/tasks/add", authenticateJWT, Add_task);
app.post("/api/tasks/render", authenticateJWT, getTasks);
app.post("/api/tasks/delete", authenticateJWT, removeTasks);
app.post("/api/tasks/duplicate", authenticateJWT, duplicateTasks);
app.post("/api/tasks/edit", authenticateJWT, editTasks);
app.post("/api/profile/edit", authenticateJWT, profileEdit );
app.post("/api/profile/render", authenticateJWT, profileRender);
app.post("/api/profile/picture", authenticateJWT, get_Profile_Picture);

// Reminders management
app.post("/api/reminders/render", authenticateJWT, get_Reminder);
app.post("/api/reminders/add", authenticateJWT, create_reminder);
app.post("/api/reminders/delete" , authenticateJWT, remove_reminder);
app.post("/api/reminders/duplicate", authenticateJWT, duplicate_reminder);
app.post("/api/reminders/edit", authenticateJWT, editReminder);



// Projects management
app.post("/api/projects/render", authenticateJWT, get_projects);
app.post("/api/projects/add", authenticateJWT, create_project);
app.post("/api/projects/delete", authenticateJWT, remove_reminder);
app.post("/api/projects/duplicate", authenticateJWT, duplicate_project);
app.post("/api/projects/edit", authenticateJWT, edit_project);





// Database management routes (for setup and debugging)
app.post("/api/database/setup", authenticateJWT, setupDatabase);
app.get("/api/database/check", authenticateJWT, checkDatabase);

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

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

