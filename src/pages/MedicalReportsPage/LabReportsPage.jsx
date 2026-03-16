// src/pages/MedicalReportsPage/LabReportsPage.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getPatientProfileApi } from "../../api/PatientApi";
import { uploadPatientReportApi } from "../../api/ReportsApi";
import { getSignedUrlApi } from "../../api/FilesApi";

// Helper functions
const validateFile = (file) => {
  const maxSize = 5 * 1024 * 1024;
  const validTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: "Only PDF, JPG, and PNG files are allowed" };
  }

  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 5MB" };
  }

  return { valid: true };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// File Viewer Modal Component
function FileViewerModal({ file, onClose }) {
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gray-50">
          <div>
            <h3 className="font-bold text-lg">{file.title}</h3>
            <p className="text-sm text-gray-600">{file.name}</p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 bg-gray-100 flex items-center justify-center">
          {file.type.startsWith("image/") ? (
            <img
              src={file.data}
              alt={file.title}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <iframe
              src={file.data}
              className="w-full h-full min-h-[600px]"
              title={file.title}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function LabReportsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [folderName, setFolderName] = useState("");
  const [viewing, setViewing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resolvedPatientId, setResolvedPatientId] = useState(null);

  const fileInputRef = useRef(null);
  // TODO: Replace with actual user ID from auth context
  const userId = "test-user-123";
  const category = "lab-reports";

  // Load items from localStorage
  useEffect(() => {
    const storageKey = `medical_${userId}_${category}`;
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setItems(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("Error loading data:", error);
        setItems([]);
      }
    }
  }, [userId, category]);

  useEffect(() => {
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
  }, []);

  // Save items to localStorage
  const saveItems = (newItems) => {
    const storageKey = `medical_${userId}_${category}`;
    localStorage.setItem(storageKey, JSON.stringify(newItems));
    setItems(newItems);
  };
  const handleBack = () => {
    const role = localStorage.getItem("role")?.toUpperCase();
    const patientId = localStorage.getItem("selectedPatientId");

    if (role === "DOCTOR") {
      if (!patientId) {
        toast.error("No patient selected");
        navigate("/doctor/dashboard");
        return;
      }
      navigate(`/doctor/${patientId}/medical-reports`);
    } else if (role === "PATIENT") {
      navigate("/patient/medical-reports");
    } else {
      navigate("/");
    }
  };
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
    setTitleText(file.name.replace(/\.[^/.]+$/, "").slice(0, 30));
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
      const reportDate = new Date().toISOString().slice(0, 10);
      const response = await uploadPatientReportApi(
        resolvedPatientId,
        "LAB_REPORT",
        pendingFile,
        reportDate
      );

      const newFile = {
        id: response.data?.id || Date.now().toString(),
        title: titleText.trim() || "Untitled",
        name: pendingFile.name,
        fileUrl: response.data?.fileUrl,
        type: pendingFile.type,
        uploadedAt: response.data?.uploadedAt || new Date().toISOString(),
        folderId: currentFolder,
        isFolder: false,
      };

      const updated = [newFile, ...items];
      saveItems(updated);

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

  const handleCreateFolder = () => {
    if (!folderName.trim()) {
      toast.error("Please enter a folder name");
      return;
    }

    const newFolder = {
      id: Date.now().toString(),
      name: folderName.trim(),
      isFolder: true,
      createdAt: new Date().toISOString(),
      parentId: currentFolder,
    };

    const updated = [newFolder, ...items];
    saveItems(updated);

    setFolderName("");
    setShowFolderModal(false);
  };

  const handleDelete = (id, isFolder) => {
    if (
      !confirm(
        `Delete this ${isFolder ? "folder and all its contents" : "file"}?`,
      )
    )
      return;

    let updated;

    if (isFolder) {
      updated = items.filter((item) => {
        if (item.id === id) return false;
        if (!item.isFolder && item.folderId === id) return false;
        return true;
      });
    } else {
      updated = items.filter((item) => item.id !== id);
    }

    saveItems(updated);
  };

  const resolveFileUrl = async (file) => {
    if (file.data) return file.data;
    if (!file.fileUrl) return "";
    return getSignedUrlApi("medical-files", file.fileUrl);
  };

  const handleDownload = (file) => {
    resolveFileUrl(file)
      .then((url) => {
        if (!url) throw new Error("Missing file URL");
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Failed to download file", error);
        toast.error("Failed to download file");
      });
  };

  const handleFolderClick = (folderId) => {
    setCurrentFolder(folderId);
  };

  const handleBackToRoot = () => {
    setCurrentFolder(null);
  };

  const currentFolderData = currentFolder
    ? items.find((f) => f.id === currentFolder && f.isFolder)
    : null;
  const currentFiles = items.filter(
    (item) => !item.isFolder && item.folderId === currentFolder,
  );
  const currentFolders = items.filter(
    (item) => item.isFolder && item.parentId === currentFolder,
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
        >
          <span>←</span>
          Back
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Lab Reports</h1>
            {currentFolder && (
              <button
                onClick={handleBackToRoot}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm font-medium flex items-center gap-2"
              >
                <span>←</span>
                Back to Root
              </button>
            )}
          </div>

          {/* Breadcrumb */}
          {currentFolderData && (
            <div className="mb-4 text-sm text-gray-600 flex items-center gap-2">
              <span
                className="cursor-pointer hover:text-secondary font-medium"
                onClick={handleBackToRoot}
              >
                🏠 Home
              </span>
              <span>/</span>
              <span className="font-semibold text-gray-900">
                {currentFolderData.name}
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition font-medium flex items-center gap-2"
              >
                <span>📁</span>
                Upload File
              </button>
              <button
                onClick={() => setShowFolderModal(true)}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium flex items-center gap-2"
              >
                <span>📂</span>
                New Folder
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,image/*"
              />
            </div>
            <div className="text-right bg-gray-50 px-6 py-3 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Total Items</p>
              <p className="text-2xl font-bold text-secondary">
                {currentFiles.length + currentFolders.length}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            ✅ Accepted: PDF, JPG, PNG (Max 5MB)
          </p>
        </div>

        {/* Files and Folders Grid */}
        {currentFiles.length === 0 && currentFolders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <div className="text-6xl mb-4">📂</div>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              {currentFolder
                ? "This folder is empty"
                : "No files or folders yet"}
            </p>
            <p className="text-sm text-gray-500">
              Click "Upload File" or "New Folder" to get started
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Folders */}
            {currentFolders.map((folder) => (
              <div
                key={folder.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <button
                  onClick={() => handleFolderClick(folder.id)}
                  className="w-full block"
                >
                  <div className="h-40 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">📂</div>
                      <p className="text-sm font-semibold text-gray-700">
                        Folder
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border-t">
                    <p className="font-bold text-lg truncate text-gray-800">
                      {folder.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      📅 Created: {formatDate(folder.createdAt)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 font-medium">
                      📄{" "}
                      {
                        items.filter(
                          (f) => !f.isFolder && f.folderId === folder.id,
                        ).length
                      }{" "}
                      items
                    </p>
                  </div>
                </button>

                <div className="flex border-t p-3 gap-2">
                  <button
                    onClick={() => handleFolderClick(folder.id)}
                    className="flex-1 text-sm py-2 bg-gray-50 font-medium rounded-lg hover:bg-gray-100 transition"
                  >
                    Open
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(folder.id, true);
                    }}
                    className="px-4 text-sm py-2 text-red-600 bg-red-50 font-medium rounded-lg hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Files */}
            {currentFiles.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
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
                  <div className="h-40 bg-gray-50 flex items-center justify-center">
                    {file.type.startsWith("image/") && file.data ? (
                      <img
                        src={file.data}
                        alt={file.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <div className="text-5xl mb-2">📄</div>
                        <p className="text-sm font-semibold text-gray-600">
                          PDF Document
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t">
                    <p className="font-bold text-lg truncate text-gray-800">
                      {file.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      📅 {formatDate(file.uploadedAt)}
                    </p>
                  </div>
                </button>

                <div className="flex border-t p-3 gap-2">
                  <button
                    onClick={async () => {
                      const url = await resolveFileUrl(file);
                      if (!url) {
                        toast.error("File unavailable");
                        return;
                      }
                      setViewing({ ...file, data: url });
                    }}
                    className="flex-1 text-sm py-2 bg-gray-50 font-medium rounded-lg hover:bg-gray-100 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(file)}
                    className="flex-1 text-sm py-2 bg-gray-50 font-medium rounded-lg hover:bg-gray-100 transition"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(file.id, false)}
                    className="px-3 text-sm py-2 text-red-600 bg-red-50 font-medium rounded-lg hover:bg-red-100 transition"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">📝 Enter File Title</h3>

            <input
              type="text"
              value={titleText}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setTitleText(e.target.value);
                }
              }}
              placeholder="Enter a title for this file"
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
              disabled={uploading}
              autoFocus
            />

            <p className="text-xs text-gray-500 mb-4">
              {titleText.length}/30 characters
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCancelUpload}
                disabled={uploading}
                className="flex-1 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
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

      {/* Folder Creation Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">📂 Create New Folder</h3>

            <input
              type="text"
              value={folderName}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setFolderName(e.target.value);
                }
              }}
              placeholder="Enter folder name"
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              autoFocus
            />

            <p className="text-xs text-gray-500 mb-4">
              {folderName.length}/30 characters
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setFolderName("");
                  setShowFolderModal(false);
                }}
                className="flex-1 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Create
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
