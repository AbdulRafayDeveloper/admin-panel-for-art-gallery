import mongoose from "mongoose";

const blogModel = new mongoose.Schema(
  {
    mainImage: { type: String, required: true },
    mainTitle: { type: String, required: true },
    title: { type: String, required: true },
    header: { type: String, required: true },
    subheading: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    video: { type: String },
    blogImage: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
      caption: { type: String },
    },
    blogDetails: {
      type: String,
    },
  },
  { timestamps: true }
);

export const BlogPost =
  mongoose.models.blog_posts || mongoose.model("blog_posts", blogModel);
