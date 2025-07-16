import mongoose from "mongoose"
import { ENV } from "./env.js"


export const connectDB = async () => {
    try {
      const con = await mongoose.connect(ENV.MONGO_URI);
      console.log(`Connected to db successfully 🥂 ${con.connection.host}`)  
    } catch (error) {
        console.log('Error connecting to MONGODB');
        process.exit(1);
    }
}