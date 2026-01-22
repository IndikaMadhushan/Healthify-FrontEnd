import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationLayout from "../../components/RegistrationLayout";
import PasswordInput from "../../components/PasswordInput";
import FileUpload from "../../components/FileUpload";
import pRegImage2 from "../../assets/p-reg-image2.png";
import { registerDoctorApi } from "../../api/authApi";

export default function DoctorRegisterPage2() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationDoc, setVerificationDoc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [agreedToApproval, setAgreedToApproval] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const step1Data = sessionStorage.getItem("doctorRegStep1");
    if (!step1Data) {
      navigate("/doctor-register-1", { replace: true });
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVerificationDoc(file);
    setFileName(file.name);

    if (errors.verificationDoc) {
      setErrors((prev) => ({ ...prev, verificationDoc: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!verificationDoc) {
      newErrors.verificationDoc = "Verification document is required";
    }

    if (!agreedToApproval) {
      newErrors.agreedToApproval =
        "You must acknowledge the approval process";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinish = async () => {
    if (!validate()) return;

    setLoading(true);

    const step1Data = JSON.parse(
      sessionStorage.getItem("doctorRegStep1") || "{}"
    );

    const formData = new FormData();
    Object.entries(step1Data).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("password", password);
    formData.append("verificationDoc", verificationDoc);

    try {
      await registerDoctorApi(formData);

      console.log("Doctor registered successfully. Redirecting to OTP page...");

      // Get email from step1 data
      const userEmail = step1Data.email;

      // Clean step1 data
      sessionStorage.removeItem("doctorRegStep1");

      // Redirect to OTP page with email and userType
      navigate("/verify-otp", {
        replace: true,
        state: { 
          email: userEmail,
          userType: "doctor"  // Add userType to differentiate
        }
      });

    } catch (error) {
      const message = error.response?.data?.message || "Doctor registration failed!";
      alert(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegistrationLayout image={pRegImage2} imageAlt="Doctor Registration">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-mainblack">
          Doctor Registration
        </h1>
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-gray-300"></span>
          <span className="w-3 h-3 rounded-full bg-secondary"></span>
        </div>
      </div>

      <div className="space-y-5">
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="Enter your password"
          required
        />

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
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

        {/* APPROVAL CONFIRMATION */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToApproval}
              onChange={(e) => setAgreedToApproval(e.target.checked)}
              className="mt-1 w-4 h-4 text-secondary focus:ring-secondary rounded"
            />
            <span className="text-sm text-gray-700">
              I understand that my account will remain{" "}
              <strong>inactive</strong> until verified and approved by the
              administrator.
            </span>
          </label>

          {errors.agreedToApproval && (
            <p className="text-xs text-red-500 mt-1">
              {errors.agreedToApproval}
            </p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/doctor-register-1")}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleFinish}
            disabled={loading || !agreedToApproval}
            className="flex-1 px-6 py-3 bg-secondary text-white rounded-full font-semibold
                       hover:bg-secondary/90 transition transform hover:scale-105
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Processing..." : "Finish"}
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