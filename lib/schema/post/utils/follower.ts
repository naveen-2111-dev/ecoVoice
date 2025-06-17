import { z } from "zod";
import mongoose from "mongoose";

export const FollowerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    followedAt: {
        type: Date,
        default: Date.now,
    }
});

const zodSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(50, "Name is too long")
        .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),
    
    email: z
        .string()
        .email("Invalid email"),

    followedAt: z
        .date()
        .optional()
});

export const FollowersZodSchema = z.array(zodSchema);