import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/app/config/db";
import mongoose from "mongoose";
import { Admin } from "@/app/config/Models/admin";
import { Employees } from "@/app/config/Models/employees";
import formidable from "formidable";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
const JWT_SECRET = "SecurityInsure";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const { name, password } = await req.json();

    if (!name || !password) {
      return NextResponse.json({
        statusCode: 400,
        message: "Username and password are required",
        data: null,
      });
    }
    const admin = await Employees.findOne({ name });
    if (admin) {
      if (admin.password) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          if (admin.role === "admin") {
            const token = jwt.sign(
              { id: admin._id, username: admin.username, role: admin.role },
              JWT_SECRET,
              { expiresIn: "1h" }
            );
            return NextResponse.json({
              statusCode: 200,
              message: "Login successful",
              token: token,
              data: admin,
            });
          } else {
            return NextResponse.json({
              statusCode: 403,
              message: "Access denied: Admin role required",
              data: null,
            });
          }
        }
      }
      return NextResponse.json({
        statusCode: 403,
        message: "Access denied: Admin role required",
        data: null,
      });
    }
    return NextResponse.json({
      statusCode: 401,
      message: "Invalid username or password",
      data: null,
    });
  } catch (error) {
    return NextResponse.json({
      statusCode: 500,
      message: "Internal server error",
      data: error,
    });
  }
}

/*export async function POST(req, res) {
	try {
		console.log("Post 1");

		const formData = await req.formData();

		let file = formData.get("file");
		const name = formData.get("name");
		const email = formData.get("email");
		let picture = formData.get("picture");
		const position = formData.get("position");
		const salary = formData.get("salary");
		const date_of_join = formData.get("date");
		const gender = formData.get("gender");
		const job_type = formData.get("job_type");
		const status = formData.get('status');
		const role = formData.get('role');
		const hashpassword = formData.get('password')

		
		const saltRounds = 10;
    	const password = await bcrypt.hash(hashpassword, saltRounds);

		const filename = file.name;
		const baseName = filename.substring(0, filename.lastIndexOf(".")).replaceAll(" ", "_");
		const extension = filename.substring(filename.lastIndexOf("."));
		const randomName = `${uuidv4()}_${baseName}${extension}`;
		const filePath = path.join(process.cwd(), "public/employees/cvs", randomName);
		console.log(randomName);

		// Run file writes and database update in parallel
		await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

		const picname = picture.name;
		const basepicName = picname.substring(0, picname.lastIndexOf(".")).replaceAll(" ", "_");
		const extensionpic = picname.substring(picname.lastIndexOf("."));
		const randompicName = `${uuidv4()}_${basepicName}${extensionpic}`;
		const picPath = path.join(process.cwd(), "public/employees/pictures", randompicName);
		console.log(randompicName);

		// Run file writes and database update in parallel
		await fs.writeFile(picPath, Buffer.from(await file.arrayBuffer()));

		try {
			await fs.access(filePath);
			console.log("File successfully saved:", filePath);
		} catch (error) {
			console.error("File not found after writing:", filePath);
			return NextResponse.json({ statusCode: 500, message: 'Your file is not uploaded properly. Please try again!' });
		}

		try {
			await fs.access(picPath);
			console.log("File successfully saved:", picPath);
		} catch (error) {
			console.error("File not found after writing:", picPath);
			return NextResponse.json({ statusCode: 500, message: 'Your picture is not uploaded properly. Please try again!' });
		}

		console.log("Post 2");

		console.log("file is: ", randomName);
		const cv = "/employees/cvs/" + randomName;
		picture = "/employees/pictures/" + randompicName;

		console.log("Post 3");

		const newemployee = await Employees.create({
			name,
			email,
			cv,
			picture,
			position,
			salary,
			date_of_join,
			gender,
			job_type,
			status,
			role,
			password
		  });

		console.log("Post 4");

		if(newemployee){
			return NextResponse.json({ statusCode: 200, message: 'Your request is submitted successfully.', data: newemployee });
		}
		else{
			return NextResponse.json({ statusCode: 500, message: 'Submission failed. Please try again later.'});
		}
	} catch (error) {
		console.error("Error in POST handler:", error);
		return NextResponse.json({ statusCode: 500, message: 'Submission failed. Please try again later.', data: error.message });
	}
}

*/
