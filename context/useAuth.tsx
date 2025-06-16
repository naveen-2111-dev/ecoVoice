"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface AuthProps {
    AuthState: boolean;
    AuthType: "log" | "reg" | null;
    isAuthenticated: boolean;
}

interface AuthContextType {
    auth: AuthProps;
    setAuth: React.Dispatch<React.SetStateAction<AuthProps>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthProps>({
        AuthState: false,
        AuthType: null,
        isAuthenticated: false
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/Auth/cookies", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "CheckAuth" }),
                });
                const data = await res.json();
                setAuth((prev) => ({
                    ...prev,
                    isAuthenticated: data?.loggedIn || false
                }));
            } catch {
                setAuth((prev) => ({
                    ...prev,
                    isAuthenticated: false
                }));
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
