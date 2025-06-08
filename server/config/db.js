import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            dbName: "hireBizzProd"
        });
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Mongo error', error);
        process.exit(1);
    }
}

function getDbByName(dbName){
    if(!mongoose.connection.client){
        throw new Error("MongoDB not connected yet");
    }
    return mongoose.connection.client.db(dbName);
}

export {getDbByName};