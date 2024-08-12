import { Contact } from "@/app/config/Models/contact";
import { NextResponse } from "next/server";
import { db } from "@/app/config/db";
import mongoose from "mongoose";
import { Messages } from "@/app/config/Models/messages";

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const number = formData.get("number");
    const city = formData.get("city");
    const description = formData.get("description");
    const country = formData.get("country");

    if (!name || !email || !city || !description || !number) {
      return NextResponse.json({
        statusCode: 400,
        message: "Required fields are missing.",
        data: null,
      });
    }

    let data;
    const existingContact = await Contact.findOne({ email: email });

    if (existingContact) {
      data = await Contact.findByIdAndUpdate(
        existingContact._id,
        { $inc: { times: 1 } },
        { new: true }
      );
      const message = new Messages({
        contact_id: existingContact._id,
        description,
      });
      await message.save();
    } else {
      const role = "customer";
      const newContact = new Contact({
        name,
        email,
        number,
        city,
        country,
        role,
      });

      const message = new Messages({
        contact_id: newContact._id,
        description,
      });

      data = await newContact.save();
      await message.save();
    }

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
