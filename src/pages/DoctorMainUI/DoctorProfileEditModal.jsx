// import React, { useState } from "react";

// const DoctorProfileEditModal = ({ doctor, onClose, onSave }) => {

//   const [formData, setFormData] = useState({
//     fullName: doctor.fullName || "",
//     gender: doctor.gender || "",
//     dateOfBirth: doctor.dateOfBirth || "",
//     nic: doctor.nic || "",
//     hospital: doctor.hospital || "",
//     specialization: doctor.specialization || "",
//     licenseNumber: doctor.licenseNumber || ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

//       <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

//         <h2 className="text-lg font-semibold text-secondary mb-4">
//           Edit Profile
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className="w-full border rounded-lg p-2"
//           />

//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-2"
//           >
//             <option value="">Select Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//           </select>

//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-2"
//           />

//           <input
//             type="text"
//             name="nic"
//             value={formData.nic}
//             onChange={handleChange}
//             placeholder="NIC"
//             className="w-full border rounded-lg p-2"
//           />

//           <input
//             type="text"
//             name="hospital"
//             value={formData.hospital}
//             onChange={handleChange}
//             placeholder="Hospital"
//             className="w-full border rounded-lg p-2"
//           />

//           <input
//             type="text"
//             name="specialization"
//             value={formData.specialization}
//             onChange={handleChange}
//             placeholder="Specialization"
//             className="w-full border rounded-lg p-2"
//           />

//           <input
//             type="text"
//             name="licenseNumber"
//             value={formData.licenseNumber}
//             onChange={handleChange}
//             placeholder="SLMC Number"
//             className="w-full border rounded-lg p-2"
//           />

//           <div className="flex justify-end gap-3 pt-2">

//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-lg bg-gray-200"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="px-4 py-2 rounded-lg bg-secondary text-white"
//             >
//               Save
//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// };

// export default DoctorProfileEditModal;
import React, { useState } from "react";
import { updateMyProfile } from "../../api/DoctorApi";

const DoctorProfileEditModal = ({ doctor, onClose, onUpdated }) => {

  const [formData, setFormData] = useState({
    fullName: doctor.fullName || "",
    gender: doctor.gender || "",
    dateOfBirth: doctor.dateOfBirth || "",
    hospital: doctor.hospital || "",
    specialization: doctor.specialization || "",
    licenseNumber: doctor.licenseNumber || ""
  });

  const SPECIALIZATIONS = [
  "General Practice",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Psychiatry",
  "Surgery",
  "Orthopedics",
  "Gynecology",
  "Obstetrics",
  "Ophthalmology",
  "Otolaryngology (ENT)",
  "Urology",
  "Nephrology",
  "Endocrinology",
  "Gastroenterology",
  "Pulmonology",
  "Hematology",
  "Oncology",
  "Radiology",
  "Anesthesiology",
  "Emergency Medicine",
  "Family Medicine",
  "Infectious Diseases",
  "Rheumatology",
  "Plastic Surgery",
  "Thoracic Surgery",
  "Vascular Surgery",
  "Pathology",
  "Nuclear Medicine",
  "Sports Medicine",
  "Geriatrics",
  "Pain Management",
  "Rehabilitation Medicine"
];

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmOpen(true); // open confirmation dialog
  };

  const handleConfirmUpdate = async () => {
    try {
      const res = await updateMyProfile(formData);

      // update profile in parent
      onUpdated(res.data);

      // close both modals
      setConfirmOpen(false);
      onClose();

      // clear cache so new data loads next time
      localStorage.removeItem("doctor_me_cache");

    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  return (
    <>
      {/* Main Edit Modal */}
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

          <h2 className="text-lg font-semibold text-secondary mb-4">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-lg p-2"
            />

            {/* <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select> */}

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />

            <input
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              placeholder="Hospital"
              className="w-full border rounded-lg p-2"
            />

            <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select Specialization</option>

            {SPECIALIZATIONS.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}

          </select>
         

            <div className="flex justify-end gap-3 pt-2">

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-secondary text-white"
              >
                Update
              </button>

            </div>

          </form>

        </div>
      </div>


      {/* Confirmation Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">

          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-sm">

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Update
            </h3>

            <p className="text-gray-600 text-sm mb-6">
              Do you want to update your profile information?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                No
              </button>

              <button
                onClick={handleConfirmUpdate}
                className="px-4 py-2 rounded-lg bg-secondary text-white"
              >
                Yes, Update
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default DoctorProfileEditModal;