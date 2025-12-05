import { useState } from "react";

const basic_form = {
  fullName: "",
  dob: "",
  age: "",
  gender: "",
  nationality: "",
  maritalStatus: "",
  occupation: "",
  address: "",
  mainCity: "",
  contactNumber: "",
  email: "",
  nationalId: ""
};

export default function BasicInfoForm() {
  const [form, setForm] = useState(basic_form);
  const [errors, setErrors] = useState({});

  const validateAll = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors["basic.fullName"] = "Full name is required";
    if (!form.dob) newErrors["basic.dob"] = "Date of birth is required";
    if (!form.age) newErrors["basic.age"] = "Age is required";
    if (!form.gender) newErrors["basic.gender"] = "Gender is required";
    if (!form.contactNumber) newErrors["basic.contactNumber"] = "Contact number required";
    if (!form.nationalId) newErrors["basic.nationalId"] = "NIC number required";
    if (form.mainCity == "") newErrors["basic.mainCity"] = "District is required";

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) newErrors["basic.email"] = "Invalid email";

    if (form.contactNumber && !/^[0-9()+-\s]+$/.test(form.contactNumber))
      newErrors["basic.contactNumber"] = "Invalid phone";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = validateAll();
    if (!ok) return;

    console.log("Valid form:", form);
    alert("Form valid (frontend only)");
  };

  /** -------------------
      MODERN UI STYLES
  -------------------- */
  const inputBase =
    "mt-1 w-full h-10 px-3 rounded-md bg-gray-100 border text-[15px] text-gray-700 " +
    "focus:ring-2 focus:ring-secondary focus:border-secondary transition outline-none";

  const withError = (key) =>
    errors[key]
      ? " border-red-500 focus:ring-red-500"
      : " border-gray-300";

  const labelCss = "text-[15px] font-semibold text-gray-700";
  const sectionHeading = "text-xl font-bold text-mainblack mb-4";

  return (
    <div className="text-mainblack">
      
      <h2 className={sectionHeading}>Basic Information</h2>

      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>

        {/* Full name */}
        <div className="px-2">
          <label className={labelCss}>Full Name *</label>
          <input
            type="text"
            value={form.fullName}
            onChange={handleChange("fullName")}
            className={inputBase + " " + withError("basic.fullName")}
          />
          {errors["basic.fullName"] && (
            <p className="text-red-500 text-xs mt-1">{errors["basic.fullName"]}</p>
          )}
        </div>

        {/* DOB */}
        <div className="px-2">
          <label className={labelCss}>Date of Birth *</label>
          <input
            type="date"
            value={form.dob}
            onChange={handleChange("dob")}
            className={inputBase + " " + withError("basic.dob")}
          />
          {errors["basic.dob"] && (
            <p className="text-red-500 text-xs mt-1">{errors["basic.dob"]}</p>
          )}
        </div>

        {/* Age */}
        <div className="px-2">
          <label className={labelCss}>Age *</label>
          <input
            type="text"
            value={form.age}
            onChange={handleChange("age")}
            className={inputBase + " " + withError("basic.age")}
          />
          {errors["basic.age"] && (
            <p className="text-red-500 text-xs mt-1">{errors["basic.age"]}</p>
          )}
        </div>

        {/* Gender */}
        <div className="px-2">
          <label className={labelCss}>Gender *</label>
          <div className="mt-1 flex gap-6 ml-4 text-[15px] text-gray-700">
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="male"
                checked={form.gender === "male"} onChange={handleChange("gender")} /> Male
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="female"
                checked={form.gender === "female"} onChange={handleChange("gender")} /> Female
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="other"
                checked={form.gender === "other"} onChange={handleChange("gender")} /> Other
            </label>
          </div>
          {errors["basic.gender"] && (
            <p className="text-red-500 text-xs mt-1 ml-4">{errors["basic.gender"]}</p>
          )}
        </div>

        {/* Nationality */}
        <div className="px-2">
          <label className={labelCss}>Nationality *</label>
          <select
            value={form.nationality}
            onChange={handleChange("nationality")}
            className={inputBase + " border-gray-300"}
          >
            <option value="">Select nationality</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
            <option value="Muslim">Muslim</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="px-2">
          <label className={labelCss}>Marital Status *</label>
          <div className="mt-1 flex gap-6 ml-4 text-[15px] text-gray-700">
            <label className="flex items-center gap-2">
              <input type="radio" name="status" value="married"
                checked={form.maritalStatus === "married"}
                onChange={handleChange("maritalStatus")} /> Married
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="status" value="unmarried"
                checked={form.maritalStatus === "unmarried"}
                onChange={handleChange("maritalStatus")} /> Unmarried
            </label>
          </div>
        </div>

        {/* NIC */}
        <div className="px-2">
          <label className={labelCss}>NIC *</label>
          <input
            type="text"
            value={form.nationalId}
            onChange={handleChange("nationalId")}
            className={inputBase + " " + withError("basic.nationalId")}
          />
          {errors["basic.nationalId"] && (
            <p className="text-red-500 text-xs mt-1">{errors["basic.nationalId"]}</p>
          )}
        </div>

        {/* Occupation */}
        <div className="px-2">
          <label className={labelCss}>Occupation</label>
          <input
            type="text"
            value={form.occupation}
            onChange={handleChange("occupation")}
            className={inputBase}
          />
        </div>

        {/* Address */}
        <div className="px-2">
          <label className={labelCss}>Address</label>
          <input
            type="text"
            value={form.address}
            onChange={handleChange("address")}
            className={inputBase}
          />
        </div>

        {/* District */}
        <div className="px-2">
          <label className={labelCss}>District *</label>
          <select
            value={form.mainCity}
            onChange={handleChange("mainCity")}
            className={inputBase + " " + withError("basic.mainCity")}
          >
            <option value="">Select district</option>
            {[
              "Colombo","Gampaha","Kalutara","Kandy","Matale","Nuwara Eliya","Galle",
              "Matara","Hambantota","Jaffna","Kilinochchi","Mannar","Vavuniya","Mullaitivu",
              "Trincomalee","Batticaloa","Ampara","Kurunegala","Puttalam","Anuradhapura",
              "Polonnaruwa","Badulla","Monaragala","Ratnapura","Kegalle"
            ].map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>

        {/* Contact */}
        <div className="px-2">
          <label className={labelCss}>Contact *</label>
          <input
            type="text"
            value={form.contactNumber}
            onChange={handleChange("contactNumber")}
            className={inputBase + " " + withError("basic.contactNumber")}
          />
          {errors["basic.contactNumber"] && (
            <p className="text-red-500 text-xs mt-1">{errors["basic.contactNumber"]}</p>
          )}
        </div>

        {/* Email */}
        <div className="px-2">
          <label className={labelCss}>Email</label>
          <input
            type="text"
            value={form.email}
            onChange={handleChange("email")}
            className={inputBase + " " + withError("basic.email")}
          />
          {errors["basic.email"] && (
            <p className="text-red-500 text-xs mt-1">{errors["basic.email"]}</p>
          )}
        </div>

        {/* Submit */}
        <div className="px-2 mt-2">
          <button type="submit" className="px-5 py-2 bg-secondary/90 hover:bg-secondary text-white rounded-md text-[15px] font-semibold">
            Save
          </button>
        </div>

      </form>
    </div>
  );
}