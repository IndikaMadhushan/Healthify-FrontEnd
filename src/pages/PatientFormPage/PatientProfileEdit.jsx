import React, { useRef } from "react";
import BasicInfoForm from "./FormComponent/basicInfoForm";
import EmergencyContactForm from "./FormComponent/Emergency";
import { updatePatientProfileApi } from "../../api/PatientApi";
import toast from "react-hot-toast";

export default function PatientProfileEdit({ patient, onClose, onUpdated }) {
  const basicRef = useRef();
  const emergencyRef = useRef();

  const handleUpdate = async () => {
    const basicValid = basicRef.current.validate();
    const emergencyValid = emergencyRef.current.validate();

    if (!basicValid || !emergencyValid) return;

    const basic = basicRef.current.getData();
    const emergency = emergencyRef.current.getData();

    const payload = {
      fullName: basic.fullName || undefined,
      email: basic.email || undefined,
      nic: basic.nationalId || undefined,
      gender: basic.gender || undefined,
      dateOfBirth: basic.dob || undefined,
      occupation: basic.occupation || undefined,
      district: basic.mainCity || undefined,
      phone: basic.contactNumber || undefined,
      address: basic.address || undefined,
      nationality: basic.nationality || undefined,

      primaryContact: emergency.primary.name
        ? {
          name: emergency.primary.name,
          phoneNumber: emergency.primary.phone,
          relationship: emergency.primary.relationship
        }
        : undefined,

      secondaryContact: emergency.secondary.name
        ? {
          name: emergency.secondary.name,
          phoneNumber: emergency.secondary.phone,
          relationship: emergency.secondary.relationship
        }
        : undefined
    };

    try {
      await updatePatientProfileApi(patient.id, payload);
      localStorage.removeItem("patient_me_cache");
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Profile update failed", err);
      toast.error("Failed to update profile");
    }
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
          <BasicInfoForm ref={basicRef} initialData={patient} />
          <EmergencyContactForm ref={emergencyRef} initialData={patient} />
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
