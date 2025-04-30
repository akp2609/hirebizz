const express = require('express');
const connectDB = require('./config/db');

const app = express();
require('dotenv').config;
connectDB

app.use(express.json());

app.use('/api/auth',authRoutes);
app.get('/',(req,res)=>res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});