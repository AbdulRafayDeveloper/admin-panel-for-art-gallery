import { JobPost } from "@/app/config/Models/jobs";
import mongoose from "mongoose";
import { db } from "@/app/config/db";
import { NextResponse } from "next/server";

export async function DELETE(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();
    const data = await JobPost.findByIdAndDelete(id);
    if (!data) {
      return NextResponse.json({
        status: 400,
        message: "No row affected. Try again later.",
        data: null,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Record deleted successfully",
      data: null,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Data not deleted. Try again later!",
      data: null,
    });
  }
}

export async function GET(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();
    const data = await JobPost.findById(id);
    if (!data) {
      return NextResponse.json({
        status: 400,
        message: "No data fetched",
        data: null,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Data fetched successfully",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Data not fetched. Try again later!",
      data: null,
    });
  }
}

export async function PUT(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();
    const { location, content } = await req.json();
    if (!location || !content) {
      return NextResponse.json({
        statusCode: 400,
        message: "Required fields are missing.",
        data: null,
      });
    }
    const data = await JobPost.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          location: location,
          content: content,
        },
      },
      { new: true, runValidators: true }
    );
    if (!data) {
      return NextResponse.json({
        status: 400,
        message: "Data not updated",
        data: null,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Data Updated successfully",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Data not updated",
      data: id,
    });
  }
}
