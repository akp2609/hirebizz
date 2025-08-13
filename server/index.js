import dotenv from 'dotenv';
dotenv.config({ path: '/etc/secrets/backend/env/hirebizz-backend-env' });

import express, { application } from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import applicationRoutes from './routes/applicationRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import chatRoutes from './routes/chatRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import reportRoutes from './routes/reportRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js';
import cors from 'cors';
import { authLimiter, generalLimiter } from './utils/authLimiter.js';
import { initRedis } from './utils/redis.js';
import { scheduleRemindersMessage } from './cron/scheduler.js';


console.log("Environment loaded:", process.env.NODE_ENV)

const app = express();
connectDB();
(async () => {
    await initRedis(); 
    app.listen(8080, () => console.log('Server running on port 8080'));
})();

app.use(express.json());

app.set('trust proxy', 1);

app.use(cors({
    origin: '*',
    credentials: true,
}));

if (process.env.NODE_ENV !== 'production') {
    import('./cron/scheduler.js').then(({ scheduleRemindersMessage }) => {
        scheduleRemindersMessage();
    });
}

app.use(generalLimiter)


app.use((req, res, next) => {
    console.log(`incoming ${req.method} ${req.url}`);
    next();
})

app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size too large. Max size is 2MB.' });
    }

    if (err.message === 'Unexpected field' || err.message === 'File too large') {
        return res.status(400).json({ error: err.message });
    }
    next(err);
})

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/analytics', analyticsRoutes)

app.get('/', (req, res) => res.send('API running'));
app.get('/health', (req, res) => res.send("Server is healthy!"));


try {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error("❌ Error starting server:", error);
}
