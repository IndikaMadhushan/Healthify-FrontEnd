import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationLayout from "../../components/RegistrationLayout";
import FormField from "../../components/FormField";
import RadioGroup from "../../components/RadioGroup";
import dRegImage1 from "../../assets/d-reg-image1.png";

export default function DoctorRegisterPage1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    nic: "",
    dateOfBirth: "",
    specialization: "",
    hospital: "",
    licenseNumber: "",
  });

  const [errors, setErrors] = useState({});

  const SPECIALIZATIONS = [
    "Cardiology",
    "Dermatology",
    "General Practice",
    "Neurology",
    "Pediatrics",
    "Psychiatry",
    "Surgery",
  ];

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.nic.trim()) newErrors.nic = "NIC is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth required";
    if (!formData.specialization) newErrors.specialization = "Specialization required";
    if (!formData.hospital.trim()) newErrors.hospital = "Hospital required";
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "SLMC number required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!validate()) return;

    sessionStorage.setItem(
      "doctorRegStep1",
      JSON.stringify(formData)
    );

    navigate("/doctor-register-2");
  };

  return (
    <RegistrationLayout image={dRegImage1} imageAlt="Doctor Registration">
      <h1 className="text-2xl lg:text-3xl font-bold text-mainblack mb-6">
        Doctor Registration
      </h1>

      <div className="space-y-4">
        <FormField
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          error={errors.fullName}
          placeholder="Enter your full name"
          required
        />

        <RadioGroup
          label="Gender"
          options={["Male", "Female"]}
          value={formData.gender}
          onChange={handleChange("gender")}
          error={errors.gender}
          required
        />

        <FormField
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          error={errors.email}
          placeholder="your.email@example.com"
          required
        />

        <FormField
          label="NIC"
          value={formData.nic}
          onChange={handleChange("nic")}
          error={errors.nic}
          placeholder="Enter your NIC"
          required
        />

        <FormField
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange("dateOfBirth")}
          error={errors.dateOfBirth}
          required
        />

        {/* SPECIALIZATION DROPDOWN – UNTOUCHED UI */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Area of Specialization
          </label>
          <select
            value={formData.specialization}
            onChange={handleChange("specialization")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
          >
            <option value="" disabled>Select specialization</option>
            {SPECIALIZATIONS.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          {errors.specialization && (
            <p className="text-xs text-red-500">{errors.specialization}</p>
          )}
        </div>

        <FormField
          label="Hospital / Clinic"
          value={formData.hospital}
          onChange={handleChange("hospital")}
          error={errors.hospital}
          placeholder="Your hospital or clinic"
          required
        />

        <FormField
          label="SLMC Number"
          value={formData.licenseNumber}
          onChange={handleChange("licenseNumber")}
          error={errors.licenseNumber}
          placeholder="SLMC registration number"
          required
        />

        <div className="flex justify-center pt-4">
          <button
            onClick={handleNext}
            className="px-12 py-3 bg-secondary text-white rounded-full font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </RegistrationLayout>
  );
}
