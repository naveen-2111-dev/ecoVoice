"use client";

import React from "react";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogoutButton = ({
    variant = "solid",
    icon,
    children,
    onClick,
    fullWidth = false,
}: {
    variant?: "solid" | "outline";
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
    fullWidth?: boolean;
}) => {
    const { setAuth } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        if (onClick) onClick();

        try {
            const res = await fetch("/api/Auth/cookies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "Logout" }),
            });

            if (res.ok) {
                setAuth({
                    AuthState: false,
                    AuthType: null,
                    isAuthenticated: false,
                });

                localStorage.removeItem("token");
                toast.success("Logged out successfully");
                router.push("/");
            } else {
                toast.error("Logout failed");
            }
        } catch (err) {
            toast.error("An error occurred while logging out");
        }
    };

    const baseClasses = `flex items-center cursor-pointer justify-center gap-2 px-4 py-2 rounded font-medium transition-all hover:scale-105 ${variant === "solid"
        ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
        : "border border-blue-600 text-blue-600 hover:bg-blue-50 hover:shadow-md"
        } ${fullWidth ? "w-full" : ""}`;

    const content = (
        <>
            {children}
            <span className="transition-transform duration-200 group-hover:translate-x-1">
                {icon}
            </span>
        </>
    );

    return (
        <button onClick={handleLogout} className={baseClasses}>
            {content}
        </button>
    );
};

export default LogoutButton;
