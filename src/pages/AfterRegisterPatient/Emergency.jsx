import { useState } from "react";

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

export default function EmergencyContactForm() {
  const [form, setForm] = useState(initialEmergency);
  const [errors, setErrors] = useState({});

  const handleChange = (section, field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.primary.name.trim()) {
      newErrors.primaryName = "Emergency contact person is required";
    }
    if (!form.primary.phone.trim()) {
      newErrors.primaryPhone = "Emergency contact number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Emergency contacts:", form);
    alert("Emergency contact details saved (check console)");
  };

  /** --------------------
      NEW STYLING CLASSES
  ---------------------- **/
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

      {/* Main Heading */}
      <h2 className={headingCss}>Emergency Contacts</h2>

      {/* -------------------- PRIMARY CONTACT -------------------- */}
      <div className={sectionBox}>
        <h3 className={subHeadingCss}>
          Primary Emergency Contact <span className="text-red-500">*</span>
        </h3>

        {/* Name */}
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

        {/* Phone */}
        <div className="mb-4">
          <label className={labelCss}>Emergency Contact Number *</label>
          <input
            type="text"
            value={form.primary.phone}
            onChange={handleChange("primary", "phone")}
            className={inputBase + " " + withError(errors.primaryPhone)}
            placeholder="Enter contact number"
          />
          {errors.primaryPhone && (
            <p className="text-xs text-red-500 mt-1">{errors.primaryPhone}</p>
          )}
        </div>

        {/* Relationship */}
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

      {/* -------------------- SECONDARY CONTACT -------------------- */}
      <div className={sectionBox}>
        <h3 className={subHeadingCss}>Secondary Emergency Contact (optional)</h3>

        {/* Name */}
        <div className="mb-4">
          <label className={labelCss}>Emergency Contact Person</label>
          <input
            type="text"
            value={form.secondary.name}
            onChange={handleChange("secondary", "name")}
            className={inputBase + " border-gray-300"}
            placeholder="Enter full name"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className={labelCss}>Emergency Contact Number</label>
          <input
            type="text"
            value={form.secondary.phone}
            onChange={handleChange("secondary", "phone")}
            className={inputBase + " border-gray-300"}
            placeholder="Enter contact number"
          />
        </div>

        {/* Relationship */}
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

      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 bg-secondary/90  hover:bg-secondary text-white rounded-full text-[15px] font-semibold"
        >
          Save
        </button>
      </div>
    </form>
  );
}