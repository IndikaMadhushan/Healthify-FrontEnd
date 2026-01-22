// src/pages/MedicalReportsPage/FileUploadView.jsx
// Reusable file upload and management view

import { useState, useRef, useEffect } from "react";
import {
  saveToStorage,
  loadFromStorage,
  validateFile,
  fileToBase64,
  formatDate,
} from "../../utils/medicalStorage";
import FileViewerModal from "../../components/MedicalReports/FileViewerModal";

export default function FileUploadView({
  userId,
  category,
  categoryTitle,
  onBack,
}) {
  const [files, setFiles] = useState([]);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [viewing, setViewing] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    loadFiles();
  }, [userId, category]);

  const loadFiles = async () => {
    const data = await loadFromStorage(userId, category);
    setFiles(data);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      alert(validation.error);
      e.target.value = null;
      return;
    }

    setPendingFile(file);
    setTitleText(file.name.replace(/\.[^/.]+$/, "").slice(0, 30));
    setShowTitleModal(true);
    e.target.value = null;
  };

  const handleConfirmUpload = async () => {
    if (!pendingFile) return;

    setUploading(true);

    try {
      const base64Data = await fileToBase64(pendingFile);

      const newFile = {
        id: Date.now().toString(),
        title: titleText.trim() || "Untitled",
        name: pendingFile.name,
        data: base64Data,
        type: pendingFile.type,
        uploadedAt: new Date().toISOString(),
      };

      const updated = [newFile, ...files];
      await saveToStorage(userId, category, updated);

      setFiles(updated);
      setPendingFile(null);
      setTitleText("");
      setShowTitleModal(false);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setPendingFile(null);
    setTitleText("");
    setShowTitleModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this file?")) return;

    const updated = files.filter((f) => f.id !== id);
    await saveToStorage(userId, category, updated);
    setFiles(updated);
  };

  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
        >
          <span>←</span>
          Back to Reports
        </button>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {categoryTitle}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition font-medium flex items-center gap-2"
              >
                <span>📁</span>
                Upload New File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,image/*"
              />
              <p className="text-xs text-gray-500 mt-2">
                Accepted: PDF, JPG, PNG (Max 5MB)
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-secondary">
                {files.length}
              </p>
            </div>
          </div>
        </div>

        {/* Files Grid */}
        {files.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-xl text-gray-600">No files uploaded yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Click &quot;Upload New File&quot; to get started
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* Thumbnail */}
                <button
                  onClick={() => setViewing(file)}
                  className="w-full block"
                >
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    {file.type.startsWith("image/") ? (
                      <img
                        src={file.data}
                        alt={file.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <div className="text-5xl mb-2">📄</div>
                        <p className="text-sm text-gray-600">PDF Document</p>
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="p-3 border-t">
                    <p className="font-semibold truncate">{file.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{file.name}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {formatDate(file.uploadedAt)}
                    </p>
                  </div>
                </button>

                {/* Actions */}
                <div className="flex border-t p-2 gap-2">
                  <button
                    onClick={() => setViewing(file)}
                    className="flex-1 text-sm py-1.5 bg-gray-100 rounded hover:bg-gray-200 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(file)}
                    className="flex-1 text-sm py-1.5 bg-gray-100 rounded hover:bg-gray-200 transition"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="px-3 text-sm py-1.5 text-red-600 bg-red-50 rounded hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Title Input Modal */}
      {showTitleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Enter File Title</h3>

            <input
              type="text"
              value={titleText}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setTitleText(e.target.value);
                }
              }}
              placeholder="Enter a title for this file"
              className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
              disabled={uploading}
            />

            <p className="text-xs text-gray-500 mb-4">
              {titleText.length}/30 characters
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCancelUpload}
                disabled={uploading}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={uploading}
                className="flex-1 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Viewer Modal */}
      <FileViewerModal file={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}
