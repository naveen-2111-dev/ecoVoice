"use client"

import { Login, Navbar, Register } from "@/components";
import {  useAuth } from "@/context/useAuth";

const HomeContent = () => {
  const { Auth } = useAuth();

  console.log("HomeContent - Current Auth state:", Auth);

  return (
    <div>
      <Navbar />
      <div>
        {Auth.AuthState && Auth.AuthType === "reg" && (
          <Register />
        )}
        {Auth.AuthState && Auth.AuthType === "log" && (
          <Login />
        )}
      </div>
    </div>
  );
}

export default HomeContent;