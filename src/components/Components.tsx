"use client";
import { Component } from "@/types/types";
import React, { useState } from "react";

interface AdminProps {
  components: Component[];
  Change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const ITEMS_PER_PAGE = 10;

export default function Components({
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

  const handleEdit = (id: string) => {
    console.log(`Edit component with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete component with id: ${id}`);
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
                  component.name
                }
              </p>
              <p className="text-brown-300 font-semibold">
                Total Number: {component.total}
              </p>
              <p className="text-brown-300 font-semibold">
                Current Number: {component.number}
              </p>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() =>
                  handleEdit(
                    // @ts-ignore
                    component._id
                  )
                }
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  handleDelete(
                    // @ts-ignore
                    component._id
                  )
                }
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
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
