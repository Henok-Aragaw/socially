import express from 'express'
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"


import userRouter from './routes/user.route.js';


import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(clerkMiddleware());

app.get("/", (req,res) => res.send('Hello from server'));

app.use("/api/users", userRouter);

const startServer = async () => {
    try {
      await connectDB(); 

      if(ENV.NODE_ENV !== 'production'){
        app.listen(ENV.PORT, () => console.log(`Server is up and running on PORT ${ENV.PORT} 🚀`))
      }
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();

export default app;