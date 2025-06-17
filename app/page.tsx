"use client";

import { Login, Navbar, Register } from "@/components";
import { useAuth } from "@/context/useAuth";
import Posts from "./(display-routes)/Posts/page";

const HomeContent = () => {
  const { auth } = useAuth();

  console.log("HomeContent - Current Auth state:", auth);

  return (
    <div>
      <Navbar />
      <div className="pt-20">
        {auth.AuthState && auth.AuthType === "reg" && <Register />}
        {auth.AuthState && auth.AuthType === "log" && <Login />}
      </div>
      <Posts />
    </div>
  );
};

export default HomeContent;
