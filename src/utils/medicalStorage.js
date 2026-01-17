// src/utils/medicalStorage.js
// Centralized storage utilities for medical reports

const STORAGE_PREFIX = "medical-reports";

/**
 * Generate storage key
 */
export const getStorageKey = (userId, category) => {
  return `${STORAGE_PREFIX}:${userId}:${category}`;
};

/**
 * Save data to storage
 */
export const saveToStorage = async (userId, category, data) => {
  try {
    const key = getStorageKey(userId, category);
    await window.storage.set(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Storage save error:", error);
    return false;
  }
};

/**
 * Load data from storage
 */
export const loadFromStorage = async (userId, category) => {
  try {
    const key = getStorageKey(userId, category);
    const result = await window.storage.get(key);
    return result ? JSON.parse(result.value) : [];
  } catch (error) {
    console.log("Storage load error or no data:", error);
    return [];
  }
};

/**
 * Delete data from storage
 */
export const deleteFromStorage = async (userId, category) => {
  try {
    const key = getStorageKey(userId, category);
    await window.storage.delete(key);
    return true;
  } catch (error) {
    console.error("Storage delete error:", error);
    return false;
  }
};

/**
 * Category constants
 */
export const CATEGORIES = {
  LAB_REPORTS: "lab-reports",
  PRESCRIPTIONS: "prescriptions",
  VACCINATIONS: "vaccinations",
  SURGERIES: "surgeries",
  DOCTOR_NOTES: "doctor-notes",
  CLINIC_BOOKS: "clinic-books",
  CUSTOM_FOLDERS: "custom-folders",
};

/**
 * Get category display name
 */
export const getCategoryTitle = (category) => {
  const titles = {
    [CATEGORIES.LAB_REPORTS]: "Lab Reports",
    [CATEGORIES.PRESCRIPTIONS]: "Prescriptions",
    [CATEGORIES.VACCINATIONS]: "Vaccinations",
    [CATEGORIES.SURGERIES]: "Surgeries",
    [CATEGORIES.DOCTOR_NOTES]: "Doctor Notes",
    [CATEGORIES.CLINIC_BOOKS]: "Clinic Books",
    [CATEGORIES.CUSTOM_FOLDERS]: "Custom Folders",
  };
  return titles[category] || category;
};

/**
 * Validate file before upload
 */
export const validateFile = (file) => {
  const validTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!file) {
    return { valid: false, error: "No file selected" };
  }

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: "Only PDF, JPG, and PNG files are allowed" };
  }

  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 5MB" };
  }

  return { valid: true };
};

/**
 * Convert file to base64
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Format date for display
 */
export const formatDate = (isoString) => {
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return isoString;
  }
};
