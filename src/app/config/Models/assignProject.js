import mongoose from "mongoose";

const assignprojectModel = new mongoose.Schema(
  {
    name: String,
    timeline: String,
    budget: String,
    assignedProject: { type: mongoose.Schema.Types.ObjectId },
    assignedEmp: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "On Hold", "Completed", "Cancelled"],
      default: "Not Started",
      required: true,
    },
  },
  { timestamps: true }
);

export const AssignProject =
  mongoose.models.assigned_projects ||
  mongoose.model("assigned_projects", assignprojectModel);
