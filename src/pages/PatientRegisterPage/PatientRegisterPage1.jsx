import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHelmet from "../../components/PageHelmet";
import RegistrationLayout from "../../components/RegistrationLayout";
import FormField from "../../components/FormField";
import RadioGroup from "../../components/RadioGroup";
import pRegImage1 from "../../assets/p-reg-image1.png";
import {
  isValidEmail,
  isValidNic,
  isValidPersonName,
  isValidSriLankanPhoneNumber,
  normalizeEmail,
  sanitizeNic,
  sanitizePersonName,
  sanitizePhoneNumber,
} from "../../utils/patientProfileValidation";

const todayString = new Date().toISOString().split("T")[0];

export default function PatientRegisterPage1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const emptyForm = {
      firstName: "",
      secondName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      nic: "",
      email: "",
      phone: "",
    };

    const savedStep1 = sessionStorage.getItem("patientRegStep1");
    if (!savedStep1) {
      return emptyForm;
    }

    try {
      return { ...emptyForm, ...JSON.parse(savedStep1) };
    } catch {
      return emptyForm;
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    let value = e.target.value;

    if (["firstName", "secondName", "lastName"].includes(field)) {
      value = sanitizePersonName(value).slice(0, 50);
    }

    if (field === "nic") {
      value = sanitizeNic(value);
    }

    if (field === "phone") {
      value = sanitizePhoneNumber(value);
    }

    if (field === "email") {
      value = value.trimStart().slice(0, 254);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!isValidPersonName(formData.firstName)) {
      newErrors.firstName =
        "First name can contain only letters, spaces, apostrophes, and hyphens";
    }

    if (formData.secondName.trim() && !isValidPersonName(formData.secondName)) {
      newErrors.secondName =
        "Second name can contain only letters, spaces, apostrophes, and hyphens";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!isValidPersonName(formData.lastName)) {
      newErrors.lastName =
        "Last name can contain only letters, spaces, apostrophes, and hyphens";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(`${formData.dateOfBirth}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxPastDate = new Date(today);
      maxPastDate.setFullYear(today.getFullYear() - 150);

      if (Number.isNaN(dob.getTime()) || dob > today || dob < maxPastDate) {
        newErrors.dateOfBirth = "Please enter a valid date of birth";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.nic.trim()) {
      newErrors.nic = "NIC number is required";
    } else if (!isValidNic(formData.nic)) {
      newErrors.nic = "Invalid NIC format (e.g., 123456789V or 123456789012)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // phone number is optional, but validate if provided
    if (formData.phone.trim()) {
      if (formData.phone.length !== 10) {
        newErrors.phone = "Contact number must have exactly 10 digits";
      } else if (!isValidSriLankanPhoneNumber(formData.phone)) {
        newErrors.phone = "Invalid Sri Lanka contact number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      const cleanedData = {
        ...formData,
        firstName: formData.firstName.trim(),
        secondName: formData.secondName.trim(),
        lastName: formData.lastName.trim(),
        nic: formData.nic.trim().toUpperCase(),
        email: normalizeEmail(formData.email),
        phone: formData.phone.trim(),
      };
      console.log("Step 1 data:", cleanedData);
      sessionStorage.setItem("patientRegStep1", JSON.stringify(cleanedData));
      navigate("/patient-register-2");
    }
  };

  return (
    <>
      <PageHelmet
        title="Patient Registration | Healthify"
        description="Register as a patient on Healthify to securely manage medical records, monitor wellness, and access digital healthcare support."
      />
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              label="First Name"
              value={formData.firstName}
              onChange={handleChange("firstName")}
              error={errors.firstName}
              placeholder="Enter your first name"
              required
              maxLength={50}
              autoComplete="given-name"
            />

            <FormField
              label="Second Name"
              value={formData.secondName}
              onChange={handleChange("secondName")}
              error={errors.secondName}
              placeholder="Enter your second name"
              required={false}
              maxLength={50}
              autoComplete="additional-name"
            />
          </div>

          <FormField
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange("lastName")}
            error={errors.lastName}
            placeholder="Enter your last name"
            required
            maxLength={50}
            autoComplete="family-name"
          />

          <FormField
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange("dateOfBirth")}
            error={errors.dateOfBirth}
            required
            max={todayString}
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
            maxLength={12}
            autoComplete="off"
          />

          <FormField
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
            placeholder="your.email@example.com"
            required
            maxLength={254}
            autoComplete="email"
          />

          <FormField
            label="Contact Number"
            value={formData.phone}
            onChange={handleChange("phone")}
            error={errors.phone}
            placeholder="+94 XX XXX XXXX (optional)"
            required={false}
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel"
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
    </>
  );
}
