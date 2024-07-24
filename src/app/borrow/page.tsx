"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

import Available from "@/components/available";
import { Component } from "@/types/types";
import axios from "axios";
import Navbar from "@/components/navbar";

const tabs = [
  "Available Components",
  "Request Components",
  "Borrowed Components",
];

export default function Borrow() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState(false);
  const [tab, setTab] = useState(0);
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [st, setSt] = useState(false);

  const [componentName, setComponentName] = useState("");
  const [quantity, setQuantity] = useState(1);

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

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/getUserProfile", {
        params: { membership_id: user?.membership_id },
      });
      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error("Fetch user error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [st]);

  useEffect(() => {
    console.log("hello");
  });

  const request = async () => {
    console.log(quantity);
    try {
      const response = await axios.post("/api/request", {
        component_name: componentName,
        number: quantity,
        membership_id: user?.membership_id,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      setSt(!st);
    }
  };

  const borrowedComponents = Array.isArray(user?.borrowed_components)
    ? (user.borrowed_components as Component[])
    : [];

  const requestedComponents = Array.isArray(user?.requested_components)
    ? (user.requested_components as Component[])
    : [];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    request();
    setForm(false);
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="text-white bg-slate-900">
        <div className="relative p-4 sm:p-8 sm:pb-12 border-b-2 border-gray-300">
          <div className="text-2xl font-bold">{tabs[tab]}</div>
          <div className="sm:absolute flex flex-wrap bottom-0 right-0">
            {tabs.map((tabName, index) => (
              <div
                key={index}
                onClick={() => setTab(index)}
                className={`border-2 border-gray-300 min-w-[240px] font-bold px-4 py-2 cursor-pointer
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
          {tab === 1 && !loading && !error && (
            <div className="flex flex-col relative place-content-center place-items-center">
              <div className="flex pb-8 pt-4 w-full">
                <button
                  onClick={() => setForm(true)}
                  className="border-2 font-bold bg-blue-700 hover:bg-slate-400 hover:text-slate-900 duration-500 border-slate-400 px-4 p-1"
                >
                  Request Components
                </button>
              </div>
              <div className="w-full">
                <Available components={requestedComponents} />
              </div>
              {form && (
                <div className="absolute bg-slate-700 p-6 min-w-[90%] sm:min-w-[50%]">
                  <div className="flex justify-between">
                    <div className="text-lg font-bold pb-8">
                      Select Component
                    </div>
                    <div
                      onClick={() => setForm(false)}
                      className="hover:text-red-500 font-extrabold"
                    >
                      ✕
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="form">
                    <div className="flex flex-col">
                      <label className="text-sm">Component Name:</label>
                      <select
                        className="border-2 border-gray-300 p-2 text-slate-900"
                        value={componentName}
                        onChange={(e) => setComponentName(e.target.value)}
                      >
                        <option value="" disabled>
                          Select a component
                        </option>
                        {components.map((component) => (
                          <option
                            className="text-slate-900"
                            key={component.name}
                            value={component.name}
                          >
                            {component.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col mt-4">
                      <label className="text-sm">Quantity:</label>
                      <input
                        type="number"
                        className="border-2 border-gray-300 p-2 text-slate-900"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex mt-4 justify-end">
                      <button
                        type="submit"
                        className="border-2 font-bold bg-blue-700 hover:bg-slate-400 hover:text-slate-900 duration-500 border-slate-600 px-4 py-2"
                      >
                        Request
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
          {tab === 2 && !loading && !error && (
            <Available components={borrowedComponents} />
          )}
        </div>
      </div>
    </div>
  );
}
