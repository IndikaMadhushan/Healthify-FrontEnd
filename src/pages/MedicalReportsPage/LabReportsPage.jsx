// src/pages/MedicalReportsPage/LabReportsPage.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import {
  getMyLabContents,
  getPatientLabContents,
  createLabFolder,
  uploadLabFile,
  deleteLabFolder,
  deleteLabFile,
} from "../../api/LabReportApi";
import { getPatientProfileApi } from "../../api/PatientApi";
import { uploadPatientReportApi } from "../../api/ReportsApi";
import { getSignedUrlApi } from "../../api/FilesApi";
import { sanitizeStorageLabel } from "../../utils/patientProfileValidation";

// ── helpers ──────────────────────────────────────────────────────────────────
const validateFile = (file) => {
  const maxSize = 5 * 1024 * 1024;
  const validTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];
  if (!validTypes.includes(file.type))
    return { valid: false, error: "Only PDF, JPG, and PNG files are allowed" };
  if (file.size > maxSize)
    return { valid: false, error: "File size must be less than 5MB" };
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

// ── File viewer modal ─────────────────────────────────────────────────────────
function FileViewerModal({ file, onClose }) {
  if (!file) return null;
  const isImage = file.fileType?.startsWith("image/");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between bg-gray-50">
          <div>
            <h3 className="font-bold text-lg">{file.title}</h3>
            <p className="text-sm text-gray-600">{file.originalName}</p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-gray-100 flex items-center justify-center">
          {isImage ? (
            <img
              src={file.fileUrl}
              alt={file.title}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <iframe
              src={file.fileUrl}
              className="w-full h-full min-h-[600px]"
              title={file.title}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LabReportsPage() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const role = localStorage.getItem("role")?.toUpperCase();
  const isDoctor = role === "DOCTOR";

  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const [totalFolders, setTotalFolders] = useState(0);
  const [currentFolder, setCurrentFolder] = useState(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [showTitleModal, setShowTitleModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [folderName, setFolderName] = useState("");
  const [viewing, setViewing] = useState(null);
  const [resolvedPatientId, setResolvedPatientId] = useState(null);

  const fileInputRef = useRef(null);

  // ── load contents ───────────────────────────────────────────────────────────
  const loadContents = useCallback(
    async (folderId) => {
      setLoading(true);
      try {
        const res = isDoctor
          ? await getPatientLabContents(patientId, folderId)
          : await getMyLabContents(folderId);

        const data = res.data;
        setFolders(data.folders || []);
        setFiles(data.files || []);
        setTotalFiles(data.totalFiles ?? 0);
        setTotalFolders(data.totalFolders ?? 0);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load lab reports");
      } finally {
        setLoading(false);
      }
    },
    [isDoctor, patientId],
  );

  useEffect(() => {
    loadContents(currentFolder);
  }, [currentFolder, loadContents]);

  // ── navigation ──────────────────────────────────────────────────────────────
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

  // const handleBack = () => {
  //   if (currentFolder !== null) {
  //     setCurrentFolder(null);
  //     return;
  //   }
  //   if (isDoctor) {
  //     navigate(
  //       patientId
  //         ? `/doctor/${patientId}/medical-reports`
  //         : "/doctor/dashboard",
  //     );
  //   } else {
  //     navigate("/patient/medical-reports");
  //   }
  // };

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
    } 
    else if (role === "PATIENT") {
      navigate("/patient/medical-reports");
    } 
    else {
      navigate("/");
    }
  };
  // ── file select ─────────────────────────────────────────────────────────────
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const v = validateFile(file);
    if (!v.valid) {
      toast.error(v.error);
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

  // ── confirm upload ──────────────────────────────────────────────────────────
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

      await uploadLabFile(
        pendingFile,
        sanitizedTitle,
        currentFolder,
      );

      const reportDate = new Date().toISOString().slice(0, 10);
      await uploadPatientReportApi(
        resolvedPatientId,
        "LAB_REPORT",
        pendingFile,
        reportDate,
      );

      setPendingFile(null);
      setTitleText("");
      setShowTitleModal(false);
      toast.success("File uploaded");
      await loadContents(currentFolder);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setPendingFile(null);
    setTitleText("");
    setShowTitleModal(false);
  };

  // ── create folder ───────────────────────────────────────────────────────────
  const handleCreateFolder = async () => {
    const sanitizedFolderName = sanitizeStorageLabel(folderName, 30);

    if (!sanitizedFolderName) {
      toast.error("Please enter a folder name");
      return;
    }
    try {
      await createLabFolder(sanitizedFolderName, currentFolder);
      toast.success("Folder created");
      setFolderName("");
      setShowFolderModal(false);
      loadContents(currentFolder);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create folder");
    }
  };

  // ── delete ──────────────────────────────────────────────────────────────────
  const handleDeleteFolder = async (folderId) => {
    if (!confirm("Delete this folder and all its contents?")) return;
    try {
      await deleteLabFolder(folderId);
      toast.success("Folder deleted");
      loadContents(currentFolder);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete folder");
    }
  };

  const handleDeleteFile = async (fileId) => {
    if (!confirm("Delete this file?")) return;
    try {
      await deleteLabFile(fileId);
      toast.success("File deleted");
      loadContents(currentFolder);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete file");
    }
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

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 md:p-6">
      <div className="max-w-6xl mx-auto">


        {/* <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
        >
          <span>←</span> Back
        </button> */}


        {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition mb-3"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        
        <div className="mb-8 py-4 rounded-xl bg-gray-50 ">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary text-xl">
              📚
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary drop-shadow-sm">
              Lab Reports
            </h1>
          </div>

          <p className="text-[12px] md:text-[16px] text-teal-800 ml-13">
            View and manage all your lab reports
          </p>
        </div>
        
      </div>


        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col items-left  mb-4">
            
            {currentFolder && (
              <button
                onClick={() => setCurrentFolder(null)}
                className=" text-gray-600 hover:text-gray-900 transition text-sm font-medium flex items-center gap-2 mb-4"
              >
                <span>←</span> Back to Lab Report
              </button>
            )}
            <h1 className="md:text-xl text-lg font-semi bold text-gray-900">Upload your all lab reports</h1>
          </div>

          <div className="flex flex-col xs:flex-row sm:items-center sm:justify-between gap-4">
            {!isDoctor && (
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="md:px-6 md:py-3 px-2 py-3 text-sm md:text-md bg-secondary text-white rounded-lg hover:bg-secondary/90 transition font-medium flex items-center gap-2"
                >
                  <span>📁</span> Upload File
                </button>
                <button
                  onClick={() => setShowFolderModal(true)}
                  className="md:px-6 md:py-3 px-2 py-3 text-sm md:text-md bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium flex items-center gap-2"
                >
                  <span>📂</span> New Folder
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,image/*"
                />
              </div>
            )}

            <div className="flex gap-4">
              <div className="text-right bg-gray-50 px-6 py-3 rounded-lg">
                <p className="text-sm text-gray-600 font-medium">Total Files</p>
                <p className="text-2xl font-bold text-secondary">
                  {totalFiles}
                </p>
              </div>
              <div className="text-right bg-gray-50 px-6 py-3 rounded-lg">
                <p className="text-sm text-gray-600 font-medium">
                  Total Folders
                </p>
                <p className="text-2xl font-bold text-primary">
                  {totalFolders}
                </p>
              </div>
            </div>
          </div>

          {!isDoctor && (
            <p className="text-xs text-gray-500 mt-3">
              ✅ Accepted: PDF, JPG, PNG (Max 5MB)
            </p>
          )}
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3 animate-pulse">📂</div>
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {!loading && folders.length === 0 && files.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <div className="text-6xl mb-4">📂</div>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              {currentFolder
                ? "This folder is empty"
                : "No files or folders yet"}
            </p>
            {!isDoctor && (
              <p className="text-sm text-gray-500">
                Click "Upload File" or "New Folder" to get started
              </p>
            )}
          </div>
        )}

        {!loading && (folders.length > 0 || files.length > 0) && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <button
                  onClick={() => setCurrentFolder(folder.id)}
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
                      📄 {folder.fileCount} items
                    </p>
                  </div>
                </button>
                <div className="flex border-t p-3 gap-2">
                  <button
                    onClick={() => setCurrentFolder(folder.id)}
                    className="flex-1 text-sm py-2 bg-gray-50 font-medium rounded-lg hover:bg-gray-100 transition"
                  >
                    Open
                  </button>
                  {!isDoctor && (
                    <button
                      onClick={() => handleDeleteFolder(folder.id)}
                      className="px-4 text-sm py-2 text-red-600 bg-red-50 font-medium rounded-lg hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}

            {files.map((file) => (
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
                    {file.type?.startsWith("image/") && file.data ? (
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
                      {file.name || file.originalName}
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
                  {!isDoctor && (
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="px-3 text-sm py-2 text-red-600 bg-red-50 font-medium rounded-lg hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showTitleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">📝 Enter File Title</h3>
            <input
              type="text"
              value={titleText}
              onChange={(e) =>
                setTitleText(sanitizeStorageLabel(e.target.value, 30))
              }
              placeholder="Enter a title for this file"
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
              disabled={uploading}
              maxLength={30}
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

      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">📂 Create New Folder</h3>
            <input
              type="text"
              value={folderName}
              onChange={(e) =>
                setFolderName(sanitizeStorageLabel(e.target.value, 30))
              }
              placeholder="Enter folder name"
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              maxLength={30}
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

      <FileViewerModal file={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}
