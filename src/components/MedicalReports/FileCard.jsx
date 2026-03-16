// src/components/MedicalReports/FileCard.jsx
// Reusable card component for file categories

import React from "react";

export default function FileCard({ icon, title, count = 0, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-[280px] h-[180px] bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 flex flex-col items-center justify-center gap-3 border-2 border-transparent hover:border-secondary"
    >
      <div className="text-5xl text-secondary">{icon}</div>

      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>

      <p className="text-sm text-gray-500">
        {count} document{count !== 1 ? "s" : ""}
      </p>
    </button>
  );
}
