// src/components/MedicalReports/ClinicBookCard.jsx
// Display clinic book information with actions

import React from "react";

export default function ClinicBookCard({ book, onOpen, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-200">
      <div className="flex gap-4">
        {/* Book Icon */}
        <div className="flex-shrink-0">
          <div className="w-20 h-24 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white text-3xl">📔</span>
          </div>
        </div>

        {/* Book Details */}
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{book.name}</h3>

          <div className="space-y-0.5 text-sm">
            <p className="text-gray-600">
              <span className="font-medium">ID:</span> {book.doctorId || "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Hospital:</span>{" "}
              {book.hospital || "N/A"}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">Specialization:</span>{" "}
              {book.specialization || "N/A"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onOpen(book)}
              className="px-4 py-1.5 bg-secondary text-white rounded-md text-sm font-medium hover:bg-secondary/90 transition"
            >
              Open
            </button>

            <button
              onClick={() => onEdit(book)}
              className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(book.id)}
              className="px-4 py-1.5 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
