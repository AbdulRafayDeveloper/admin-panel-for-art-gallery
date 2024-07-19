import { Contact } from "@/app/config/Models/contact"
import { NextResponse } from "next/server"
import { db } from "@/app/config/db"
import mongoose from "mongoose"
import { Customer } from "@/app/config/Models/customer"
import {customer} from '@/app/api/storedProcedure/customer'
import formidable from 'formidable';
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

export const config = {
	api: {
	  bodyParser: false,
	},
  };

/*export async function GET(req)
{
	try{
		console.log("enter 1")
		const data = await Contact.find()
		const data2 = await Customer.find()
		console.log("enter 2")
		console.log(data)
		console.log(data2)
		console.log("enter 3")
		return NextResponse.json(data)
	}catch(error)
	{
		return NextResponse.json(error)
	}
}*/

export async function POST(req, res) {
	try {
		console.log("Post 1");

		const formData = await req.formData();

		const file = formData.get("file");
		const name = formData.get("name");
		const email = formData.get("email");
		const number = formData.get("number");
		const city = formData.get("city");
		const projname = formData.get("projname");
		const cat = formData.get("cat");
		const timeline = formData.get("timeline");
		const budget = formData.get("budget");
		const message = formData.get("description");

		const filename = file.name;
		const baseName = filename.substring(0, filename.lastIndexOf(".")).replaceAll(" ", "_");
		const extension = filename.substring(filename.lastIndexOf("."));
		const randomName = `${uuidv4()}_${baseName}${extension}`;
		console.log(randomName);

		const requiredFields = { name, email, city, projname, cat, timeline, budget };
		for (const [key, value] of Object.entries(requiredFields)) {
		if (!value) {
			return NextResponse.json({ error: `${key} is required.` }, { status: 400 });
		}
		}

		// Run file writes and database update in parallel
		await Promise.all([
			fs.writeFile(path.join(process.cwd(), "public/requirements", randomName), Buffer.from(await file.arrayBuffer()))
		]);

		try {
			await fs.access(filePath);
			console.log("File successfully saved:", filePath);
		} catch (error) {
			console.error("File not found after writing:", filePath);
			return NextResponse.json({ error: 'File could not be verified after writing' }, { status: 500 });
		}

		console.log("Post 2");

		console.log("file is: ", randomName);
		const file2 = "/requirements/" + randomName;

		console.log("Post 3");

		const proc = {
			name: name,
			email: email,
			number: number,
			city: city,
			projname: projname,
			cat: cat,
			timeline: timeline,
			budget: budget,
			file: file2,
			description: message
		};

		console.log("Post 4");

		console.log("Post data: ", proc);
		customer(proc);
		return NextResponse.json("done");
	} catch (error) {
		return NextResponse.json(error);
	}
}