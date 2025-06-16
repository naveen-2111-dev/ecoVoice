import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        const { action } = await req.json();
        const cookieStore = await cookies();

        switch (action) {
            case "Logout": {
                cookieStore.set("token", "", {
                    httpOnly: true,
                    secure: true,
                    path: "/",
                    maxAge: 0,
                });

                return new Response(JSON.stringify({ message: "Logged out successfully" }), {
                    status: 200,
                });
            }

            case "CheckAuth": {
                const token = cookieStore.get("token")?.value;

                if (!token) {
                    return new Response(JSON.stringify({ loggedIn: false }), {
                        status: 200,
                    });
                }

                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
                    return new Response(JSON.stringify({ loggedIn: true, user: decoded }), {
                        status: 200,
                    });
                } catch (err) {
                    return new Response(JSON.stringify({ loggedIn: false }), {
                        status: 200,
                    });
                }
            }

            default:
                return new Response(JSON.stringify({ error: "Invalid action" }), {
                    status: 400,
                });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal server error", details: error }), {
            status: 500,
        });
    }
}
