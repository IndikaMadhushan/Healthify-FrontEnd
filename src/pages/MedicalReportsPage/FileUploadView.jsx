// src/pages/MedicalReportsPage/FileUploadView.jsx
// Reusable file upload and management view

import { useState, useRef, useEffect, useCallback } from "react";
import {
  saveToStorage,
  loadFromStorage,
  validateFile,
  formatDate,
} from "../../utils/medicalStorage";
import FileViewerModal from "../../components/MedicalReports/FileViewerModal";
import toast from "react-hot-toast";
import { getPatientProfileApi } from "../../api/PatientApi";
import { uploadPatientReportApi } from "../../api/ReportsApi";
import { getSignedUrlApi } from "../../api/FilesApi";
import { sanitizeStorageLabel } from "../../utils/patientProfileValidation";
import { confirmDeletion } from "../../utils/deleteConfirmation";

const downloadFromUrl = async (url, fileName) => {
  if (!url) {
    throw new Error("Missing file URL");
  }

  if (url.startsWith("blob:") || url.startsWith("data:")) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}`);
  }

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName || "download";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
};

export default function FileUploadView({
  userId,
  category,
  categoryTitle,
  patientId,
  reportType,
  onBack,
}) {
  const [files, setFiles] = useState([]);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [viewing, setViewing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resolvedPatientId, setResolvedPatientId] = useState(patientId || null);

  const fileInputRef = useRef(null);
  //from- set React Hook useEffect has a missing dependency 'loadFiles'. Either include it or remove the dependency array. You can also do a functional update 'setFiles(f => ...)' if you only need 'files' in the 'loadFiles' function. (react-hooks/exhaustive-deps)  error is ignored because loadFiles is defined with useCallback and has the correct dependencies.
  const loadFiles = useCallback(async () => {
    if (!userId) return;
    const data = await loadFromStorage(userId, category);
    setFiles(data);
  }, [userId, category]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);
  //to here.....

  useEffect(() => {
    if (patientId) return;

    const loadPatientId = async () => {
      const role = localStorage.getItem("role")?.toUpperCase();
      if (role === "DOCTOR") {
        const selectedPatientId = localStorage.getItem("selectedPatientId");
        setResolvedPatientId(selectedPatientId || null);
        return;
      }

      try {
        const profileRes = await getPatientProfileApi();
        setResolvedPatientId(profileRes.data?.id || null);
      } catch (error) {
        console.error("Failed to load patient profile", error);
      }
    };

    loadPatientId();
  }, [patientId]);
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      e.target.value = null;
      return;
    }

    setPendingFile(file);
    setTitleText(
      sanitizeStorageLabel(file.name.replace(/\.[^/.]+$/, ""), 30),
    );
    setShowTitleModal(true);
    e.target.value = null;
  };

  const handleConfirmUpload = async () => {
    if (!pendingFile) return;

    if (!resolvedPatientId) {
      toast.error("Patient not selected");
      return;
    }

    setUploading(true);

    try {
      const sanitizedTitle =
        sanitizeStorageLabel(titleText, 30) ||
        sanitizeStorageLabel(pendingFile.name.replace(/\.[^/.]+$/, ""), 30) ||
        "Untitled";
      const reportDate = new Date().toISOString().slice(0, 10);
      const response = await uploadPatientReportApi(
        resolvedPatientId,
        reportType || category,
        pendingFile,
        reportDate
      );

      const newFile = {
        id: response.data?.id || Date.now().toString(),
        title: sanitizedTitle,
        name: pendingFile.name,
        fileUrl: response.data?.fileUrl,
        type: pendingFile.type,
        uploadedAt: response.data?.uploadedAt || new Date().toISOString(),
      };

      const updated = [newFile, ...files];
      await saveToStorage(userId, category, updated);

      setFiles(updated);
      setPendingFile(null);
      setTitleText("");
      setShowTitleModal(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file. Please try again.");
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
    const confirmed = await confirmDeletion({
      title: "Delete uploaded report?",
      message: "This uploaded file will be removed permanently.",
      confirmLabel: "Delete Report",
    });
    if (!confirmed) return;

    const updated = files.filter((f) => f.id !== id);
    await saveToStorage(userId, category, updated);
    setFiles(updated);
  };

  const handleDownload = (file) => {
    resolveFileUrl(file)
      .then((url) => {
        return downloadFromUrl(url, file.name || file.title || "download");
      })
      .catch((error) => {
        console.error("Failed to download file", error);
        toast.error("Failed to download file");
      });
  };

  const resolveFileUrl = async (file) => {
    if (file.data) return file.data;
    if (!file.fileUrl) return "";
    if (
      file.fileUrl.startsWith("http://") ||
      file.fileUrl.startsWith("https://") ||
      file.fileUrl.startsWith("blob:")
    ) {
      return file.fileUrl;
    }
    return getSignedUrlApi("medical-files", file.fileUrl);
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
                  onClick={async () => {
                    const url = await resolveFileUrl(file);
                    if (!url) {
                      toast.error("File unavailable");
                      return;
                    }
                    setViewing({ ...file, data: url });
                  }}
                  className="w-full block"
                >
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    {file.type.startsWith("image/") && file.data ? (
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
                    onClick={async () => {
                      const url = await resolveFileUrl(file);
                      if (!url) {
                        toast.error("File unavailable");
                        return;
                      }
                      setViewing({ ...file, data: url });
                    }}
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
              onChange={(e) =>
                setTitleText(sanitizeStorageLabel(e.target.value, 30))
              }
              placeholder="Enter a title for this file"
              className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
              disabled={uploading}
              maxLength={30}
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
