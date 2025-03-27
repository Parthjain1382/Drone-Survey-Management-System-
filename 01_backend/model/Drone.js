import mongoose from "mongoose";

const droneSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["Available", "InMission", "Maintenance"], 
        default: "Available" 
    },
    batteryLevel: { type: Number, required: true, default: 100 }, // Battery percentage
    lastMission: { type: mongoose.Schema.Types.ObjectId, ref: "Mission" },
}, { timestamps: true });

export default mongoose.model("Drone", droneSchema);