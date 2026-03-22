// src/components/MedicalReports/FileViewerModal.jsx
// Modal for viewing and downloading files

import React from "react";

export default function FileViewerModal({ file, onClose }) {
  if (!file) return null;

  const downloadFile = async () => {
    const fileName =
      file.name ||
      file.originalName ||
      `${file.title}.${(file.type || "application/octet-stream").split("/")[1]}`;

    if (file.data?.startsWith("blob:") || file.data?.startsWith("data:")) {
      const link = document.createElement("a");
      link.href = file.data;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const response = await fetch(file.data);
    if (!response.ok) {
      throw new Error(`Download failed with status ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90">
      {/* Header Bar */}
      <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-sm border-b border-white/10">
        <div className="text-white">
          <p className="font-semibold text-lg">{file.title}</p>
          <p className="text-sm text-gray-300">{file.name}</p>
          <p className="text-xs text-gray-400 mt-1">
            Uploaded:{" "}
            {new Date(file.uploadedAt || file.date).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              downloadFile().catch((error) => {
                console.error("Failed to download file", error);
              });
            }}
            className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition font-medium flex items-center gap-2"
          >
            <span>📥</span>
            Download
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* File Content */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        {file.type.startsWith("image/") ? (
          <img
            src={file.data}
            alt={file.title}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
          />
        ) : file.type === "application/pdf" ||
          file.name?.toLowerCase().endsWith(".pdf") ? (
          <iframe
            src={file.data}
            title={file.title}
            className="w-full h-full border-0 rounded-lg shadow-2xl bg-white"
          />
        ) : (
          <div className="text-white text-center">
            <p className="text-xl mb-4">
              Preview not available for this file type
            </p>
            <button
              onClick={() => {
                downloadFile().catch((error) => {
                  console.error("Failed to download file", error);
                });
              }}
              className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90"
            >
              Download to view
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
