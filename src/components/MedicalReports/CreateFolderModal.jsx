// src/components/MedicalReports/CreateFolderModal.jsx
// Modal for creating/renaming custom folders

import { useState, useEffect } from "react";

export default function CreateFolderModal({
  show,
  onClose,
  onSave,
  editData = null,
}) {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (show) {
      setFolderName(editData?.name || "");
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]); // Only reset when modal opens

  const handleSave = () => {
    const trimmedName = folderName.trim();

    if (!trimmedName) {
      setError("Folder name is required");
      return;
    }

    if (trimmedName.length > 30) {
      setError("Folder name must be 30 characters or less");
      return;
    }

    onSave(trimmedName);
    setFolderName("");
    setError("");
  };

  const handleClose = () => {
    setFolderName("");
    setError("");
    onClose();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setFolderName(value);
      setError("");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {editData ? "Rename Folder" : "Create New Folder"}
        </h2>

        <div>
          <label className="text-sm font-semibold text-gray-700">
            Folder Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={folderName}
            onChange={handleChange}
            placeholder="Medical Tests"
            maxLength={30}
            className={`mt-1 w-full h-10 px-3 rounded-md border ${error ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition`}
            autoFocus
          />

          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

          <p className="text-xs text-gray-500 mt-1">
            {folderName.length}/30 characters
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition font-medium"
          >
            {editData ? "Rename" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
