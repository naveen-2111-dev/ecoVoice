import { LoginZodSchema } from "@/lib/schema/auth/Login";
import bcrypt from "bcryptjs";
import getCollection from "@/lib/link/collection";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = LoginZodSchema.parse(body);

        const Collection = await getCollection("LOGIN");

        const existingUser = await Collection.findOne({ email: parsed.email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "User already exists" }), {
                status: 409,
            });
        }

        const hashedPassword = await bcrypt.hash(parsed.password, 10);

        const newUser = {
            email: parsed.email,
            name: parsed.name,
            password: hashedPassword,
            rememberMe: parsed.rememberMe || false,
            createdAt: new Date(),
        };

        await Collection.insertOne(newUser);

        return new Response(
            JSON.stringify({
                message: "Registration successful",
                user: {
                    email: newUser.email,
                    rememberMe: newUser.rememberMe,
                },
            }),
            { status: 201 }
        );
    } catch (error) {
        if (error) {
            return new Response(JSON.stringify({ errors: error }), {
                status: 400,
            });
        }
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
        });
    }
}
