import express from "express";
import cors from "cors";
import taskRoutes from './routes/taskRoutes.js';

const app = express();

// Middleware
app.use(cors()); // Allow requests from all origins
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString(), message:" app working fine" });
});

// API Routes
app.use('/api/tasks', taskRoutes);

export default app;