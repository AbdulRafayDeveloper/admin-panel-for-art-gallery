import { JobPost } from "@/app/config/Models/jobs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { db } from "@/app/config/db";

export async function POST(req, res) {
  try {
    const { title, location, easyApplyLink, content } = await req.json();

    if (!title || !location || !easyApplyLink || !content) {
      return NextResponse.json({
        statusCode: 400,
        message: "Required fields are missing.",
        data: null,
      });
    }

    const highestJobPost = await JobPost.findOne({}, { id: 1 })
      .sort({ id: -1 })
      .exec();
    const id = highestJobPost ? highestJobPost.id : 0;

    const data = await JobPost.create({
      id: id + 1,
      title: title,
      location: location,
      content: content,
      easyApplyLink: easyApplyLink,
    });

    if (!data) {
      return NextResponse.json({
        status: 400,
        message: "No row affected. Try again later.",
        data: title,
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Data posted successfully",
      data: title,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Data not posted try again later",
      data: error,
    });
  }
}

export async function GET(req, res) {
  try {
    const data = await JobPost.find();
    if (!data) {
      return NextResponse.json({
        status: 400,
        message: "No data found",
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
