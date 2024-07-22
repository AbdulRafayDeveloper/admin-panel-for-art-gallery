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

		if (!name || !email || !city || !description || !number) {
			return NextResponse.json({ statusCode: 400, message: "Required fields are missing." });
		}

		const newContact = new Contact({
			name,
			email,
			number,
			city,
			description
		  });
	  
		const data = await newContact.save();
		
		if(data)
		{
			return NextResponse.json({ statusCode: 200, message: 'Your request is submitted successfully.', data: data });
		}
		else{
			return NextResponse.json({ statusCode: 500, message: 'Submission failed. Please try again later.'});
		}
	}
	catch(error)
	{
		return NextResponse.json({ statusCode: 500, message: 'Submission failed. Please try again later.', data: error.message });
	}
}

