import { NextResponse } from "next/server";
import { db } from "@/app/config/db";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const JWT_SECRET = "SecurityInsure";
import { Employees } from "@/app/config/Models/employees";
import formidable from "formidable";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { promises as fsPromises } from "fs";
import verifyTokenAndRole from "@/app/helper/checking";

export async function DELETE(req, res) {
  try {
    const result = await verifyTokenAndRole(req);

    if (result.status !== 200) {
      return NextResponse.json(result);
    }
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

export async function GET(req, res) {
  try {
    const result = await verifyTokenAndRole(req);

    if (result.status !== 200) {
      return NextResponse.json(result);
    }

    const id = new URL(req.url).pathname.split("/").pop();
    let employees = await Employees.findById(id);
    if (!employees) {
      return NextResponse.json({
        status: 400,
        message: "No data Fetched",
        data: null,
      });
    }
    employees = {
      ...employees.toObject(),
      number: String(employees.number),
    };
    console.log(employees);
    return NextResponse.json({ status: 200, message: null, data: employees });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
}

export async function PUT(req, res) {
  try {
    const result = await verifyTokenAndRole(req);

    if (result.status !== 200) {
      return NextResponse.json(result);
    }
    const id = new URL(req.url).pathname.split("/").pop();
    const formData = await req.formData();
    const number = formData.get("number");
    const city = formData.get("city");
    const country = formData.get("country");
    let picture = formData.get("picture");
    const position = formData.get("position");
    const salary = formData.get("salary");
    const job_type = formData.get("job_type");

    const employee = await Employees.findById(id);
    if (typeof picture != "string") {
      const picPath = path.join(process.cwd(), "public", employee.picture);
      console.log(picPath);
      if (fs.existsSync(picPath)) {
        try {
          fs.unlinkSync(picPath);
          if (fs.existsSync(picPath)) {
            return NextResponse.json({
              status: 500,
              message: "Failed to delete file",
              data: null,
            });
          }
        } catch (err) {
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
      const extensionpic = picture.name.substring(
        picture.name.lastIndexOf(".")
      );
      const randompicName = `${uuidv4()}_${basepicName}${extensionpic}`;
      const newpicPath = path.join(
        process.cwd(),
        "public/employees/pictures",
        randompicName
      );
      await fsPromises.writeFile(
        newpicPath,
        Buffer.from(await picture.arrayBuffer())
      );

      try {
        await fsPromises.access(newpicPath);
      } catch (error) {
        return NextResponse.json({
          status: 500,
          message: "Your picture is not uploaded properly. Please try again!",
          data: null,
        });
      }
      const updatedEmployee = await Employees.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            number: number,
            city: city,
            country: country || employee.country,
            position: position,
            salary: salary,
            job_type: job_type,
            picture: `/employees/pictures/${randompicName}`,
          },
        },
        { new: true, runValidators: true }
      );
      return NextResponse.json({
        status: 200,
        message: "Updated Successfully",
        data: updatedEmployee,
      });
    }

    const updatedEmployee = await Employees.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          number: number,
          city: city,
          country: country || employee.country,
          position: position,
          salary: salary,
          job_type: job_type,
        },
      },
      { new: true, runValidators: true }
    );
    return NextResponse.json({
      status: 200,
      message: "Updated Successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
}
