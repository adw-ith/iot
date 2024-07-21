"use client";
import { Component } from "@/types/types";
import React, { useState } from "react";

interface AvailableProps {
  components: Component[];
}

const ITEMS_PER_PAGE = 10;

export default function Available({ components }: AvailableProps) {
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Number</th>
          </tr>
        </thead>
        <tbody>
          {currentComponents.map((component, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                {component.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {component.number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
