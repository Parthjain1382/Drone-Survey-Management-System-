// External dependencies
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { connectDatabase } from "./config/database.js";
//router
import UserRouter from "./routes/userRouter.js";
import MissionRouter from "./routes/missionRouter.js";
import droneRouter from "./routes/droneRouter.js";
import reportRouter from "./routes/reportRouter.js";
// Middleware
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


// Connect to MongoDB and start server if successful, otherwise log error
connectDatabase().then(() => {
    // Routes    
    app.use("/api/users", UserRouter);
    app.use("/api/missions", MissionRouter);
    app.use("/api/drones", droneRouter);
    app.use("/api/reports", reportRouter);
    
    // Start server
    const PORT = process.env.PORT ||4000;
    app.listen(PORT, () => {
        console.log(`Server is running. Listening on port ${PORT}`);
    });
}).catch(error => {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit the process with error status code
});