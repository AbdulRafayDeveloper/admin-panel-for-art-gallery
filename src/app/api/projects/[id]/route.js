import { NextResponse } from "next/server";
import { Projects } from "@/app/config/Models/project";
import { Customer } from "@/app/config/Models/customer";
import mongoose from "mongoose";
import { db } from "@/app/config/db";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import { v4 as uuidv4 } from "uuid";
import { AssignProject } from "@/app/config/Models/assignProject";

export async function GET(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();
    const data = await Projects.find({ customerid: id });
    return NextResponse.json({ status: 200, message: null, data: data });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error, data: null });
  }
}

export async function DELETE(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();

    const project = await Projects.findById(id);
    if (!project) {
      return NextResponse.json({
        status: 404,
        message: "Project not found",
        data: null,
      });
    }

    const filePath = path.join(process.cwd(), "public", project.file);

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

    const deletedProject = await Projects.findByIdAndDelete(id);
    const deletedassign = await AssignProject.findOneAndDelete({
      assignedProject: deletedProject._id,
    });

    if (!deletedProject) {
      return NextResponse.json({
        status: 404,
        message: "Project not found",
        data: null,
      });
    }

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: deletedProject.customerid },
      { $inc: { projectsQuoted: -1 } },
      { new: true }
    );

    if (updatedCustomer.projectsQuoted === 0) {
      await Customer.findOneAndUpdate(
        { _id: deletedProject.customerid },
        { $set: { status: "closed" } },
        { new: true }
      );
    }

    if (!updatedCustomer) {
      return NextResponse.json({
        status: 404,
        message: "Customer not found",
        data: null,
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Project deleted and customer updated",
      data: id,
    });
  } catch (error) {
    console.error(`Internal Server Error: ${error.message}`);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
}

export async function POST(req, res) {
  try {
    const customerid = new URL(req.url).pathname.split("/").pop();
    if (!mongoose.isValidObjectId(customerid)) {
      return NextResponse.json({
        status: 400,
        message: "Invalid ID",
        data: null,
      });
    }

    const formData = await req.formData();

    let file = formData.get("file");
    const name = formData.get("projname");
    const category = formData.get("cat");
    const timeline = formData.get("timeline");
    const budget = formData.get("budget");
    const status = formData.get("status");
    if (!name || !category || !timeline || !budget) {
      return NextResponse.json({
        statusCode: 400,
        message: "Required fields are missing.",
      });
    }
    const baseName = file.name
      .substring(0, file.name.lastIndexOf("."))
      .replaceAll(" ", "_");
    const extension = file.name.substring(file.name.lastIndexOf("."));
    const randomName = `${uuidv4()}_${baseName}${extension}`;
    const filePath = path.join(
      process.cwd(),
      "public/requirements",
      randomName
    );
    await fsPromises.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    try {
      await fsPromises.access(filePath);
    } catch (error) {
      return NextResponse.json({
        statusCode: 500,
        message: "Your file is not uploaded properly. Please try again!",
      });
    }
    file = "/requirements/" + randomName;

    const projectData = await Projects.create({
      customerid,
      name,
      category,
      timeline,
      budget,
      file,
      status: status,
      description: "",
    });

    const customer = await Customer.findOneAndUpdate(
      { _id: customerid },
      { $inc: { projectsQuoted: 1 } },
      { new: true }
    );
    return NextResponse.json({
      status: 200,
      message: "Project added successfully",
      data: projectData,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Project not added",
      data: error,
    });
  }
}
