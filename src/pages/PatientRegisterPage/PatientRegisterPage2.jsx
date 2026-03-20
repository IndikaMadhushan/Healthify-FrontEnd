import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHelmet from "../../components/PageHelmet";
import RegistrationLayout from "../../components/RegistrationLayout";
import PasswordInput from "../../components/PasswordInput";
import pRegImage2 from "../../assets/p-reg-image2.png";
import { registerPatientApi } from "../../api/authApi";
import toast from "react-hot-toast";
import { getNameParts } from "../../utils/nameUtils";
import { getPasswordValidationMessage } from "../../utils/patientProfileValidation";

export default function PatientRegisterPage2() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const step1Data = sessionStorage.getItem("patientRegStep1");

    if (!step1Data) {
      navigate("/patient-register-1", { replace: true });
    }
  }, [navigate]);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

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

    const passwordError = getPasswordValidationMessage(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
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
    navigate("/patient-register-1");
  };

  const handleFinish = async () => {
    if (!validate()) return;

    setLoading(true);

    const step1Data = JSON.parse(
      sessionStorage.getItem("patientRegStep1") || "{}",
    );
    const { fullName: _FULL_NAME, ...rest } = step1Data;
    const nameParts = getNameParts(step1Data);

    const payload = {
      ...rest,
      firstName: nameParts.firstName,
      secondName: nameParts.secondName || undefined,
      lastName: nameParts.lastName,
      password: formData.password,
    };

    try {
      await registerPatientApi(payload);

      console.log(
        "Patient registered successfully. Redirecting to OTP page...",
      );

      sessionStorage.removeItem("patientRegStep1");

      navigate("/verify-otp", {
        replace: true,
        state: { email: payload.email },
      });
    } catch (error) {
      const message = getApiErrorMessage(error, "Patient registration failed!");
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getApiErrorMessage = (error, fallbackMessage) => {
    const data = error?.response?.data;

    if (typeof data === "string") return data;
    if (typeof data?.message === "string") return data.message;
    if (typeof data?.error === "string") return data.error;

    if (Array.isArray(data?.errors)) {
      const messages = data.errors
        .map((item) => (typeof item === "string" ? item : item?.message))
        .filter(Boolean);

      if (messages.length) return messages.join(", ");
    }

    if (typeof error?.message === "string") return error.message;

    return fallbackMessage;
  };

  return (
    <>
      <PageHelmet
        title="Complete Patient Registration | Healthify"
        description="Complete your Healthify patient registration to start tracking health data, storing records, and accessing secure digital healthcare features."
      />
      <RegistrationLayout image={pRegImage2} imageAlt="Patient Registration">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-mainblack">
            Patient Registration
          </h1>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-300"></span>
            <span className="w-3 h-3 rounded-full bg-secondary"></span>
          </div>
        </div>

        <div className="space-y-5">
          <PasswordInput
            label="Password"
            value={formData.password}
            onChange={handleChange("password")}
            error={errors.password}
            placeholder="Enter your password"
            required
            maxLength={64}
            autoComplete="new-password"
          />

          <PasswordInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={errors.confirmPassword}
            placeholder="Re-enter your password"
            required
            maxLength={64}
            autoComplete="new-password"
          />

          <div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreedToTerms}
                onChange={handleChange("agreedToTerms")}
                className="mt-1 w-4 h-4 text-secondary rounded"
              />
              <span className="text-sm text-gray-700">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => window.open("/terms", "_blank")}
                  className="text-secondary hover:underline"
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => window.open("/privacy", "_blank")}
                  className="text-secondary hover:underline"
                >
                  Privacy Policy
                </button>
              </span>
            </label>
            {errors.agreedToTerms && (
              <p className="text-xs text-red-500 mt-1">
                {errors.agreedToTerms}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleFinish}
              disabled={loading || !formData.agreedToTerms}
              className="flex-1 px-6 py-3 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/90 transition disabled:opacity-50"
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
    </>
  );
}
