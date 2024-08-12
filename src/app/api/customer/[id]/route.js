import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Customer } from "@/app/config/Models/customer";
import { Contact } from "@/app/config/Models/contact";
import { Projects } from "@/app/config/Models/project";
import fs from "fs";
import path from "path";

export async function DELETE(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({
        status: 400,
        error: "Invalid ID",
        data: null,
      });
    }
    const contact = await Contact.findById(id);
    if (contact.times == 0) {
      await Contact.findByIdAndDelete(id);
    }
    if (!contact) {
      return NextResponse.json({ status: 400, message: "Customer not found" });
    }
    const customer = await Customer.findOneAndDelete({ contact_id: id });
    if (customer) {
      const projects = await Projects.find({ customerid: customer._id });
      for (const project of projects) {
        if (project.file) {
          const filePath = path.join(process.cwd(), "public", project.file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }
      await Projects.deleteMany({ customerid: customer._id });
    } else {
      return NextResponse.json({ status: 400, message: "Customer not found" });
    }
    return NextResponse.json({
      status: 200,
      message: "Successfully deleted",
      data: contact,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Not Deleted",
      data: null,
    });
  }
}
