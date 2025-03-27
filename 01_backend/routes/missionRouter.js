import express from "express";
import Mission from "../model/mission.js";
import requireLogin from "../middleware/requireLogin.js";

const MissionRouter = express.Router();

// Create a new mission
MissionRouter.post("/create", requireLogin, async (req, res) => {
  try {
      console.log("Received Request Body:", req.body); // Debugging Log
      console.log("User Role:", req.user.role); // Log user role

      // Ensure the user is a Facility Manager
      if (req.user.role !== "FacilityManager") {
          return res.status(403).json({ error: "Only Facility Managers can create a mission" });
      }

      const { name, flightPath, scheduledTime, frequency, altitude, location } = req.body;

      // Check for missing fields
      if (!name || !flightPath || !scheduledTime || !frequency || !altitude || !location) {
          console.log("Missing Fields:", { name, flightPath, scheduledTime, frequency, altitude, location });
          return res.status(400).json({ error: "All required fields must be provided" });
      }

      // Create and save mission
      const mission = new Mission({ name, flightPath, scheduledTime, frequency, altitude, location });
      await mission.save();

      res.status(201).json({ message: "Mission created successfully", mission });
  } catch (error) {
      console.error("Mission Creation Error:", error);
      res.status(500).json({ error: "Server error", details: error.message });
  }
});


// Get all missions
MissionRouter.get("/", requireLogin, async (req, res) => {
    try {
        const missions = await Mission.find()
        res.json(missions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific mission by ID
MissionRouter.get("/:id", requireLogin, async (req, res) => {
    try {
        const mission = await Mission.findById(req.params.id)

        if (!mission) {
            return res.status(404).json({ error: "Mission not found" });
        }

        res.json(mission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a mission
MissionRouter.put("/:id", requireLogin, async (req, res) => {
    try {
        const updatedMission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedMission) {
            return res.status(404).json({ error: "Mission not found" });
        }

        res.json({ message: "Mission updated successfully", mission: updatedMission });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a mission
MissionRouter.delete("/:id", requireLogin, async (req, res) => {
    try {
        const deletedMission = await Mission.findByIdAndDelete(req.params.id);

        if (!deletedMission) {
            return res.status(404).json({ error: "Mission not found" });
        }

        res.json({ message: "Mission deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default MissionRouter;
