import { Applicants } from "@/app/config/Models/applicant";
import { NextResponse } from "next/server";
import { db } from "@/app/config/db";
import mongoose from "mongoose";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req, res) {
  try {
    const formData = await req.formData();

    const file2 = formData.get("file");
    const name = formData.get("name");
    const email = formData.get("email");
    const number = formData.get("number");
    const city = formData.get("city");
    const country = formData.get("country");
    const jobTitle = formData.get("jobTitle");
    const gender = formData.get("gender");
    if (!name || !email || !city || !number || !gender) {
      return NextResponse.json({
        statusCode: 400,
        message: "Required fields are missing.",
        data: null,
      });
    }
    const filename = file2.name;
    const baseName = filename
      .substring(0, filename.lastIndexOf("."))
      .replaceAll(" ", "_");
    const extension = filename.substring(filename.lastIndexOf("."));
    const randomName = `${uuidv4()}_${baseName}${extension}`;
    const filePath = path.join(process.cwd(), "public/cv", randomName);
    await fs.writeFile(filePath, Buffer.from(await file2.arrayBuffer()));

    try {
      await fs.access(filePath);
    } catch (error) {
      return NextResponse.json({
        statusCode: 500,
        message: "Your file is not uploaded properly. Please try again!",
        data: null,
      });
    }
    const file = "/cv/" + randomName;
    const newapplicant = new Applicants({
      name,
      email,
      number,
      city,
      country,
      file,
      jobTitle,
      gender,
    });

    const data = await newapplicant.save();

    if (data) {
      return NextResponse.json({
        statusCode: 200,
        message: "Your request is submitted successfully.",
        data: data,
      });
    } else {
      return NextResponse.json({
        statusCode: 500,
        message: "Submission failed. Please try again later.",
        data: null,
      });
    }
  } catch (error) {
    return NextResponse.json({
      statusCode: 500,
      message: "Submission failed. Please try again later.",
      data: error.message,
    });
  }
}

export async function GET(req, res) {
  try {
    const applicant = await Applicants.find();
    if (!applicant) {
      return NextResponse.json({
        status: 400,
        message: "Data not fetched",
        data: null,
      });
    }
    return NextResponse.json({ status: 200, message: null, data: applicant });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Data not Fetched try again later!",
      data: error,
    });
  }
}
