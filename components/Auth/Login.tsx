"use client";

import { useAuth } from "@/context/useAuth";
import React, { useState } from "react";
import Image from "next/image";
import useAuthHandler from "@/hooks/auth";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const { handleLogin } = useAuthHandler();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setAuth({
      ...auth,
      AuthState: false,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleClose}>
      <div
        className="bg-gray-200 border border-gray-300 w-[90%] max-w-sm rounded-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center mb-4">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(email, password) }}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-4">
          <p className="text-center text-xs text-gray-600">
            powered by <span className="font-medium text-gray-800">nearcult</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
