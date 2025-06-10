import bcrypt from "bcryptjs";
import { LoginZodSchema } from "@/lib/schema/auth/Login";
import getCollection from "@/lib/link/collection";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env.local");
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = LoginZodSchema.parse(body);

        const Collection = await getCollection("LOGIN");
        const user = await Collection.findOne({ email: parsed.email });

        if (!user) {
            return new Response(JSON.stringify({ error: "Invalid email" }), {
                status: 401,
            });
        }

        const isValid = await bcrypt.compare(parsed.password, user.password);

        if (!isValid) {
            return new Response(JSON.stringify({ error: "Invalid password" }), {
                status: 401,
            });
        }

        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return new Response(
            JSON.stringify({
                message: "Login successful",
                user: {
                    email: user.email,
                    rememberMe: user.rememberMe,
                },
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return new Response(
            JSON.stringify({
                error: error || "Internal server error",
            }),
            { status: 500 }
        );
    }
}
