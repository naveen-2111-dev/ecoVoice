import mongoose from "mongoose";
import { z } from "zod";

export const CommentSchema = new mongoose.Schema(
  {
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogpost",
      required: true,
    },
    author: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "login", required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const CommentZodSchema = z.object({
    blogPost: z.string().min(1, "BlogPost ID is required"), 
    author: z.object({
      id: z.string().min(1, "Author ID is required"),
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Valid email required"),
    }),
    content: z.string().min(1, "Comment content is required"),
    parentComment: z.string().optional().nullable(),
    likes: z.number().optional().default(0),
  });
