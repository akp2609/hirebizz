import mongoose from "mongoose";


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Mongo error', error);
        process.exit(1);
    }
}

export default connectDB;