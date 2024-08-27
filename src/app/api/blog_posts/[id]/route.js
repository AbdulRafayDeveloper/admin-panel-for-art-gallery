import { BlogPost } from "@/app/config/Models/blog_posts";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { db } from "@/app/config/db";
import path from "path";
import fs from "fs";

export async function GET(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();
    const data = await BlogPost.findById(id);

    if (!data) {
      return NextResponse.json({
        status: 400,
        message: "Data not found",
        data: null,
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Data fetched sccessfully",
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

export async function DELETE(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();
    const data = await BlogPost.findByIdAndDelete(id);

    if (!data) {
      return NextResponse.json({
        status: 400,
        message: "No row affected",
        data: null,
      });
    }
    const SourcePath = path.join(process.cwd(), "public", data.blogImage.src);
    const MainImage = path.join(process.cwd(), "public", data.mainImage);
    const VideoPath = path.join(process.cwd(), "public", data.video);

    if (
      fs.existsSync(SourcePath) &&
      fs.existsSync(MainImage) &&
      fs.existsSync(VideoPath)
    ) {
      try {
        fs.unlinkSync(SourcePath);
        fs.unlinkSync(MainImage);
        fs.unlinkSync(VideoPath);
        if (
          fs.existsSync(SourcePath) ||
          fs.existsSync(MainImage) ||
          fs.existsSync(VideoPath)
        ) {
          console.error(`Failed to delete file.`);
          return NextResponse.json({
            status: 500,
            message: "Failed to delete file",
            data: null,
          });
        }
      } catch (err) {
        console.error(`Error deleting file`);
        return NextResponse.json({
          status: 500,
          message: "Error deleting file",
          data: null,
        });
      }
    }
    return NextResponse.json({
      status: 200,
      message: "Data deleted successfully",
      data: null,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Data not deleted. Try again",
      data: null,
    });
  }
}

export async function PUT(req, res) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();
    const formData = await req.formData();
    const mainTitle = formData.get("mainTitle");
    const title = formData.get("title");
    const header = formData.get("header");
    const subheading = formData.get("subheading");
    const date = formData.get("date");
    const readTime = formData.get("readTime");
    const blogDetails = formData.get("blogDetails");

    if (
      !mainTitle ||
      !title ||
      !header ||
      !subheading ||
      !date ||
      !readTime ||
      !blogDetails
    ) {
      return NextResponse.json({
        status: 400,
        message: "Missing required fields",
        data: null,
      });
    }
    const updatedData = await BlogPost.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          mainTitle,
          title,
          header,
          subheading,
          date,
          readTime,
          blogDetails,
        },
      },
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      return NextResponse.json({
        status: 400,
        message: "No row affected",
        data: null,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Data updated successfully",
      data: null,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Data not updated.Try again!",
      data: null,
    });
  }
}
