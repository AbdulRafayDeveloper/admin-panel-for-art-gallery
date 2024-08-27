import mongoose from "mongoose";

const jobModel = new mongoose.Schema(
  {
    id: { type: Number, default: 0, require: true, unique: true },
    title: { type: String, require: true, unique: true },
    location: { type: String, require: true },
    content: { type: String, require: true },
    easyApplyLink: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

export const JobPost =
  mongoose.models.job_posts || mongoose.model("job_posts", jobModel);
