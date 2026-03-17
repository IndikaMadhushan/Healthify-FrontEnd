import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { updateMyProfile } from "../../api/DoctorApi";

const SPECIALIZATIONS = [
  "General Practice",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Psychiatry",
  "Surgery",
  "Orthopedics",
  "Gynecology",
  "Obstetrics",
  "Ophthalmology",
  "Otolaryngology (ENT)",
  "Urology",
  "Nephrology",
  "Endocrinology",
  "Gastroenterology",
  "Pulmonology",
  "Hematology",
  "Oncology",
  "Radiology",
  "Anesthesiology",
  "Emergency Medicine",
  "Family Medicine",
  "Infectious Diseases",
  "Rheumatology",
  "Plastic Surgery",
  "Thoracic Surgery",
  "Vascular Surgery",
  "Pathology",
  "Nuclear Medicine",
  "Sports Medicine",
  "Geriatrics",
  "Pain Management",
  "Rehabilitation Medicine",
];

function splitFullName(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "",
    secondName: parts.length > 2 ? parts.slice(1, -1).join(" ") : "",
    lastName: parts.length > 1 ? parts[parts.length - 1] : "",
  };
}

export default function DoctorProfileEditModal({
  doctor,
  onClose,
  onUpdated,
}) {
  const [formData, setFormData] = useState({
    fullName: doctor.fullName || "",
    dateOfBirth: doctor.dateOfBirth || "",
    hospital: doctor.hospital || "",
    specialization: doctor.specialization || "",
    licenseNumber: doctor.licenseNumber || "",
  });
  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const trimmedFullName = formData.fullName.trim();
    const trimmedHospital = formData.hospital.trim();
    const trimmedLicense = formData.licenseNumber.trim();

    if (!trimmedFullName) {
      nextErrors.fullName = "Full name is required";
    } else if (trimmedFullName.split(/\s+/).length < 2) {
      nextErrors.fullName = "Enter at least first and last name";
    }

    if (!formData.dateOfBirth) {
      nextErrors.dateOfBirth = "Date of birth is required";
    } else if (formData.dateOfBirth > today) {
      nextErrors.dateOfBirth = "Date of birth cannot be in the future";
    }

    if (!trimmedHospital) {
      nextErrors.hospital = "Hospital or clinic is required";
    }

    if (!formData.specialization) {
      nextErrors.specialization = "Specialization is required";
    }

    if (!trimmedLicense) {
      nextErrors.licenseNumber = "SLMC number is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setConfirmOpen(true);
  };

  const handleConfirmUpdate = async () => {
    const nameParts = splitFullName(formData.fullName);
    const dataToSend = {
      firstName: nameParts.firstName,
      secondName: nameParts.secondName || undefined,
      lastName: nameParts.lastName,
      hospital: formData.hospital.trim(),
      specialization: formData.specialization,
      dateOfBirth: formData.dateOfBirth,
      licenseNumber: formData.licenseNumber.trim(),
    };

    try {
      setIsSaving(true);
      const res = await updateMyProfile(dataToSend);
      const updatedDoctor = {
        ...doctor,
        ...res.data,
      };

      onUpdated(updatedDoctor);
      toast.success("Doctor profile updated");
      setConfirmOpen(false);
      onClose();
    } catch (err) {
      console.error("Profile update failed", err);
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to update doctor profile",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const inputClassName = (field) =>
    `w-full border rounded-lg p-2 ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
          <h2 className="text-lg font-semibold text-secondary mb-4">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className={inputClassName("fullName")}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <input
                type="date"
                name="dateOfBirth"
                max={today}
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={inputClassName("dateOfBirth")}
              />
              {errors.dateOfBirth && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div>
              <input
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                placeholder="Hospital / Clinic"
                className={inputClassName("hospital")}
              />
              {errors.hospital && (
                <p className="text-xs text-red-500 mt-1">{errors.hospital}</p>
              )}
            </div>

            <div>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className={inputClassName("specialization")}
              >
                <option value="">Select Specialization</option>
                {SPECIALIZATIONS.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              {errors.specialization && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.specialization}
                </p>
              )}
            </div>

            <div>
              <input
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="SLMC Number"
                className={inputClassName("licenseNumber")}
              />
              {errors.licenseNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.licenseNumber}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-secondary text-white"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Update
            </h3>

            <p className="text-gray-600 text-sm mb-6">
              Do you want to update your profile information?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
                disabled={isSaving}
              >
                No
              </button>

              <button
                onClick={handleConfirmUpdate}
                className="px-4 py-2 rounded-lg bg-secondary text-white"
                disabled={isSaving}
              >
                {isSaving ? "Updating..." : "Yes, Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
