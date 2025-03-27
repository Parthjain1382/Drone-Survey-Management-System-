import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    mission: { type: mongoose.Schema.Types.ObjectId, ref: "Mission", required: true },
    duration: { type: Number, required: true }, // Flight duration in minutes
    distanceCovered: { type: Number, required: true }, // Distance in meters
    anomaliesDetected: [{ type: String }], // List of detected anomalies
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);
