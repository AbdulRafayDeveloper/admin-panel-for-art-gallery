"use client";
import React from "react";
import Header from "@/app/components/project_header/Header";

import Link from "next/link";
import Footer from "@/app/components/footer/Footer";
import Blog from "@/app/components/blogs/Blog";

function page() {
  const blogDetails = {
    "Introduction to Generative AI":
      "Generative AI refers to algorithms that generate new content, such as images, text, or sounds, based on patterns and data they have learned from. It has applications in various fields...",
    "Benefits of Generative AI":
      "Generative AI enables businesses to automate creative tasks, personalize user experiences, and explore new possibilities in design and content creation...",
    "Challenges and Future Trends":
      "While Generative AI holds promise, it also faces challenges like ethical considerations, data privacy concerns, and the need for robust training data. Future trends include...",
  };

  const blogImage = {
    src: "/assets/pictures/ai_blog_pic.jpg",
    alt: "Generative AI Image",
    caption: "Illustration showcasing the capabilities of Generative AI.",
  };

  return (
    <div>
      <Header
        header={"Exploring Generative AI"}
        subheading={"Redefining Human Creativity"}
        projNum={"Blog Post"}
        video={"/assets/videos/ai_blog.mp4"}
      />

      <Blog
        title={"Exploring Generative AI"}
        date={"Published on July 11, 2024"}
        readTime={"5 min read"}
        details={blogDetails}
        image={blogImage}
      />

      <Footer />
    </div>
  );
}

export default page;
