import { NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { promises as fsPromises } from "fs";
import { Employees } from "@/app/config/Models/employees";
import { Applicants } from "@/app/config/Models/applicant";
import mongoose from "mongoose";
import { db } from "@/app/config/db";

export async function POST(req, res) {
  try {
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
    const _id = formData.get("id");

    const fileName = file.substring(file.lastIndexOf("/") + 1);
    const destinationDir = path.join(process.cwd(), "public", "/employees/cvs");
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }
    const destinationFile = path.join(destinationDir, fileName);
    const sourceDir = path.join(process.cwd(), "public", file);

    fs.copyFile(sourceDir, destinationFile, (err) => {
      if (err) {
        console.error("Error saving the file:", err);
      } else {
        console.log("File successfully saved to", destinationFile);
      }
    });

    if (fs.existsSync(sourceDir)) {
      try {
        fs.unlinkSync(sourceDir);
        if (fs.existsSync(sourceDir)) {
          console.error(`Failed to delete file at ${sourceDir}`);
          return NextResponse.json({
            status: 500,
            message: "Failed to delete file",
            data: null,
          });
        }
      } catch (err) {
        console.error(`Error deleting file at ${sourceDir}: ${err.message}`);
        return NextResponse.json({
          status: 500,
          message: "Error deleting file",
          data: null,
        });
      }
    }

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
    await fsPromises.writeFile(
      picPath,
      Buffer.from(await picture.arrayBuffer())
    );

    try {
      await fsPromises.access(picPath);
    } catch (error) {
      return NextResponse.json({
        statusCode: 500,
        message: "Your picture is not uploaded properly. Please try again!",
        data: null,
      });
    }

    picture = "/employees/pictures/" + randompicName;
    const cv = "/employees/cvs/" + fileName;
    const employee = await Employees.create({
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

    console.log("created Employee: ", employee);
    const deleteApplicant = await Applicants.findOneAndDelete({ _id: _id });

    if (!employee) {
      return NextResponse.json({
        status: 400,
        message: "Employee data not saved",
        data: null,
      });
    }
    if (!deleteApplicant) {
      return NextResponse.json({
        status: 400,
        message: "Applicant data not deleted",
        data: null,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Employee data added Successfully",
      data: null,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Data not added. Try again later!",
      data: null,
    });
  }
}
