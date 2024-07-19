import { Contact } from "@/app/config/Models/contact"
import { NextResponse } from "next/server"
import { db } from "@/app/config/db"
import mongoose from "mongoose"

export async function POST(req, res)
{
	try{

		console.log("Post 1");

		const formData = await req.formData();
		const name = formData.get("name");
		const email = formData.get("email");
		const number = formData.get("number");
		const city = formData.get("city");
		const description = formData.get("description");

		const requiredFields = { name, email, city, description };
		for (const [key, value] of Object.entries(requiredFields)) {
			if (!value) {
				return NextResponse.json({ error: `${key} is required.` }, { status: 400 });
			}
		}

		const newContact = new Contact({
			name,
			email,
			number,
			city,
			description
		  });
	  
		await newContact.save();
		return NextResponse.json("done")

	}catch(error)
	{
		return NextResponse.json(error)
	}
}

