import mongoose from "mongoose";
import { z } from "zod";
import { FollowerSchema, FollowersZodSchema } from "../post/utils/follower";

new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    rememberMe: {
        type: Boolean,
        default: false,
    },
    followerscount:{
        type: Number,
        default: 0
    },
    followers:[FollowerSchema]
})

export const LoginZodSchema = z.object({
    email: z
        .string()
        .email()
        .regex(
            /^(sce\d{2}[a-z]{2}\d{3}@sairamtap\.edu\.in|hod\.[a-z]+@sairamce\.edu\.in)$/i,
            {
                message: "Email must be a valid student or HOD email",
            }
        ),
    name: z.string().min(1).max(50).optional(),
    password: z.string().min(6),
    rememberMe: z.boolean().optional(),
    followerscount: z.number().optional(),
    followers: FollowersZodSchema.optional(),
});