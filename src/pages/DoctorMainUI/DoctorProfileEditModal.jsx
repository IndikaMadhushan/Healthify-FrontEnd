import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { updateMyDoctorProfile } from "../../api/DoctorApi";
import {
  isValidPersonName,
  isValidSriLankanPhoneNumber,
  sanitizePersonName,
  sanitizePhoneNumber,
} from "../../utils/patientProfileValidation";

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

const GENDER_OPTIONS = ["Male", "Female"];

function ReadOnlyField({ label, value }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        value={value || "-"}
        readOnly
        disabled
        className="w-full border border-gray-200 rounded-lg p-2 bg-gray-100 text-gray-500"
      />
    </div>
  );
}

export default function DoctorProfileEditModal({
  doctor,
  onClose,
  onUpdated,
}) {
  const [formData, setFormData] = useState({
    firstName: doctor.firstName || "",
    secondName: doctor.secondName || "",
    lastName: doctor.lastName || "",
    phone: doctor.phone || "",
    hospital: doctor.hospital || "",
    specialization: doctor.specialization || "",
    gender: doctor.gender || "",
    dateOfBirth: doctor.dateOfBirth || "",
  });
  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nextValue = value;
    if (["firstName", "secondName", "lastName"].includes(name)) {
      nextValue = sanitizePersonName(value);
    }
    if (name === "phone") {
      nextValue = sanitizePhoneNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
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

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "First name is required";
    } else if (!isValidPersonName(formData.firstName)) {
      nextErrors.firstName = "Use letters and basic name characters only";
    }

    if (formData.secondName.trim() && !isValidPersonName(formData.secondName)) {
      nextErrors.secondName = "Use letters and basic name characters only";
    }

    if (!formData.lastName.trim()) {
      nextErrors.lastName = "Last name is required";
    } else if (!isValidPersonName(formData.lastName)) {
      nextErrors.lastName = "Use letters and basic name characters only";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required";
    } else if (!isValidSriLankanPhoneNumber(formData.phone)) {
      nextErrors.phone = "Enter a valid 10-digit Sri Lankan phone number";
    }

    if (!formData.hospital.trim()) {
      nextErrors.hospital = "Hospital or clinic is required";
    }

    if (!formData.specialization) {
      nextErrors.specialization = "Specialization is required";
    }

    if (!formData.gender) {
      nextErrors.gender = "Gender is required";
    }

    if (!formData.dateOfBirth) {
      nextErrors.dateOfBirth = "Date of birth is required";
    } else if (formData.dateOfBirth > today) {
      nextErrors.dateOfBirth = "Date of birth cannot be in the future";
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
    const payload = {
      firstName: formData.firstName.trim(),
      secondName: formData.secondName.trim() || undefined,
      lastName: formData.lastName.trim(),
      phone: formData.phone,
      hospital: formData.hospital.trim(),
      specialization: formData.specialization,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
    };

    try {
      setIsSaving(true);
      const res = await updateMyDoctorProfile(payload);
      onUpdated(res.data);
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
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg font-semibold text-secondary mb-4">
            Edit Profile
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <ReadOnlyField label="Doctor ID" value={doctor.doctorId} />
            <ReadOnlyField label="Email" value={doctor.email} />
            <ReadOnlyField label="SLMC Number" value={doctor.licenseNumber} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={inputClassName("firstName")}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <input
                  name="secondName"
                  value={formData.secondName}
                  onChange={handleChange}
                  placeholder="Second Name"
                  className={inputClassName("secondName")}
                />
                {errors.secondName && (
                  <p className="text-xs text-red-500 mt-1">{errors.secondName}</p>
                )}
              </div>

              <div>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={inputClassName("lastName")}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={inputClassName("phone")}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClassName("gender")}
                >
                  <option value="">Select Gender</option>
                  {GENDER_OPTIONS.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200"
                disabled={isSaving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-secondary text-white"
                disabled={isSaving}
              >
                Save Changes
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
