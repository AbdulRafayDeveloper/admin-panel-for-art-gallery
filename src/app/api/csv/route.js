import { parse } from "json2csv";
import mongoose from "mongoose";
import { db } from "@/app/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const jsonData = await req.json();

    const formattedData = jsonData.map((item) => {
      return {
        ...item,
        number: `"${item.number}"`,
      };
    });
    const csv = parse(formattedData);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="data.csv"',
      },
    });
  } catch (error) {
    return new NextResponse({
      message: "Failed to generate CSV",
      status: 500,
      data: null,
    });
  }
}
