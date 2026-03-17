import axiosInstance from "./axiosInstance";

const BASE = "/api/lab-reports";

// ── PATIENT: fetch root or folder contents ───────────────────────────────────
// folderId = null  → root level
// folderId = 5     → inside folder 5
export const getMyLabContents = (folderId = null) => {
  const params = folderId != null ? { folderId } : {};
  return axiosInstance.get(`${BASE}/my`, { params });
};

// ── DOCTOR: fetch a patient's root or folder contents ───────────────────────
export const getPatientLabContents = (patientId, folderId = null) => {
  const params = folderId != null ? { folderId } : {};
  return axiosInstance.get(`${BASE}/patient/${patientId}`, { params });
};

// ── PATIENT: create folder ────────────────────────────────────────────────────
// parentFolderId = null → root folder
export const createLabFolder = (name, parentFolderId = null) => {
  const params = { name };
  if (parentFolderId != null) params.parentFolderId = parentFolderId;
  return axiosInstance.post(`${BASE}/my/folders`, null, { params });
};

// ── PATIENT: upload file ──────────────────────────────────────────────────────
// file      = File object
// title     = string (max 30 chars)
// folderId  = null for root, number for inside folder
export const uploadLabFile = (file, title, folderId = null) => {
  const formData = new FormData();
  formData.append("file", file);
  if (title) formData.append("title", title);
  if (folderId != null) formData.append("folderId", folderId);
  return axiosInstance.post(`${BASE}/my/files`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ── PATIENT: delete folder ────────────────────────────────────────────────────
export const deleteLabFolder = (folderId) =>
  axiosInstance.delete(`${BASE}/my/folders/${folderId}`);

// ── PATIENT: delete file ──────────────────────────────────────────────────────
export const deleteLabFile = (fileId) =>
  axiosInstance.delete(`${BASE}/my/files/${fileId}`);
