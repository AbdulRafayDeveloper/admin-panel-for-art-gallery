import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Projects } from "@/app/config/Models/project";
import { Employees } from "@/app/config/Models/employees";
import { AssignProject } from "@/app/config/Models/assignProject";
import { Customer } from "@/app/config/Models/customer";
import path from "path";
import fs from "fs";

export async function POST(req, res) {
  try {
    const data = await req.json();
    const project = await Projects.findById(data.project_id);
    const assigned = await AssignProject.find({ assignedProject: project._id });

    if (assigned.length != 0) {
      const updatedproject = await AssignProject.findOneAndUpdate(
        { assignedProject: project._id },
        {
          $set: {
            assignedEmp: data.selected_emp,
          },
        },
        { new: true, runValidators: true }
      );

      const project2 = await Projects.findOneAndUpdate(
        { _id: project._id },
        { $set: { status: "Not Started" } },
        { new: true, runValidators: true }
      );

      return NextResponse.json({
        status: 200,
        message: "Project assigned",
        data: updatedproject,
      });
    } else {
      const assign = await AssignProject.create({
        name: project.name,
        timeline: project.timeline,
        budget: project.budget,
        assignedProject: project._id,
        assignedEmp: data.selected_emp,
      });

      const project2 = await Projects.findOneAndUpdate(
        { _id: project._id },
        { $set: { status: "Not Started" } },
        { new: true, runValidators: true }
      );

      if (!assign) {
        return NextResponse.json({
          status: 500,
          message: "Project not assigned",
          data: null,
        });
      }

      return NextResponse.json({
        status: 200,
        message: "Project assigned",
        data: assign,
      });
    }
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
    const projects = await AssignProject.find();

    if (!projects) {
      return NextResponse.json({
        status: 400,
        message: "No data Fetched",
        data: null,
      });
    }

    const employeeIds = projects.flatMap((project) => project.assignedEmp);
    const employees = await Employees.find({ _id: { $in: employeeIds } });

    const employeeMap = employees.reduce((acc, employee) => {
      acc[employee._id.toString()] = employee;
      return acc;
    }, {});

    const projectsWithEmployees = projects.map((project) => ({
      ...project.toObject(),
      assignedEmp: project.assignedEmp.map((empId) => ({
        ...employeeMap[empId.toString()],
        id: empId, // Ensure the ID is included
      })),
    }));

    return NextResponse.json({
      status: 200,
      message: null,
      data: projectsWithEmployees,
    });
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
    const data = await req.json();
    const assign = await AssignProject.findById(data.assign);
    const assignEmpIds = Array.isArray(assign.assignedEmp)
      ? assign.assignedEmp.map((id) => String(id))
      : [];
    const dataEmpIds = Array.isArray(data.employees)
      ? data.employees.map((id) => String(id))
      : [];
    const areArraysEqual =
      assignEmpIds.length === dataEmpIds.length &&
      assignEmpIds.every((id) => dataEmpIds.includes(id));
    if (!areArraysEqual) {
      await AssignProject.findOneAndUpdate(
        { _id: data.assign },
        { $set: { assignedEmp: data.employees } },
        { new: true, runValidators: true }
      );
    }
    if (assign.status !== data.status) {
      await AssignProject.findOneAndUpdate(
        { _id: data.assign },
        { $set: { status: data.status } },
        { new: true, runValidators: true }
      );
      if (data.status === "In Progress" || data.status === "On Hold") {
        await Projects.findOneAndUpdate(
          { _id: assign.assignedProject },
          { $set: { status: data.status } },
          { new: true, runValidators: true }
        );
      } else if (data.status === "Completed") {
        const assignproj = await AssignProject.findByIdAndDelete(data.assign);

        const updatedProject = await Projects.findOneAndUpdate(
          { _id: assignproj.assignedProject },
          { $set: { status: data.status } },
          { new: true, runValidators: true }
        );
        const projects = await Projects.find({
          customerid: updatedProject.customerid,
        });
        const allProjectsCompleted = projects.every(
          (project) => project.status === "Completed"
        );
        if (allProjectsCompleted) {
          await Customer.findByIdAndUpdate(
            { _id: updatedProject.customerid },
            { $set: { status: "inactive" } },
            { new: true, runValidators: true }
          );
        }
      } else if (data.status === "Cancelled") {
        const assignproj = await AssignProject.findByIdAndDelete(data.assign);
        const project = await Projects.findById(assignproj.assignedProject);
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
        const deletedProject = await Projects.findByIdAndDelete(
          assignproj.assignedProject
        );
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
      }
    }
    return NextResponse.json({
      status: 200,
      message: "Updated Successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
