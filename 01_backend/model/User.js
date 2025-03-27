import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String, // Hashed
  role: { type: String, enum: ["FacilityManager"], default: "FacilityManager", required: true }, //in future we will add more roles like DroneOperator, SecurityOfficer
  assignedMissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mission" }], // Only for Drone Operators
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);

