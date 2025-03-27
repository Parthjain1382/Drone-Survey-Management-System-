// External dependencies
import express from "express";
import 'dotenv/config';
import cors from 'cors';
import { connectDatabase } from "./config/database.js";

//router
import missionRoutes from "./routes/missionRoute.js";

// Middleware
const app = express();
app.use(cors());
app.use(express.json());



// Connect to MongoDB and start server if successful, otherwise log error
connectDatabase().then(() => {
    // Routes    
    app.use("/api/missions", missionRoutes);
  
    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running. Listening on port ${PORT}`);
    });
}).catch(error => {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit the process with error status code
});