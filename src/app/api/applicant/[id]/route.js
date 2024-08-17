import { Applicants } from "@/app/config/Models/applicant";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { db } from "@/app/config/db";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";

export async function DELETE(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();

    const applicant = await Applicants.findById(id);
    if (!applicant) {
      return NextResponse.json({
        status: 404,
        message: "Applicant not found",
        data: null,
      });
    }

    const filePath = path.join(process.cwd(), "public", applicant.file);

    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        if (fs.existsSync(filePath)) {
          console.error(`Failed to delete file at ${filePath}`);
          return NextResponse.json({
            status: 500,
            message: "Failed to delete file",
            data: null,
          });
        }
      } catch (err) {
        console.error(`Error deleting file at ${filePath}: ${err.message}`);
        return NextResponse.json({
          status: 500,
          message: "Error deleting file",
          data: null,
        });
      }
    }

    const deletedapplicant = await Applicants.findByIdAndDelete(id);
    if (!deletedapplicant) {
      return NextResponse.json({
        status: 400,
        message: "Data not deleted",
        data: null,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Applicant Data Deleted",
      data: deletedapplicant,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Data not deleted. Try again later ",
      data: null,
    });
  }
}

export async function GET(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();
    const applicant = await Applicants.findById(id);
    console.log(applicant);
    if (!applicant) {
      return NextResponse.json({
        status: 404,
        message: "Applicant not found",
        data: null,
      });
    }
    return NextResponse.json({ status: 200, message: null, data: applicant });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Data can not be fetched. Try again later!",
      data: null,
    });
  }
}
