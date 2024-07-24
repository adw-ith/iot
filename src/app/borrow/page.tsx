"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

import Available from "@/components/available";
import { Component } from "@/types/types";
import axios from "axios";
import Navbar from "@/components/navbar";
import RequestForm from "@/components/requestForm";

const tabs = [
  "Available Components",
  "Request Components",
  "Borrowed Components",
];

export default function Borrow() {
  const { user } = useAuth();
  const [tab, setTab] = useState(0);
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get("/api/getComponents");
        console.log(response.data);
        setComponents(response.data.components);
      } catch (error) {
        setError("Failed to fetch components");
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);

  const borrowedComponents = Array.isArray(user?.borrowed_components)
    ? (user.borrowed_components as Component[])
    : [];

  return (
    <div>
      <Navbar></Navbar>

      <div className="text-white bg-gray-900">
        <div className="relative p-4 sm:p-8 sm:pb-12 border-b-2 border-gray-300">
          <div className="text-2xl font-bold">{tabs[tab]}</div>
          <div className="sm:absolute flex flex-wrap bottom-0 right-0">
            {tabs.map((tabName, index) => (
              <div
                key={index}
                onClick={() => setTab(index)}
                className={`border-2 border-gray-300 font-bold px-4 py-2 cursor-pointer
                 ${
                   tab === index
                     ? "bg-slate-300 text-black"
                     : "hover:bg-gray-200 hover:text-black"
                 }`}
              >
                {tabName}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {tab === 0 && !loading && !error && (
            <Available components={components} />
          )}
          {tab === 1 && !loading && !error && <RequestForm />}
          {tab === 2 && !loading && !error && (
            <Available components={borrowedComponents} />
          )}
        </div>
      </div>
    </div>
  );
}
