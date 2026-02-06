/**
 * Backend Server for Todo Application
 * 
 * This Express server provides a RESTful API for managing todos.
 * Features:
 * - CORS configuration to allow frontend connections from Vercel and localhost
 * - In-memory storage for todos (data resets on server restart)
 * - CRUD operations: Create, Read, Update, Delete todos
 * 
 * API Endpoints:
 * - GET    /api/todos      - Get all todos
 * - POST   /api/todos      - Create a new todo
 * - PUT    /api/todos/:id  - Update a specific todo
 * - DELETE /api/todos/:id  - Delete a specific todo
 * - DELETE /api/todos      - Delete all todos
 */

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
// Allows requests from Vercel frontend and local development
const allowedOrigins = [
  "https://react-todo-project-git-main-shanieces-projects.vercel.app",
  "https://react-todo-project-mw870h4us-shanieces-projects.vercel.app",
  "http://localhost:5173",
  "http://localhost:5175"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Reject request if origin not allowed
    return callback(new Error("Not allowed by CORS"));
  }
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage for todos
let todos = [];
let currentId = 1;

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST create a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: currentId++,
    title: req.body.title,
    completed: req.body.completed || false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update a todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos[index] = {
    ...todos[index],
    ...req.body,
    id: id
  };
  
  res.json(todos[index]);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

// DELETE all todos
app.delete('/api/todos', (req, res) => {
  todos = [];
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});