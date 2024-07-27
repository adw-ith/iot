"use client";
import { Component } from "@/types/types";
import React, { useState } from "react";

interface AdminProps {
  components: Component[];
  Change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const ITEMS_PER_PAGE = 10;

export default function AdminTiles({
  components,
  Change,
  setChange,
}: AdminProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(components.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentComponents = components.slice(startIndex, endIndex);

  const handleApprove = async (id: string, membershipId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/grantRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: id,
          membership_id: membershipId,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      console.log(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setChange(!Change);
    }
  };

  const handleReject = (id: string) => {
    console.log(`Reject component with id: ${id}`);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentComponents.map((component) => (
          <div
            key={
              //@ts-ignore
              component._id
            }
            className="border p-4 bg-slate-700 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div>
              <p className="text-lg text-slate-300 font-semibold">
                Component Name:{" "}
                {
                  //@ts-ignore
                  component.component_name
                }
              </p>
              <p className="text-brown-300 font-semibold">
                Number: {component.number}
              </p>
              <p className="text-brown-300 font-semibold">
                Membership ID:{" "}
                {
                  //@ts-ignore
                  component.membership_id
                }
              </p>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() =>
                  handleApprove(
                    // @ts-ignore
                    component._id,
                    // @ts-ignore
                    component.membership_id
                  )
                }
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  handleReject(
                    // @ts-ignore
                    component._id
                  )
                }
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
