"use client";
import AdminTable from "@/components/adminTable";
import BorrowedAdmin from "@/components/borrowedAdmin";
import Components from "@/components/Components";
import { Component } from "@/types/types";
import React, { useEffect, useState } from "react";

const tabs = ["Requests", "Borrowed", "All Components"];

export default function Admin() {
  const [tab, setTab] = useState(0);
  const [change, setChange] = useState(false);
  const [components, setComponents] = useState<Component[]>([]);
  const [borrowedComponents, setBorrowedComponents] = useState<Component[]>([]);
  const [allComponents, setAllComponents] = useState<Component[]>([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch("/api/getRequests");
        if (!response.ok) {
          throw new Error("Failed to fetch components");
        }
        const data = await response.json();
        setComponents(data.requests);

        const borrowedResponse = await fetch("/api/getBorrowed");
        if (!borrowedResponse.ok) {
          throw new Error("Failed to fetch borrowed components");
        }
        const borrowedData = await borrowedResponse.json();
        setBorrowedComponents(borrowedData.borrowedComponents);

        const allResponse = await fetch("/api/getComponents");
        if (!allResponse.ok) {
          throw new Error("Failed to fetch all components");
        }
        const allData = await allResponse.json();
        setAllComponents(allData.components);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    fetchComponents();
  }, [change]);

  const form = (
    <div>
      <form></form>
    </div>
  );

  return (
    <div className="bg-slate-900">
      <div className="relative p-4 sm:p-8 sm:pb-12 border-b-2 border-gray-300">
        <div className="text-3xl pb-8 font-bold">
          Admin Dashboard - {tabs[tab]}
        </div>
        <div className="sm:absolute flex flex-wrap text-center bottom-0 right-0">
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
      <div className="p-4 sm:p-8">
        {tab === 0 && (
          <AdminTable
            Change={change}
            setChange={setChange}
            components={components}
          />
        )}
        {tab === 1 && (
          <BorrowedAdmin
            Change={change}
            setChange={setChange}
            components={borrowedComponents}
          />
        )}
        {tab === 2 && (
          <Components
            Change={change}
            setChange={setChange}
            components={allComponents}
          />
        )}
      </div>
    </div>
  );
}
