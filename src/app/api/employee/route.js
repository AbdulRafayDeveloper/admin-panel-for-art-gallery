import { NextResponse } from "next/server";
import { db } from "@/app/config/db";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const JWT_SECRET = "SecurityInsure";
import { Employees } from "@/app/config/Models/employees";
import formidable from "formidable";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import verifyTokenAndRole from "@/app/helper/checking";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req, res) {
  try {
    const result = await verifyTokenAndRole(req);

    if (result.status !== 200) {
      return NextResponse.json(result);
    }

    const formData = await req.formData();

    let file = formData.get("file");
    const name = formData.get("name");
    const email = formData.get("email");
    const number = formData.get("number");
    const city = formData.get("city");
    const country = formData.get("country");
    let picture = formData.get("picture");
    const position = formData.get("position");
    const salary = formData.get("salary");
    const date_of_join = formData.get("date");
    const gender = formData.get("gender");
    const job_type = formData.get("job_type");

    const baseName = file.name
      .substring(0, file.name.lastIndexOf("."))
      .replaceAll(" ", "_");
    const extension = file.name.substring(file.name.lastIndexOf("."));
    const randomName = `${uuidv4()}_${baseName}${extension}`;
    const filePath = path.join(
      process.cwd(),
      "public/employees/cvs",
      randomName
    );

    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    const basepicName = picture.name
      .substring(0, picture.name.lastIndexOf("."))
      .replaceAll(" ", "_");
    const extensionpic = picture.name.substring(picture.name.lastIndexOf("."));
    const randompicName = `${uuidv4()}_${basepicName}${extensionpic}`;
    const picPath = path.join(
      process.cwd(),
      "public/employees/pictures",
      randompicName
    );
    await fs.writeFile(picPath, Buffer.from(await picture.arrayBuffer()));

    try {
      await fs.access(filePath);
    } catch (error) {
      return NextResponse.json({
        statusCode: 500,
        message: "Your file is not uploaded properly. Please try again!",
        data: null,
      });
    }

    try {
      await fs.access(picPath);
    } catch (error) {
      return NextResponse.json({
        statusCode: 500,
        message: "Your picture is not uploaded properly. Please try again!",
        data: null,
      });
    }
    const cv = "/employees/cvs/" + randomName;
    picture = "/employees/pictures/" + randompicName;
    const existingEmployee = await Employees.findOne({ email: email });

    if (existingEmployee) {
      return NextResponse.json({
        statusCode: 500,
        message: "Employee data already entered",
        data: null,
      });
    } else {
      const newemployee = await Employees.create({
        name,
        email,
        number,
        country,
        city,
        cv,
        picture,
        position,
        salary,
        date_of_join,
        gender,
        job_type,
      });
      if (newemployee) {
        return NextResponse.json({
          statusCode: 200,
          message: "Your request is submitted successfully.",
          data: newemployee,
        });
      } else {
        return NextResponse.json({
          statusCode: 500,
          message: "Submission failed. Please try again later.",
          data: null,
        });
      }
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
    const employees = await Employees.find({ role: "employee" });

    if (!employees) {
      return NextResponse.json({
        status: 400,
        message: "No data Fetched",
        data: null,
      });
    }
    return NextResponse.json({ status: 200, message: null, data: employees });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
}
