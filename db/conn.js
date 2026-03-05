import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectionStr = process.env.MONGO_URI

export default async function connectDB(){
try {
    await mongoose.connect(connectionStr);

    console.log('MongoDB Connected...')
} catch (error) {
    console.error(error.message)
    process.exit(1)
}
}