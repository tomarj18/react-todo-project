import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "https://my-todo-app.vercel.app",
  "http://localhost:5173",
  "http://localhost:5175"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json());
