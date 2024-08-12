import { Contact } from "@/app/config/Models/contact";
import { NextResponse } from "next/server";
import { db } from "@/app/config/db";
import mongoose from "mongoose";
import { Customer } from "@/app/config/Models/customer";
import { customer } from "@/app/api/storedProcedure/customer";
import { Messages } from "@/app/config/Models/messages";

export async function GET(req, res) {
  try {
    const messages = await Messages.find();
    const contactIds = messages.map((message) => message.contact_id);
    const contacts = await Contact.find({ _id: { $in: contactIds } });

    const contactMap = new Map(
      contacts.map((contact) => [contact._id.toString(), contact])
    );

    const messagesByContact = messages.reduce((acc, message) => {
      const contactId = message.contact_id.toString();
      if (!acc[contactId]) {
        acc[contactId] = {
          contact: contactMap.get(contactId) || null,
          messages: [],
        };
      }

      acc[contactId].messages.push({
        id: message._id,
        ...message.toObject(),
      });
      return acc;
    }, {});
    const contactWithMessages = Object.values(messagesByContact);

    return NextResponse.json({
      status: 200,
      data: contactWithMessages,
      message: null,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error, data: null });
  }
}
