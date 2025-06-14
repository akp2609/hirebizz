import express, { application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import applicationRoutes from './routes/applicationRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import chatRoutes from './routes/chatRoutes.js'
import { scheduleRemindersMessage } from './cron/scheduler.js';

dotenv.config({ path: '/etc/secrets/env/hirebizz-backend-secret' });

const app = express();
connectDB();

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    import('./cron/scheduler.js').then(({ scheduleRemindersMessage }) => {
        scheduleRemindersMessage();
    });
}

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

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => res.send('API running'));
app.get('/health', (req, res) => res.send("Server is healthy!"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
