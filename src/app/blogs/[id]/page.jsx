"use client";
import React from "react";
import Header from "@/app/components/project_header/Header";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/app/components/footer/Footer";
import Blog from "@/app/components/blogs/Blog";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
// You can keep the CSS import at the top

function page({ params }) {
  const [data, setdata] = useState({
    blogDetails: "",
    blogImage: {},
    header: "",
    subheading: "",
    video: null,
    title: "",
    date: "",
    readTime: "",
  });
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `../../../api/blog_posts/${params.id}`
        );
        setdata(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log("api not hit");
      }
    };
    fetchdata();
  }, []);
  console.log(data);
  return (
    <div>
      <Header
        header={data.header}
        subheading={data.subheading}
        projNum={"Blog Post"}
        video={data.video}
      />

      <Blog
        title={data.title}
        date={data.date}
        readTime={data.readTime}
        details={data.blogDetails}
        image={data.blogImage}
      />

      <Footer />
    </div>
  );
}

export default page;
