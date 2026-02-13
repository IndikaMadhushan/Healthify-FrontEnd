//last edit by thathsara
// MedicalReportsPage.jsx (COMPLETE CODE)
import { useNavigate } from "react-router-dom";
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
  const [_viewing, _setViewing] = useState(null);
  const navigate = useNavigate();
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

  const _handleUploadClick = (category) => {
    if (onNavigateToUpload) {
      onNavigateToUpload(category);
    }
  };

  // Back to dashboard
  const _handleBack = () => {
    setCurrentCategory(null);
    setCurrentFiles([]);
    loadAllData(); // Refresh data when returning
  };

  // Delete file
  const _handleDeleteFile = async (fileId) => {
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
  const _downloadFile = (file) => {
    const a = document.createElement("a");
    a.href = file.url;
    a.download = file.name || file.title;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Format date
  const _formatDate = (iso) => {
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
      title: "Doctor Notes",
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

  // Main Dashboard View
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-mainblack">Medical Reports</h1>
        <p className="text-gray-600 mt-2">
          Manage all your medical documents in one secure place
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${category.color} rounded-xl p-6 shadow-md hover:shadow-xl transition-all `}
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
                onClick={() => navigate(`/medical-reports/${category.id}`)}
                className="w-full px-4 py-2 bg-secondary text-white rounded-lg text-sm font-semibold hover:bg-secondary/90 transition mt-6 "
              >
                View Files
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
