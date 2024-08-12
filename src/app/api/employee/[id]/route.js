import { db } from "@/app/config/db";
import { Employees } from "@/app/config/Models/employees";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function DELETE(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();
    const employee = await Employees.findById(id);

    if (!employee) {
      return NextResponse.json({
        status: 404,
        message: "Project not found",
        data: null,
      });
    }
    const cvPath = path.join(process.cwd(), "public", employee.cv);
    const picPath = path.join(process.cwd(), "public", employee.picture);

    if (fs.existsSync(cvPath) && fs.existsSync(picPath)) {
      try {
        fs.unlinkSync(cvPath);
        fs.unlinkSync(picPath);
        if (fs.existsSync(cvPath) && fs.existsSync(picPath)) {
          console.error(`Failed to delete file at ${cvPath} or ${picPath}`);
          return NextResponse.json({
            status: 500,
            message: "Failed to delete file",
            data: null,
          });
        }
      } catch (err) {
        console.error(`Error deleting file at ${cvPath}: ${err.message}`);
        return NextResponse.json({
          status: 500,
          message: "Error deleting file",
          data: null,
        });
      }
    }
    const data = await Employees.findByIdAndDelete(id);
    if (!data) {
      return NextResponse.json({
        status: 404,
        message: "Deletion not done",
        data: null,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Employee Deleted Successfully",
      data: id,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
}
