import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationLayout from "../../components/RegistrationLayout";
import FormField from "../../components/FormField";
import RadioGroup from "../../components/RadioGroup";
import pRegImage1 from "../../assets/p-reg-image1.png";

export default function PatientRegisterPage1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nic: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 0 || age > 150) {
        newErrors.dateOfBirth = "Please enter a valid date of birth";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.nic.trim()) {
      newErrors.nic = "NIC number is required";
    } else if (
      !/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(formData.nic.trim())
    ) {
      newErrors.nic =
        "Invalid NIC format (e.g., 123456789V or 123456789012)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // phone number is optional, but validate if provided
    if (formData.phone.trim()) {
      if (!/^[0-9()+-\s]+$/.test(formData.phone)) {
        newErrors.phone = "Invalid contact number format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      sessionStorage.setItem("patientRegStep1", JSON.stringify(formData));
      navigate("/patient-register-2");
    }
  };

  return (
    <RegistrationLayout image={pRegImage1} imageAlt="Patient Registration">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-mainblack">
          Patient Registration
        </h1>
        {/* Progress indicators */}
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-secondary"></span>
          <span className="w-3 h-3 rounded-full bg-gray-300"></span>
        </div>
      </div>

      <div className="space-y-4">
        <FormField
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          error={errors.fullName}
          placeholder="Enter your full name"
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

        <RadioGroup
          label="Gender"
          options={["Male", "Female"]}
          value={formData.gender}
          onChange={handleChange("gender")}
          error={errors.gender}
          required
        />

        <FormField
          label="NIC Number"
          value={formData.nic}
          onChange={handleChange("nic")}
          error={errors.nic}
          placeholder="e.g., 123456789V or 123456789012"
          required
        />

        <FormField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          error={errors.email}
          placeholder="your.email@example.com"
          required
        />

        <FormField
          label="Contact Number"
          value={formData.phone}
          onChange={handleChange("phone")}
          error={errors.phone}
          placeholder="+94 XX XXX XXXX (optional)"
          required={false}
        />

        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={handleNext}
            className="px-12 py-3 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/90 transition transform hover:scale-105"
          >
            Next
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-secondary hover:underline font-semibold"
        >
          Login here
        </button>
      </p>
    </RegistrationLayout>
  );
}
