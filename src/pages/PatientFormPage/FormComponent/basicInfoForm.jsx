import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import {
  isValidEmail,
  isValidNic,
  isValidPersonName,
  isValidSriLankanPhoneNumber,
  sanitizeNic,
  sanitizePersonName,
  sanitizePhoneNumber,
} from "../../../utils/patientProfileValidation";

const basic_form = {
  firstName: "",
  secondName: "",
  lastName: "",
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

function calculateAge(dobString) {
  const dob = new Date(dobString);
  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Medical display rules
  if (years === 0 && months === 0) {
    return `${days} days`;
  }

  if (years === 0) {
    return `${months} months ${days} days`;
  }

  return `${years} years ${months} months`;
}

function parseName(initialData) {
  if (
    initialData?.firstName !== undefined ||
    initialData?.secondName !== undefined ||
    initialData?.lastName !== undefined
  ) {
    return {
      firstName: initialData.firstName || "",
      secondName: initialData.secondName || "",
      lastName: initialData.lastName || "",
    };
  }

  const parts = (initialData?.fullName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "", secondName: "", lastName: "" };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], secondName: "", lastName: "" };
  }

  return {
    firstName: parts[0],
    secondName: parts.length > 2 ? parts.slice(1, -1).join(" ") : "",
    lastName: parts[parts.length - 1],
  };
}

const todayString = new Date().toISOString().split("T")[0];

const BasicInfoForm = forwardRef(({
  showButton = false,
  onNext,
  initialData,
  readOnly = false
}, ref) => {
  const [form, setForm] = useState(basic_form);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (!initialData) return;

    const nameData = parseName(initialData);

    // The form needs to rehydrate when profile data is loaded or refreshed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      firstName: nameData.firstName,
      secondName: nameData.secondName,
      lastName: nameData.lastName,
      dob: initialData.dateOfBirth || "",
      age: initialData.dateOfBirth
        ? calculateAge(initialData.dateOfBirth)
        : "",
      gender: typeof initialData.gender === "string"
        ? initialData.gender.toLowerCase()
        : "",
      nationality: initialData.nationality || "",
      maritalStatus: typeof initialData.maritalStatus === "string"
        ? initialData.maritalStatus.toLowerCase()
        : "",
      occupation: initialData.occupation || "",
      address: initialData.address || "",
      mainCity: initialData.district || "",
      contactNumber: initialData.phone || "",
      email: initialData.email || "",
      nationalId: initialData.nic || ""
    });
  }, [initialData]);



  const validateAll = () => {
    const newErrors = {};


    if (!form.firstName.trim()) {
      newErrors["basic.firstName"] = "First name is required";
    } else if (!isValidPersonName(form.firstName)) {
      newErrors["basic.firstName"] =
        "First name can contain only letters, spaces, apostrophes, and hyphens";
    }

    if (form.secondName.trim() && !isValidPersonName(form.secondName)) {
      newErrors["basic.secondName"] =
        "Second name can contain only letters, spaces, apostrophes, and hyphens";
    }

    if (!form.lastName.trim()) {
      newErrors["basic.lastName"] = "Last name is required";
    } else if (!isValidPersonName(form.lastName)) {
      newErrors["basic.lastName"] =
        "Last name can contain only letters, spaces, apostrophes, and hyphens";
    }

    if (!form.dob) {
      newErrors["basic.dob"] = "Date of birth is required";
    } else {
      const dob = new Date(`${form.dob}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const maxPastDate = new Date(today);
      maxPastDate.setFullYear(today.getFullYear() - 150);

      if (Number.isNaN(dob.getTime()) || dob > today || dob < maxPastDate) {
        newErrors["basic.dob"] = "Please enter a valid date of birth";
      }
    }

    if (!form.gender) newErrors["basic.gender"] = "Gender is required";
    if (!form.nationality) newErrors["basic.nationality"] = "Nationality is required";
    if (!form.occupation.trim()) newErrors["basic.occupation"] = "Occupation is required";
    if (form.occupation.trim().length > 100) {
      newErrors["basic.occupation"] = "Occupation must be 100 characters or less";
    }
    if (!form.address.trim()) newErrors["basic.address"] = "Address is required";
    if (form.address.trim().length > 255) {
      newErrors["basic.address"] = "Address must be 255 characters or less";
    }
    if (!form.mainCity) newErrors["basic.mainCity"] = "District is required";
    if (!form.maritalStatus) newErrors["basic.maritalStatus"] = "Marital status is required";
    if (!form.nationalId) newErrors["basic.nationalId"] = "NIC number is required";

    if (!form.nationalId.trim()) {
      newErrors["basic.nationalId"] = "NIC number is required";
    } else if (!isValidNic(form.nationalId)) {
      newErrors["basic.nationalId"] =
        "Invalid NIC format (e.g., 123456789V or 123456789012)";
    }

    // EMAIL REQUIRED + FORMAT
    if (!form.email.trim()) {
      newErrors["basic.email"] = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newErrors["basic.email"] = "Invalid email address";
    }

    //contact validation
    if (!form.contactNumber) {
      newErrors["basic.contactNumber"] = "Contact number is required";
    } else if (form.contactNumber.length !== 10) {
      newErrors["basic.contactNumber"] =
        "Contact number must have exactly 10 digits";
    } else if (!isValidSriLankanPhoneNumber(form.contactNumber)) {
      newErrors["basic.contactNumber"] = "Invalid Sri Lanka contact number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validate: validateAll,
    getData: () => form
  }));

  const clearFieldError = (field) => {
    const errorKey = `basic.${field}`;

    setErrors((prev) => {
      if (!prev[errorKey]) return prev;

      const nextErrors = { ...prev };
      delete nextErrors[errorKey];
      return nextErrors;
    });
  };

  const handleChange = (field) => (e) => {
    let value = e.target.value;

    if (["firstName", "secondName", "lastName"].includes(field)) {
      value = sanitizePersonName(value);
    }

    if (field === "contactNumber") {
      value = sanitizePhoneNumber(value);
    }

    if (field === "nationalId") {
      value = sanitizeNic(value);
    }

    if (field === "email") {
      value = value.trimStart().slice(0, 254);
    }

    if (field === "occupation") {
      value = value.slice(0, 100);
    }

    if (field === "address") {
      value = value.slice(0, 255);
    }

    setForm((prev) => {
      if (field === "dob") {
        return {
          ...prev,
          dob: value,
          age: value ? calculateAge(value) : ""
        };
      }
      return { ...prev, [field]: value };
    });

    clearFieldError(field);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = validateAll();
    if (!ok) return;

    console.log("Valid form:", form);


    onNext();
  };


  const inputBase =
    "mt-1 w-full h-10 px-3 rounded-md bg-gray-100 border text-[15px] text-gray-700 " +
    "focus:ring-2 focus:ring-secondary focus:border-secondary transition outline-none border-gray-300";

  const withError = (key) =>
    errors[key]
      ? " border-red-500 focus:ring-red-500"
      : " border-gray-300";

  const labelCss = "text-[15px] font-semibold text-gray-700";
  const sectionHeading = "text-xl font-bold text-mainblack mb-4";
  const choiceInputClass =
    "h-4 w-4 shrink-0 accent-blue-600 disabled:opacity-100 disabled:cursor-not-allowed";

  return (
    <div className="text-mainblack">

      <h2 className={sectionHeading}>Basic Information</h2>

      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <fieldset disabled={readOnly} className="grid grid-cols-1 gap-4">

        {/* Full name */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="px-2">
            <label className={labelCss}>First Name *</label>
            <input
              type="text"
              value={form.firstName}
              onChange={handleChange("firstName")}
              maxLength={50}
              className={inputBase + " " + withError("basic.firstName")}
            />
            {errors["basic.firstName"] && (
              <p className="text-red-500 text-xs mt-1">{errors["basic.firstName"]}</p>
            )}
          </div>

          <div className="px-2">
            <label className={labelCss}>Second Name</label>
            <input
              type="text"
              value={form.secondName}
              onChange={handleChange("secondName")}
              maxLength={50}
              className={inputBase + " " + withError("basic.secondName")}
            />
            {errors["basic.secondName"] && (
              <p className="text-red-500 text-xs mt-1">{errors["basic.secondName"]}</p>
            )}
          </div>
        </div>

        <div className="px-2">
          <label className={labelCss}>Last Name *</label>
          <input
            type="text"
            value={form.lastName}
            onChange={handleChange("lastName")}
            maxLength={50}
            className={inputBase + " " + withError("basic.lastName")}
          />
          {errors["basic.lastName"] && (
            <p className="text-red-500 text-xs mt-1">{errors["basic.lastName"]}</p>
          )}
        </div>

        {/* DOB */}
        <div className="px-2">
          <label className={labelCss}>Date of Birth *</label>
          <input
            type="date"
            max={todayString}
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
            readOnly
            className={inputBase + " bg-gray-100 cursor-not-allowed"}
          />

        </div>

        {/* Gender */}
        <div className="px-2">
          <label className={labelCss}>Gender *</label>
          <div className="mt-1 flex gap-6 ml-4 text-[15px] text-gray-700">
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="male"
                checked={form.gender === "male"} onChange={handleChange("gender")} className={`${choiceInputClass} ${withError("basic.gender")}`} /> Male
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="female"
                checked={form.gender === "female"} onChange={handleChange("gender")} className={`${choiceInputClass} ${withError("basic.gender")}`} /> Female
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="other"
                checked={form.gender === "other"} onChange={handleChange("gender")} className={`${choiceInputClass} ${withError("basic.gender")}`} /> Other
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
            className={inputBase + " border-gray-300" + " " + withError("basic.nationality")}
          >
            <option value="">Select nationality</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
            <option value="Muslim">Muslim</option>
            <option value="Other">Other</option>
          </select>
          {errors["basic.nationality"] && (
            <p className="text-red-500 text-xs mt-1">{errors["basic.nationality"]}</p>
          )}
        </div>

        {/* Marital Status */}
        <div className="px-2">
          <label className={labelCss}>Marital Status *</label>
          <div className="mt-1 flex gap-6 ml-4 text-[15px] text-gray-700">
            <label className="flex items-center gap-2">
              <input type="radio" name="status" value="married"
                checked={form.maritalStatus === "married"}
                onChange={handleChange("maritalStatus")} className={choiceInputClass} /> Married
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="status" value="unmarried"
                checked={form.maritalStatus === "unmarried"}
                onChange={handleChange("maritalStatus")} className={choiceInputClass} /> Unmarried
            </label>
          </div>
          {errors["basic.maritalStatus"] && (
            <p className="text-red-500 text-xs mt-1 ml-4">
              {errors["basic.maritalStatus"]}
            </p>
          )}
        </div>

        {/* NIC */}
        <div className="px-2">
          <label className={labelCss}>NIC *</label>
          <input
            type="text"
            value={form.nationalId}
            onChange={handleChange("nationalId")}
            maxLength={12}
            className={inputBase + " " + withError("basic.nationalId")}
          />
          {errors["basic.nationalId"] && (
            <p className="text-red-500 text-xs mt-1">{errors["basic.nationalId"]}</p>
          )}
        </div>

        {/* OCCUPATION */}
        <div className="px-2">
          <label className={labelCss}>Occupation *</label>
          <input
            type="text"
            value={form.occupation}
            onChange={handleChange("occupation")}
            maxLength={100}
            className={inputBase + " " + withError("basic.occupation")}
          />
          {errors["basic.occupation"] && (
            <p className="text-red-500 text-xs mt-1">{errors["basic.occupation"]}</p>
          )}
        </div>

        {/* ADDRESS */}
        <div className="px-2">
          <label className={labelCss}>Address *</label>
          <input
            type="text"
            value={form.address}
            onChange={handleChange("address")}
            maxLength={255}
            className={inputBase + " " + withError("basic.address")}
          />
          {errors["basic.address"] && (
            <p className="text-red-500 text-xs mt-1">{errors["basic.address"]}</p>
          )}
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
              "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle",
              "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu",
              "Trincomalee", "Batticaloa", "Ampara", "Kurunegala", "Puttalam", "Anuradhapura",
              "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle"
            ].map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
          {errors["basic.mainCity"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["basic.mainCity"]}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="px-2">
          <label className={labelCss}>Contact *</label>
          <input
            type="text"
            value={form.contactNumber}
            onChange={handleChange("contactNumber")}
            inputMode="numeric"
            maxLength={10}
            className={inputBase + " " + withError("basic.contactNumber")}
          />
          {errors["basic.contactNumber"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["basic.contactNumber"]}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="px-2">
          <label className={labelCss}>EMAIL *</label>
          <input
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            maxLength={254}
            className={inputBase + " " + withError("basic.email")}
          />
          {errors["basic.email"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["basic.email"]}
            </p>
          )}
        </div>

        {/* Submit */}
        {/* {showButton && (
          <div className="px-2 mt-2 flex justify-end">
            <button
              type="button"
              className="px-8 py-3 bg-secondary/90 hover:bg-secondary text-white rounded-full text-[17px] font-semibold"
              onClick={() => {
                const ok = validateAll();   
                if (ok) {
                  onNext();              
                }
              }}
            >
              Next
            </button>
          </div>
        )} */}

        {/* Submit */}
        {showButton && !readOnly && (
          <div className="px-2 mt-2 flex justify-end">
            <button
              type="button"
              className="px-8 py-3 bg-secondary/90 hover:bg-secondary text-white rounded-full text-[17px] font-semibold"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        )}

        </fieldset>

      </form>
    </div>
  );
}
);

export default BasicInfoForm;
