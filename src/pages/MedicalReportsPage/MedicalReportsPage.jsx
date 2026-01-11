// ========================================
// MedicalReportsPage.jsx (COMPLETE CODE)
// ========================================

import { useState, useEffect, useCallback } from "react";

const CATEGORIES = {
  LAB_REPORTS: "lab-reports",
  PRESCRIPTIONS: "prescriptions",
  VACCINES: "vaccines",
  CLINIC_BOOK: "clinic-book",
  SURGERIES: "surgeries",
  CUSTOM: "custom-folders",
};

export default function MedicalReportsPage({ onNavigateToUpload }) {
  const [userId] = useState("user_123"); // Replace with actual user ID from auth

  const [labReports, setLabReports] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [clinicBook, setClinicBook] = useState([]);
  const [customFolders, setCustomFolders] = useState([]);
  const [surgeries, setSurgeries] = useState([]);

  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentFiles, setCurrentFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState(null);

  // Helper function to load data from storage
  const loadFromStorage = async (user, category) => {
    try {
      const result = await window.storage.list(`${user}:${category}:`, false);
      if (!result || !result.keys) return [];

      const items = await Promise.all(
        result.keys.map(async (key) => {
          try {
            const item = await window.storage.get(key, false);
            return item ? JSON.parse(item.value) : null;
          } catch {
            return null;
          }
        }),
      );

      return items.filter(Boolean);
    } catch (error) {
      console.error(`Failed to load ${category}:`, error);
      return [];
    }
  };

  // Load all data
  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [
        labData,
        prescData,
        vaccineData,
        clinicData,
        surgeryData,
        folderData,
      ] = await Promise.all([
        loadFromStorage(userId, CATEGORIES.LAB_REPORTS),
        loadFromStorage(userId, CATEGORIES.PRESCRIPTIONS),
        loadFromStorage(userId, CATEGORIES.VACCINES),
        loadFromStorage(userId, CATEGORIES.CLINIC_BOOK),
        loadFromStorage(userId, CATEGORIES.SURGERIES),
        loadFromStorage(userId, CATEGORIES.CUSTOM),
      ]);

      setLabReports(labData);
      setPrescriptions(prescData);
      setVaccines(vaccineData);
      setClinicBook(clinicData);
      setSurgeries(surgeryData);
      setCustomFolders(folderData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // View category files
  const handleViewCategory = (category) => {
    let files = [];
    switch (category.id) {
      case CATEGORIES.LAB_REPORTS:
        files = labReports;
        break;
      case CATEGORIES.PRESCRIPTIONS:
        files = prescriptions;
        break;
      case CATEGORIES.VACCINES:
        files = vaccines;
        break;
      case CATEGORIES.CLINIC_BOOK:
        files = clinicBook;
        break;
      case CATEGORIES.SURGERIES:
        files = surgeries;
        break;
      case CATEGORIES.CUSTOM:
        files = customFolders;
        break;
      default:
        files = [];
    }
    setCurrentFiles(files);
    setCurrentCategory(category);
  };

  // Navigate to upload
  const handleUploadClick = (category) => {
    if (onNavigateToUpload) {
      onNavigateToUpload(category);
    }
  };

  // Back to dashboard
  const handleBack = () => {
    setCurrentCategory(null);
    setCurrentFiles([]);
    loadAllData(); // Refresh data when returning
  };

  // Delete file
  const handleDeleteFile = async (fileId) => {
    if (!confirm("Delete this file?")) return;

    try {
      await window.storage.delete(
        `${userId}:${currentCategory.id}:${fileId}`,
        false,
      );
      // Refresh current view
      const updatedFiles = currentFiles.filter((f) => f.id !== fileId);
      setCurrentFiles(updatedFiles);
      // Refresh all data
      await loadAllData();
    } catch (error) {
      console.error("Failed to delete file:", error);
      alert("Failed to delete file. Please try again.");
    }
  };

  // Download file
  const downloadFile = (file) => {
    const a = document.createElement("a");
    a.href = file.url;
    a.download = file.name || file.title;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Format date
  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  // Category definitions
  const categories = [
    {
      id: CATEGORIES.LAB_REPORTS,
      title: "Lab Reports",
      count: labReports.length,
      color: "bg-blue-100",
      textColor: "text-blue-700",
      icon: "🧪",
    },
    {
      id: CATEGORIES.PRESCRIPTIONS,
      title: "Prescriptions",
      count: prescriptions.length,
      color: "bg-green-100",
      textColor: "text-green-700",
      icon: "💊",
    },
    {
      id: CATEGORIES.VACCINES,
      title: "Vaccines",
      count: vaccines.length,
      color: "bg-purple-100",
      textColor: "text-purple-700",
      icon: "💉",
    },
    {
      id: CATEGORIES.CLINIC_BOOK,
      title: "Clinic Book",
      count: clinicBook.length,
      color: "bg-orange-100",
      textColor: "text-orange-700",
      icon: "📋",
    },
    {
      id: CATEGORIES.SURGERIES,
      title: "Surgeries",
      count: surgeries.length,
      color: "bg-red-100",
      textColor: "text-red-700",
      icon: "🩺",
    },
    {
      id: CATEGORIES.CUSTOM,
      title: "Create folder",
      count: customFolders.length,
      color: "bg-orange-100",
      textColor: "text-orange-700",
      icon: "📋",
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">
          Loading your medical reports...
        </div>
      </div>
    );
  }

  // Category Detail View
  if (currentCategory) {
    return (
      <div className="p-6">
        {/* Header with Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold transition flex items-center gap-2"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-mainblack">
              {currentCategory.icon} {currentCategory.title}
            </h2>
          </div>

          <button
            onClick={() => handleUploadClick(currentCategory)}
            className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-semibold hover:bg-secondary/90 transition"
          >
            + Upload New
          </button>
        </div>

        {/* Files Grid */}
        {currentFiles.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <div className="text-4xl mb-4">{currentCategory.icon}</div>
            <p className="text-gray-500 mb-4">
              No {currentCategory.title.toLowerCase()} uploaded yet
            </p>
            <button
              onClick={() => handleUploadClick(currentCategory)}
              className="px-6 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition"
            >
              Upload Your First File
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentFiles.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-300 hover:shadow-lg transition"
              >
                {/* Thumbnail */}
                <button
                  onClick={() => setViewing(file)}
                  className="w-full block"
                >
                  <div className="h-40 w-full flex items-center justify-center bg-gray-50">
                    {file.type?.startsWith("image/") ? (
                      <img
                        src={file.url}
                        alt={file.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl">📄</div>
                    )}
                  </div>
                </button>

                {/* File Info */}
                <div className="p-3 border-t">
                  <div className="font-semibold truncate text-gray-800">
                    {file.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{file.name}</div>
                  <div className="text-xs text-gray-400 mt-2">
                    {formatDate(file.uploadedAt)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between p-2 border-t bg-gray-50">
                  <button
                    onClick={() => setViewing(file)}
                    className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 transition"
                  >
                    View
                  </button>
                  <div className="flex gap-1">
                    <button
                      onClick={() => downloadFile(file)}
                      className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 transition"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="px-3 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Viewing Modal */}
        {viewing && (
          <div className="fixed inset-0 z-50 flex flex-col bg-black/80">
            <div className="flex items-center justify-between p-4 bg-white">
              <div>
                <div className="font-semibold">{viewing.title}</div>
                <div className="text-sm text-gray-600">
                  {viewing.name} • {formatDate(viewing.uploadedAt)}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => downloadFile(viewing)}
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
                >
                  Download
                </button>
                <button
                  onClick={() => setViewing(null)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
              {viewing.type?.startsWith("image/") ? (
                <img
                  src={viewing.url}
                  alt={viewing.title}
                  className="max-h-full max-w-full object-contain"
                />
              ) : viewing.type === "application/pdf" ? (
                <iframe
                  src={viewing.url}
                  title={viewing.title}
                  className="w-full h-full bg-white"
                />
              ) : (
                <div className="text-white text-center">
                  <div className="text-4xl mb-4">📄</div>
                  <p>Preview not available</p>
                  <button
                    onClick={() => downloadFile(viewing)}
                    className="mt-4 px-6 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition"
                  >
                    Download to View
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-mainblack">Medical Reports</h1>
        <p className="text-gray-600 mt-2">
          Manage all your medical documents in one secure place
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${category.color} rounded-xl p-6 shadow-md hover:shadow-xl transition-all`}
          >
            {/* Icon */}
            <div className="text-4xl mb-3">{category.icon}</div>

            {/* Title & Count */}
            <h3 className={`text-xl font-bold ${category.textColor} mb-1`}>
              {category.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {category.count} {category.count === 1 ? "file" : "files"}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleViewCategory(category)}
                className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
              >
                View Files
              </button>
              <button
                onClick={() => handleUploadClick(category)}
                className="w-full px-4 py-2 bg-secondary text-white rounded-lg text-sm font-semibold hover:bg-secondary/90 transition"
              >
                Upload New
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Folders Section (if any) */}
      {customFolders.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-mainblack mb-4">
            Custom Folders
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customFolders.map((folder) => (
              <div
                key={folder.id}
                className="bg-gray-100 rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-3">📁</div>
                <h3 className="text-xl font-bold text-gray-700 mb-1">
                  {folder.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {folder.items?.length || 0} files
                </p>
                <button className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
                  Open Folder
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
