"use client";

import Login from "@/components/login";
import Nav from "@/components/nav";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col bg-gray-900  place-content-center place-items-center">
      <div className="absolute top-0 w-full">
        <Nav></Nav>
      </div>
      <Login></Login>
    </main>
  );
}
