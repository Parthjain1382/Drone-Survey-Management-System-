import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    flightPath: [{ lat: Number, lng: Number }], // Waypoints for the mission
    altitude: { type: Number, required: true }, // Altitude in meters
    frequency: { type: Number, required: true }, // Data collection frequency
    sensors: [{ type: String }], // List of sensors used
    status: { 
        type: String, 
        enum: ["Scheduled", "In Progress", "Completed", "Aborted"], 
        default: "Scheduled" 
    },
    scheduledTime: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Mission", missionSchema);
