// src/components/MedicalReports/CreateClinicBookModal.jsx
// Modal for creating/editing clinic books

import { useState, useEffect } from "react";

export default function CreateClinicBookModal({
  show,
  onClose,
  onSave,
  editData = null,
}) {
  // Initialize form based on editData prop
  const getInitialForm = () => ({
    name: editData?.name || "",
    doctorId: editData?.doctorId || "",
    hospital: editData?.hospital || "",
    specialization: editData?.specialization || "",
  });

  const [form, setForm] = useState(getInitialForm());
  const [errors, setErrors] = useState({});

  // Reset form when modal visibility or editData changes
  useEffect(() => {
    if (show) {
      setForm(getInitialForm());
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]); // Only reset when modal opens

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Doctor name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(form);
      // Reset form after save
      setForm({ name: "", doctorId: "", hospital: "", specialization: "" });
      setErrors({});
    }
  };

  const handleClose = () => {
    setForm({ name: "", doctorId: "", hospital: "", specialization: "" });
    setErrors({});
    onClose();
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {editData ? "Edit Clinic Book" : "Create New Clinic Book"}
        </h2>

        <div className="space-y-4">
          {/* Doctor Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Doctor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Dr. John Doe"
              className={`mt-1 w-full h-10 px-3 rounded-md border ${errors.name ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Doctor ID */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Doctor ID
            </label>
            <input
              type="text"
              value={form.doctorId}
              onChange={(e) => handleChange("doctorId", e.target.value)}
              placeholder="DR123456"
              className="mt-1 w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition"
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Hospital
            </label>
            <input
              type="text"
              value={form.hospital}
              onChange={(e) => handleChange("hospital", e.target.value)}
              placeholder="Colombo General Hospital"
              className="mt-1 w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Specialization
            </label>
            <input
              type="text"
              value={form.specialization}
              onChange={(e) => handleChange("specialization", e.target.value)}
              placeholder="Dermatologist"
              className="mt-1 w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition"
            />
          </div>
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
            {editData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
