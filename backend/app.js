import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskrouter from './src/routes/taskRoutes.js';
import router from './src/routes/authRoutes.js';
import { connectionDB } from './src/config/db.config.js';

dotenv.config();
const app = express();
connectionDB()
app.use(cors());
app.use(express.json());

app.get("/",(res, req)=>{
    res.send("Health check")
})

app.use('/auth',router);
app.use('/tasks', taskrouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

export default app;
