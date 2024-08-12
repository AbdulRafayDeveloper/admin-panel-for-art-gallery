import { Contact } from "@/app/config/Models/contact";
import { NextResponse } from "next/server";
import { db } from "@/app/config/db";
import mongoose from "mongoose";
import { Customer } from "@/app/config/Models/customer";
import { customer } from "@/app/api/storedProcedure/customer";
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
    const formData = await req.formData();

    let file = formData.get("file");
    const name = formData.get("name");
    const email = formData.get("email");
    const number = formData.get("number");
    const city = formData.get("city");
    const projname = formData.get("projname");
    const cat = formData.get("cat");
    const timeline = formData.get("timeline");
    const budget = formData.get("budget");
    const description = formData.get("description");
    const country = formData.get("country");
    const status = formData.get("status");

    if (!name || !email || !city || !projname || !cat || !timeline || !budget) {
      return NextResponse.json({
        statusCode: 400,
        message: "Required fields are missing.",
        data: null,
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
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    try {
      await fs.access(filePath);
    } catch (error) {
      return NextResponse.json({
        statusCode: 500,
        message: "Your file is not uploaded properly. Please try again!",
        data: null,
      });
    }
    file = "/requirements/" + randomName;
    const role = "customer";

    const proc = {
      name,
      email,
      number,
      city,
      projname,
      cat,
      timeline,
      budget,
      file,
      description,
      country,
      status,
      role,
    };
    const data = await customer(proc);

    if (data) {
      return NextResponse.json({
        statusCode: 200,
        message: "Your request is submitted successfully.",
        data: proc,
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
    const result = await verifyTokenAndRole(req);

    if (result.status !== 200) {
      return NextResponse.json(result);
    }

    const customers = await Customer.find();
    const contactIds = customers.map((customers) => customers.contact_id);
    const contact = await Contact.find({ _id: { $in: contactIds } });
    const contactMap = new Map(
      contact.map((contact) => [contact._id.toString(), contact])
    );

    const customersWithContacts = customers.map((customer) => ({
      ...customer.toObject(),
      contact: contactMap.get(customer.contact_id.toString()) || null,
    }));

    return NextResponse.json({
      status: 200,
      data: customersWithContacts,
      message: null,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, data: error, message: null });
  }
}
