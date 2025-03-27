import express from "express";
import Report from "../model/Report.js";
import requireLogin from "../middleware/requireLogin.js";

const ReportRouter = express.Router();

// 1️⃣ Create a Report
ReportRouter.post("/", requireLogin, async (req, res) => {
    try {
        const { missionId, droneId, findings,distanceCovered,duration} = req.body;
        
        if (!missionId || !droneId || !findings || !distanceCovered || !duration) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        const newReport = new Report({
            missionId,
            droneId,
            findings,
            distanceCovered,
            duration,
            createdBy: req.user._id
        });

        await newReport.save();
        res.status(201).json({ message: "Report created successfully", report: newReport });

    } catch (error) {
        console.error("Error creating report:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// 2️⃣ Get All Reports
ReportRouter.get("/", requireLogin, async (req, res) => {
    try {
        const { status, facilityId } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (facilityId) filter.facilityId = facilityId;

        const reports = await Report.find(filter).populate("missionId droneId facilityId createdBy", "-password");
        res.json(reports);

    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 3️⃣ Get a Single Report by ID
ReportRouter.get("/:id", requireLogin, async (req, res) => {
    try {
        const report = await Report.findById(req.params.id).populate("missionId droneId facilityId createdBy", "-password");
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }
        res.json(report);

    } catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 4️⃣ Update a Report
ReportRouter.put("/:id", requireLogin, async (req, res) => {
    try {
        const updates = req.body;
        const report = await Report.findByIdAndUpdate(req.params.id, updates, { new: true });

        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        res.json({ message: "Report updated successfully", report });

    } catch (error) {
        console.error("Error updating report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 5️⃣ Delete a Report
ReportRouter.delete("/:id", requireLogin, async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        res.json({ message: "Report deleted successfully" });

    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default ReportRouter;
