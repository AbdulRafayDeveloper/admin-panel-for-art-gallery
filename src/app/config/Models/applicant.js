import mongoose from "mongoose";

const applicantModel = new mongoose.Schema(
  {
    name: String,
    email: String,
    number: Number,
    gender: String,
    city: String,
    country: String,
    file: String,
    jobTitle: String,
  },
  { timestamps: true }
);

export const Applicants =
  mongoose.models.applicants || mongoose.model("applicants", applicantModel);
