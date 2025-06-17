import mongoose from "mongoose";
import { z } from "zod";
import { CommentSchema, CommentZodSchema } from "./utils/comments";

new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: Object,
      required: true,
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "login",
        required: true,
      },
      name: String,
      email: String,
    },
    coverImage: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
    },
    lead:{
        like:{
            type: Number,
            default: 0,
        },
        comment:[CommentSchema]
    }
  },
  { timestamps: true }
);

export const BlogPostZodSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    content: z.record(z.any()), 
    author: z.object({
      id: z.string(),
      name: z.string().optional(),
      email: z.string().optional(),
    }),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().url().optional(),
    status: z.enum(["draft", "published"]),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).optional(),
    lead: z.object({
        like: z.number().default(0),
        comments: z.array(CommentZodSchema).optional(),
      }).optional(),
  });
