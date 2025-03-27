import express from "express";
import Mission from "../model/mission.js";

const missionRouter = express.Router();

// Create a new mission
missionRouter.post("/create", async (req, res) => {
    try {
        const mission = new Mission(req.body);
        await mission.save();
        res.status(201).json({ message: "Mission created successfully", mission });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all missions
missionRouter.get("/", async (req, res) => {
    try {
        const missions = await Mission.find();
        res.json(missions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default missionRouter;
