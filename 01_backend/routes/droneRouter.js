import express from "express";
import Drone from "../model/drone.js";
import requireLogin from "../middleware/requireLogin.js";

const router = express.Router();

// ✅ Create a new drone (Only Facility Managers)
router.post("/", requireLogin, async (req, res) => {
    try {
        if (req.user.role !== "FacilityManager") {
            return res.status(403).json({ error: "Only Facility Managers can add drones" });
        }

        const { name, model, status, batteryLevel } = req.body;

        if (!name || !model || batteryLevel === undefined) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        const newDrone = new Drone({
            name,
            model,
            status,
            batteryLevel,
            lastMission: null,
        });

        await newDrone.save();
        res.status(200).json({ message: "Drone added successfully", drone: newDrone });

    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// ✅ Get all drones
router.get("/", async (req, res) => {
    try {
        const drones = await Drone.find()
        res.status(200).json(drones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get a single drone by ID
router.get("/:id", async (req, res) => {
    try {
        const drone = await Drone.findById(req.params.id).populate("lastMission");
        if (!drone) {
            return res.status(404).json({ error: "Drone not found" });
        }
        res.json(drone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update a drone
router.put("/:id", requireLogin, async (req, res) => {
    try {
        if (req.user.role !== "FacilityManager") {
            return res.status(403).json({ error: "Only Facility Managers can update drones" });
        }

        const { name, model, status, batteryLevel } = req.body;
        const updatedDrone = await Drone.findByIdAndUpdate(
            req.params.id,
            { name, model, status, batteryLevel },
            { new: true, runValidators: true }
        );

        if (!updatedDrone) {
            return res.status(404).json({ error: "Drone not found" });
        }

        res.status(200).json({ message: "Drone updated successfully", drone: updatedDrone });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete a drone
router.delete("/:id", requireLogin, async (req, res) => {
    try {
        if (req.user.role !== "FacilityManager") {
            return res.status(403).json({ error: "Only Facility Managers can delete drones" });
        }

        const drone = await Drone.findById(req.params.id);
        console.log(drone);
        if (!drone) {
            return res.status(404).json({ error: "Drone not found" });
        }

        if (drone.status !== "Available") {
            return res.status(400).json({ error: "Cannot delete drone that is not in Available state" });
        }

        await Drone.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Drone deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
