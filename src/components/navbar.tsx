"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    //@ts-ignore
    setUser(undefined);
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 px-4 sm:px-12 text-white p-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">IOT</div>
        <div className="hidden md:flex space-x-4">
          <a href="/" className="hover:text-gray-300">
            Home
          </a>
          <a href="/contact" className="hover:text-gray-300">
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {
            <button
              onClick={() => handleLogout()}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          }
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
