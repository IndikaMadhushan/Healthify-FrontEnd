import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationLayout from "../../components/RegistrationLayout";
import PasswordInput from "../../components/PasswordInput";
import dRegImage2 from "../../assets/d-reg-image2.png";

export default function DoctorRegisterPage2() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    agreedToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const step1Data = sessionStorage.getItem("doctorRegStep1");
    if (!step1Data) {
      navigate("/doctor-register-1");
    }
  }, [navigate]);

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    navigate("/doctor-register-1");
  };

  const handleFinish = async () => {
    if (!validate()) return;

    setLoading(true);

    const step1Data = JSON.parse(sessionStorage.getItem("doctorRegStep1") || "{}");

    const completeData = {
      ...step1Data,
      password: formData.password
    };

    setTimeout(() => {
      console.log("Doctor Registration data:", completeData);
      sessionStorage.removeItem("doctorRegStep1");
      alert("Registration successful! Redirecting to login...");
      setLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <RegistrationLayout image={dRegImage2} imageAlt="Doctor Registration">
      <h1 className="text-2xl lg:text-3xl font-bold text-mainblack mb-6">
        Doctor Registration
      </h1>

      <div className="space-y-5">
        <PasswordInput
          label="Password"
          value={formData.password}
          onChange={handleChange("password")}
          error={errors.password}
          placeholder="Enter your password"
          required
        />

        <PasswordInput
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          required
        />

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <span className="text-green-600 text-lg">ℹ</span>
            <div className="text-sm text-green-800">
              <p className="font-semibold mb-1">Account Verification Required</p>
              <p className="text-xs">
                Your account will be activated after document verification (24-48 hours). 
                You will receive an email once approved.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreedToTerms}
              onChange={handleChange("agreedToTerms")}
              className="mt-1 w-4 h-4 text-secondary focus:ring-secondary rounded"
            />
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <button
                type="button"
                onClick={() => window.open("/terms", "_blank")}
                className="text-secondary hover:underline"
              >
                Terms & Conditions
              </button>
              {" "}and{" "}
              <button
                type="button"
                onClick={() => window.open("/privacy", "_blank")}
                className="text-secondary hover:underline"
              >
                Private Policy
              </button>
            </span>
          </label>
          {errors.agreedToTerms && (
            <p className="text-xs text-red-500 mt-1">{errors.agreedToTerms}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleFinish}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/90 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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