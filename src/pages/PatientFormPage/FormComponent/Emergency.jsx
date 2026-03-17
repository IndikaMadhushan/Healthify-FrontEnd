import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import toast from "react-hot-toast";
import {
  isValidPersonName,
  isValidSriLankanPhoneNumber,
  sanitizePersonName,
  sanitizePhoneNumber,
} from "../../../utils/patientProfileValidation";

const initialEmergency = {
  primary: {
    name: "",
    phone: "",
    relationship: ""
  },
  secondary: {
    name: "",
    phone: "",
    relationship: ""
  }
};

const EmergencyContactForm = forwardRef(({ showButton = false, initialData }, ref) => {
  const [form, setForm] = useState(initialEmergency);
  const [errors, setErrors] = useState({});

  const clearFieldError = (section, field) => {
    const errorKeyMap = {
      primary: {
        name: "primaryName",
        phone: "primaryPhone",
      },
      secondary: {
        name: "secondaryName",
        phone: "secondaryPhone",
      },
    };

    const errorKey = errorKeyMap[section]?.[field];
    if (!errorKey) return;

    setErrors((prev) => {
      if (!prev[errorKey]) return prev;

      const nextErrors = { ...prev };
      delete nextErrors[errorKey];
      return nextErrors;
    });
  };

  const handleChange = (section, field) => (e) => {
    let value = e.target.value;

    if (field === "phone") {
      value = sanitizePhoneNumber(value);
    }

    if (field === "name") {
      value = sanitizePersonName(value);
    }

    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    clearFieldError(section, field);
  };

  useEffect(() => {
    if (!initialData) return;

    // The form needs to rehydrate when profile data is loaded or refreshed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      primary: {
        name: initialData.primaryContact?.name || "",
        phone: initialData.primaryContact?.phoneNumber || "",
        relationship: initialData.primaryContact?.relationship || ""
      },
      secondary: {
        name: initialData.secondaryContact?.name || "",
        phone: initialData.secondaryContact?.phoneNumber || "",
        relationship: initialData.secondaryContact?.relationship || ""
      }
    });
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    const validateContactSection = (sectionKey, errorPrefix) => {
      const section = form[sectionKey];
      const hasAnyValue = Object.values(section).some((item) => item.trim());

      if (!hasAnyValue) return;

      if (!section.name.trim()) {
        newErrors[`${errorPrefix}Name`] = "Emergency contact person is required";
      } else if (!isValidPersonName(section.name)) {
        newErrors[`${errorPrefix}Name`] =
          "Emergency contact name can contain only letters, spaces, apostrophes, and hyphens";
      }

      if (!section.phone) {
        newErrors[`${errorPrefix}Phone`] = "Emergency contact number is required";
      } else if (section.phone.length !== 10) {
        newErrors[`${errorPrefix}Phone`] =
          "Contact number must have exactly 10 digits";
      } else if (!isValidSriLankanPhoneNumber(section.phone)) {
        newErrors[`${errorPrefix}Phone`] = "Invalid Sri Lanka contact number";
      }
    };

    validateContactSection("primary", "primary");
    validateContactSection("secondary", "secondary");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validate,
    getData: () => form
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Emergency contacts:", form);
    toast.success("Emergency contact details saved (check console)");
  };

  const inputBase =
    "mt-1 w-full h-10 px-3 rounded-md bg-gray-100 border text-[15px] text-gray-700 " +
    "focus:ring-2 focus:ring-secondary focus:border-secondary transition";

  const withError = (hasError) =>
    hasError
      ? " border-red-500 focus:ring-red-500"
      : " border-gray-300";

  const sectionBox =
    "border border-gray-300 rounded-xl p-5 bg-white shadow-sm";

  const labelCss = "text-[15px] font-semibold text-gray-700";

  const headingCss = "text-lg font-bold text-mainblack mb-4";

  const subHeadingCss = "font-semibold text-[17px] mb-3 text-mainblack";

  return (
    <form onSubmit={handleSubmit} className="text-mainblack space-y-6">
      <h2 className={headingCss}>Emergency Contacts</h2>

      <div className={sectionBox}>
        <h3 className={subHeadingCss}>
          Primary Emergency Contact <span className="text-red-500">*</span>
        </h3>

        <div className="mb-4">
          <label className={labelCss}>Emergency Contact Person *</label>
          <input
            type="text"
            value={form.primary.name}
            onChange={handleChange("primary", "name")}
            className={inputBase + " " + withError(errors.primaryName)}
            placeholder="Enter full name"
          />
          {errors.primaryName && (
            <p className="text-xs text-red-500 mt-1">{errors.primaryName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className={labelCss}>Emergency Contact Number *</label>
          <input
            type="text"
            value={form.primary.phone}
            onChange={handleChange("primary", "phone")}
            inputMode="numeric"
            maxLength={10}
            className={inputBase + " " + withError(errors.primaryPhone)}
            placeholder="Enter contact number"
          />
          {errors.primaryPhone && (
            <p className="text-xs text-red-500 mt-1">{errors.primaryPhone}</p>
          )}
        </div>

        <div>
          <label className={labelCss}>Relationship to Patient (optional)</label>
          <input
            type="text"
            value={form.primary.relationship}
            onChange={handleChange("primary", "relationship")}
            className={inputBase + " border-gray-300"}
            placeholder="Mother, Father, Spouse, Friend"
          />
        </div>
      </div>

      <div className={sectionBox}>
        <h3 className={subHeadingCss}>Secondary Emergency Contact (optional)</h3>

        <div className="mb-4">
          <label className={labelCss}>Emergency Contact Person</label>
          <input
            type="text"
            value={form.secondary.name}
            onChange={handleChange("secondary", "name")}
            className={inputBase + " " + withError(errors.secondaryName)}
            placeholder="Enter full name"
          />
          {errors.secondaryName && (
            <p className="text-xs text-red-500 mt-1">{errors.secondaryName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className={labelCss}>Emergency Contact Number</label>
          <input
            type="text"
            value={form.secondary.phone}
            onChange={handleChange("secondary", "phone")}
            inputMode="numeric"
            maxLength={10}
            className={inputBase + " " + withError(errors.secondaryPhone)}
            placeholder="Enter contact number"
          />
          {errors.secondaryPhone && (
            <p className="text-xs text-red-500 mt-1">{errors.secondaryPhone}</p>
          )}
        </div>

        <div>
          <label className={labelCss}>Relationship to Patient</label>
          <input
            type="text"
            value={form.secondary.relationship}
            onChange={handleChange("secondary", "relationship")}
            className={inputBase + " border-gray-300"}
            placeholder="Sibling, Friend, Neighbour"
          />
        </div>
      </div>

      {showButton && (
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-secondary/90 hover:bg-secondary text-white rounded-full text-[15px] font-semibold"
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
});

export default EmergencyContactForm;
