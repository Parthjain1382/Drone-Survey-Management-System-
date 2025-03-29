import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    flightPath: { type: String, required: true,enum: ["Crosshatch", "Perimeter"] },  //Crosshatch, Perimeter 
    location: [{ lat: Number, lng: Number }], // Waypoints for the mission
    altitude: { type: Number, required: true }, // Altitude in meters
    frequency: { type: String, required: true }, // Data collection frequency
    status: { 
        type: String, 
        enum: ["Scheduled", "In Progress", "Completed", "Aborted"], 
        default: "Scheduled" 
    },
    estimatedTime: { type: Number, required: true },
    droneId: { type: mongoose.Schema.Types.ObjectId, ref: "Drone" },
    scheduledTime: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });



export default mongoose.model("Mission", missionSchema);
