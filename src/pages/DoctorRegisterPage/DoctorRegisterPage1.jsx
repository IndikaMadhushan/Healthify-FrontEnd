import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationLayout from "../../components/RegistrationLayout";
import FormField from "../../components/FormField";
import RadioGroup from "../../components/RadioGroup";
import FileUpload from "../../components/FileUpload";
import dRegImage1 from "../../assets/d-reg-image1.png";

export default function DoctorRegisterPage1() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    specialization: "",
    hospital: "",
    slmcNumber: "",
    verificationDoc: null
  });

  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ 
          ...prev, 
          verificationDoc: "Only PDF, JPG, or PNG files are allowed" 
        }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ 
          ...prev, 
          verificationDoc: "File size must be less than 5MB" 
        }));
        return;
      }

      setFormData(prev => ({ ...prev, verificationDoc: file }));
      setFileName(file.name);
      setErrors(prev => ({ ...prev, verificationDoc: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.gender) newErrors.gender = "Please select your gender";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
    if (!formData.hospital.trim()) newErrors.hospital = "Hospital/Clinic is required";
    if (!formData.slmcNumber.trim()) newErrors.slmcNumber = "SLMC Number is required";
    if (!formData.verificationDoc) newErrors.verificationDoc = "Verification document is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      sessionStorage.setItem("doctorRegStep1", JSON.stringify({
        ...formData,
        verificationDoc: fileName
      }));
      navigate("/doctor-register-2");
    }
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
          label="Specialization"
          value={formData.specialization}
          onChange={handleChange("specialization")}
          error={errors.specialization}
          placeholder="e.g., Cardiology, Pediatrics"
          required
        />

        <FormField
          label="Hospital/Clinic"
          value={formData.hospital}
          onChange={handleChange("hospital")}
          error={errors.hospital}
          placeholder="Your hospital or clinic name"
          required
        />

        <FormField
          label="SLMC Number"
          value={formData.slmcNumber}
          onChange={handleChange("slmcNumber")}
          error={errors.slmcNumber}
          placeholder="Your SLMC registration number"
          required
        />

        <FileUpload
          label="Upload Verification Document"
          fileName={fileName}
          onChange={handleFileChange}
          error={errors.verificationDoc}
          helperText="Upload your SLMC certificate or medical license"
          required
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