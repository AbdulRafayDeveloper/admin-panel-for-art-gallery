import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Projects } from "@/app/config/Models/project";

export async function POST(req) {
  try {
    let filename = await req.json();
    const filePath = path.join(process.cwd(), "public", filename.filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({
        status: 404,
        message: "File not found",
        data: null,
      });
    }

    const fileContent = fs.readFileSync(filePath);

    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${filename.filename}`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while downloading the file" },
      { status: 500 }
    );
  }
}
