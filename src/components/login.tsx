"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const loginUser = async (membership_id: string, password: string) => {
  try {
    const response = await axios.post("/api/login", {
      membership_id,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export default function Login() {
  const [membershipId, setMembershipId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await loginUser(membershipId, password);
      setMessage(data.message);
      setUser(data.user);
      if (data.user.role == "user") router.push("/borrow");
      else router.push("/admin");
    } catch (error) {
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-gray-950 rounded-lg min-w-[360px] text-center"
      >
        <div className="text-xl pb-8 font-bold text-white">Login</div>
        <input
          type="text"
          placeholder="Membership Id"
          value={membershipId}
          onChange={(e) => setMembershipId(e.target.value)}
          className="mt-4 p-2 w-full border-2 bg-gray-800 border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 p-2 w-full border-2 bg-gray-800 border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
        />
        <div className="pt-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 duration-300 text-lg px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
