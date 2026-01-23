import { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";

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


const BasicInfoForm = forwardRef(({ showButton=false,onNext }, ref) => {
  const [form, setForm] = useState(basic_form);
  const [errors, setErrors] = useState({});

  const validateAll = () => {
  const newErrors = {};


  if (!form.fullName.trim()) newErrors["basic.fullName"] = "Full name is required";
  if (!form.dob) {
      newErrors["basic.dob"] = "Date of birth is required";
    } else {
      const dob = new Date(form.dob);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 0 || age > 150) {
        newErrors["basic.dob"] = "Please enter a valid date of birth";
      }
  }

  if (!form.gender) newErrors["basic.gender"] = "Gender is required";
  if (!form.nationality) newErrors["basic.nationality"] = "Nationality is required";
  if (!form.occupation) newErrors["basic.occupation"] = "Occupation is required";
  if (!form.address) newErrors["basic.address"] = "Address is required";
  if (!form.mainCity) newErrors["basic.mainCity"] = "District is required";
  if (!form.maritalStatus) newErrors["basic.maritalStatus"] = "Marital status is required";
  if (!form.nationalId) newErrors["basic.nationalId"] = "NIC number is required";

  if (!form.nationalId.trim()) {
      newErrors["basic.nationalId"] = "NIC number is required";
    } else if (
      !/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(form.nationalId.trim())
    ) {
      newErrors["basic.nationalId"] =
        "Invalid NIC format (e.g., 123456789V or 123456789012)";
  }

  // EMAIL REQUIRED + FORMAT
  if (!form.email) {
    newErrors["basic.email"] = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    newErrors["basic.email"] = "Invalid email address";
  }

  //contact validation
if (!form.contactNumber) {
  newErrors["basic.contactNumber"] = "Contact number is required";
} else {
  const number = form.contactNumber;

  // Must be exactly 10 digits
  if (!/^\d{10}$/.test(number)) {
    newErrors["basic.contactNumber"] = "Contact number must have exactly 10 digits";
  } else {
    // Allowed Sri Lanka prefixes
    const validPrefixes = [
      // Colombo
      "011",

      // Gampaha
      "031", "033",

      // Kalutara
      "034", "038",

      // Avissawella
      "036",

      // Central
      "054", "081",

      // Nuwara Eliya
      "051", "052",

      // Matale
      "066",

      // Southern
      "091", "041", "047",

      // North Western
      "032", "037",

      // Northern
      "021", "023", "024",

      // Eastern
      "063", "067", "065", "026",

      // North Central
      "025", "027",

      // Uva
      "055", "057",

      // Sabaragamuwa
      "045", "035",

      // Mobile
      "070", "071", "072", "074",
      "075", "076", "077", "078"
    ];

    const prefix = number.substring(0, 3);

    if (!validPrefixes.includes(prefix)) {
      newErrors["basic.contactNumber"] = "Invalid Sri Lanka contact number";
    }
  }
}

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

    useImperativeHandle(ref, () => ({
      validate: validateAll,
      getData: () => form
    }));

  // const handleChange = (field) => (e) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     [field]: e.target.value
  //   }));
  // };

const handleChange = (field) => (e) => {
  const value = e.target.value;

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
                checked={form.gender === "male"} onChange={handleChange("gender")} className={withError("basic.gender")}/> Male
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="female"
                checked={form.gender === "female"} onChange={handleChange("gender")} className={withError("basic.gender")} /> Female
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="other"
                checked={form.gender === "other"} onChange={handleChange("gender")} className={withError("basic.gender")} /> Other
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

        {/* OCCUPATION */}
        <div className="px-2">
          <label className={labelCss}>Occupation *</label>
          <input
            type="text"
            value={form.occupation}
            onChange={handleChange("occupation")}
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
            <p className="text-red-500 text-xs mt-1">
              {errors["basic.contactNumber"]}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="px-2">
          <label className={labelCss}>EMAIL *</label>
          <input
            type="text"
            value={form.email}
            onChange={handleChange("email")}
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
        {showButton && (
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
        
      </form>
    </div>
  );
}
);

export default BasicInfoForm;