import React, { useRef } from "react";
import BasicInfoForm from "./FormComponent/basicInfoForm";
import EmergencyContactForm from "./FormComponent/Emergency";

export default function PatientProfileEdit({ onClose }) {
  const basicRef = useRef();
  const emergencyRef = useRef();

  const handleUpdate = () => {
    const basicValid = basicRef.current.validate();
    const emergencyValid = emergencyRef.current.validate();

    if (!basicValid || !emergencyValid) return;

    const payload = {
      basic: basicRef.current.getData(),
      emergency: emergencyRef.current.getData()
    };

    console.log("ALL VALID ✔", payload);
    alert("Profile ready to update");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>

        {/* FORMS */}
        <div className="max-h-[65vh] overflow-y-auto pr-2 space-y-6">
          <BasicInfoForm ref={basicRef} />
          <EmergencyContactForm ref={emergencyRef} />
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 border-t pt-4">
          

          <button
            onClick={handleUpdate}
            className="px-5 py-2 rounded-lg bg-[#18AAB0] text-white"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
