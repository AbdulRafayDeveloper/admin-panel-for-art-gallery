import { NextResponse } from "next/server";
import { db } from "@/app/config/db";
import mongoose from "mongoose";
import { Messages } from "@/app/config/Models/messages";
import { Customer } from "@/app/config/Models/customer";
import { Contact } from "@/app/config/Models/contact";

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

    const message = await Messages.findById(id);
    if (!message) {
      return NextResponse.json({
        status: 404,
        error: "Message not found",
        data: null,
      });
    }

    const contactId = message.contact_id;

    const contactInfo = await Contact.findOneAndUpdate(
      { _id: contactId },
      { $inc: { times: -1 } },
      { new: true }
    );

    if (!contactInfo) {
      return NextResponse.json({
        status: 404,
        message: "Contact not found",
        data: null,
      });
    }

    const customer = await Customer.findOne({ contact_id: contactId });
    await Messages.findByIdAndDelete(id);

    if (customer) {
      return NextResponse.json({
        status: 200,
        message: "Message deleted",
        data: null,
      });
    } else {
      if (contactInfo.times === 0) {
        await Contact.findByIdAndDelete(contactId);
      }
      return NextResponse.json({
        status: 200,
        message: "Message and contact deleted",
        data: null,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
      data: null,
    });
  }
}
