import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    number: { type: Number, required: true },
    cv: String,
    country: String,
    city: String,
    picture: String,
    position: String,
    salary: Number,
    date_of_join: String,
    gender: String,
    job_type: String,
    status: { type: String, default: "active" },
    role: { type: String, default: "employee" },
    password: String,
  },
  { timestamps: true }
);

export const Employees =
  mongoose.models.employees || mongoose.model("employees", employeeSchema);
