"use client"

import { createContext, useContext, useState, ReactNode } from "react";

export interface AuthProps {
    AuthState: boolean;
    AuthType: "log" | "reg";
}

interface AuthContextType {
    Auth: AuthProps;
    setAuth: (auth: AuthProps) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [Auth, setAuth] = useState<AuthProps>({
        AuthState: false,
        AuthType: "log"
    });

    console.log("AuthProvider - State changed:", Auth);

    return (
        <AuthContext.Provider value={{ Auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};