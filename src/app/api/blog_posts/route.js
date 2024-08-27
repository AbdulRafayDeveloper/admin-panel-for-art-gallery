import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import { db } from "@/app/config/db";
import { BlogPost } from "@/app/config/Models/blog_posts";

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    let mainImage = formData.get("mainImage");
    const mainTitle = formData.get("mainTitle");
    const title = formData.get("title");
    const header = formData.get("header");
    const subheading = formData.get("subheading");
    const date = formData.get("date");
    const readTime = formData.get("readTime");
    let video = formData.get("video");
    let source = formData.get("source");
    const alt = formData.get("alt");
    const caption = formData.get("caption");
    const blogDetails = formData.get("blogDetails");

    if (
      !mainImage ||
      !mainTitle ||
      !title ||
      !header ||
      !subheading ||
      !date ||
      !readTime ||
      !video ||
      !source ||
      !alt ||
      !caption ||
      !blogDetails
    ) {
      return NextResponse.json({
        status: 400,
        message: "Missing required fields",
        data: null,
      });
    }
    const baseName = mainImage.name
      .substring(0, mainImage.name.lastIndexOf("."))
      .replaceAll(" ", "_");
    const extension = mainImage.name.substring(mainImage.name.lastIndexOf("."));
    const randomName = `${uuidv4()}_${baseName}${extension}`;
    const filePath = path.join(
      process.cwd(),
      "public/blog_posts/images",
      randomName
    );
    await fs.writeFile(filePath, Buffer.from(await mainImage.arrayBuffer()));
    try {
      await fs.access(filePath);
    } catch (error) {
      return NextResponse.json({
        statusCode: 500,
        message: "Main image is not uploaded properly. Please try again!",
        data: null,
      });
    }
    mainImage = "/blog_posts/images/" + randomName;
    const basevideoName = video.name
      .substring(0, video.name.lastIndexOf("."))
      .replaceAll(" ", "_");
    const videoextension = video.name.substring(video.name.lastIndexOf("."));
    const randomvideoName = `${uuidv4()}_${basevideoName}${videoextension}`;
    const videofilePath = path.join(
      process.cwd(),
      "public/blog_posts/videos",
      randomvideoName
    );
    await fs.writeFile(videofilePath, Buffer.from(await video.arrayBuffer()));

    try {
      await fs.access(videofilePath);
    } catch (error) {
      return NextResponse.json({
        statusCode: 500,
        message: "Video is not uploaded properly. Please try again!",
        data: null,
      });
    }
    video = "/blog_posts/videos/" + randomvideoName;
    console.log("6");
    const basesrcName = source.name
      .substring(0, source.name.lastIndexOf("."))
      .replaceAll(" ", "_");
    const srcextension = source.name.substring(source.name.lastIndexOf("."));
    const randomsrcName = `${uuidv4()}_${basesrcName}${srcextension}`;
    const srcfilePath = path.join(
      process.cwd(),
      "public/blog_posts/images",
      randomsrcName
    );
    await fs.writeFile(srcfilePath, Buffer.from(await source.arrayBuffer()));

    try {
      await fs.access(srcfilePath);
    } catch (error) {
      return NextResponse.json({
        statusCode: 500,
        message: "Blog image is not uploaded properly. Please try again!",
        data: null,
      });
    }
    source = "/blog_posts/images/" + randomsrcName;
    const newBlogPost = await BlogPost.create({
      mainImage,
      mainTitle,
      title,
      header,
      subheading,
      date,
      readTime,
      video,
      blogImage: {
        src: source,
        alt,
        caption,
      },
      blogDetails,
    });
    if (!newBlogPost) {
      return NextResponse.json({
        status: 400,
        message: "Data not posted. Try again later!",
        data: null,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Data posted successfully",
      data: null,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Data not posted. Try again later!",
      data: null,
    });
  }
}

export async function GET(req, res) {
  try {
    const data = await BlogPost.find();

    if (!data) {
      return NextResponse.json({
        status: 400,
        message: "No data found.",
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
      message: "Data not fetched. Try again later",
      data: null,
    });
  }
}
