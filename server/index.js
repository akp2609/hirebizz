import express, { application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import applicationRoutes from './routes/applicationRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use((req,res,next)=>{
    console.log(`incoming ${req.method} ${req.url}`);
    next();
})

app.use((err,req,res,next)=>{
    if(err.code === 'LIMIT_FILE_SIZE'){
        return res.status(400).json({error: 'File size too large. Max size is 2MB.'});
    }

    if(err.message === 'Unexpected field' || err.message === 'File too large'){
        return res.status(400).json({error: err.message});
    }
    next(err);
})

app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/applications',applicationRoutes);
app.use('/api/job',jobRoutes)

app.get('/', (req, res) => res.send('API running'));
app.get('/health', (req, res) => res.send("Server is healthy!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
