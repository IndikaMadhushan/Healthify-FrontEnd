import React, { useRef } from "react";
import BasicInfoForm from "./FormComponent/basicInfoForm";
import EmergencyContactForm from "./FormComponent/Emergency";
import { updatePatientProfileApi } from "../../api/PatientApi";
import toast from "react-hot-toast";
import { normalizeEmail } from "../../utils/patientProfileValidation";

export default function PatientProfileEdit({ patient, onClose, onUpdated }) {
  const basicRef = useRef();
  const emergencyRef = useRef();

  const handleUpdate = async () => {
    const basicValid = basicRef.current.validate();
    const emergencyValid = emergencyRef.current.validate();

    if (!basicValid || !emergencyValid) return;

    const basic = basicRef.current.getData();
    const emergency = emergencyRef.current.getData();
    const cleanedBasic = {
      ...basic,
      firstName: basic.firstName.trim(),
      secondName: basic.secondName.trim(),
      lastName: basic.lastName.trim(),
      email: normalizeEmail(basic.email),
      nationalId: basic.nationalId.trim().toUpperCase(),
      occupation: basic.occupation.trim(),
      address: basic.address.trim(),
      contactNumber: basic.contactNumber.trim(),
      nationality: basic.nationality.trim(),
      mainCity: basic.mainCity.trim(),
      maritalStatus: basic.maritalStatus,
    };
    const cleanedEmergency = {
      primary: {
        name: emergency.primary.name.trim(),
        phone: emergency.primary.phone.trim(),
        relationship: emergency.primary.relationship.trim(),
      },
      secondary: {
        name: emergency.secondary.name.trim(),
        phone: emergency.secondary.phone.trim(),
        relationship: emergency.secondary.relationship.trim(),
      },
    };

    const payload = {
      firstName: cleanedBasic.firstName || undefined,
      secondName: cleanedBasic.secondName || undefined,
      lastName: cleanedBasic.lastName || undefined,
      email: cleanedBasic.email || undefined,
      nic: cleanedBasic.nationalId || undefined,
      gender: basic.gender || undefined,
      dateOfBirth: basic.dob || undefined,
      occupation: cleanedBasic.occupation || undefined,
      maritalStatus: cleanedBasic.maritalStatus || undefined,
      district: cleanedBasic.mainCity || undefined,
      phone: cleanedBasic.contactNumber || undefined,
      address: cleanedBasic.address || undefined,
      nationality: cleanedBasic.nationality || undefined,

      primaryContact: cleanedEmergency.primary.name
        ? {
          name: cleanedEmergency.primary.name,
          phoneNumber: cleanedEmergency.primary.phone,
          relationship: cleanedEmergency.primary.relationship
        }
        : undefined,

      secondaryContact: cleanedEmergency.secondary.name
        ? {
          name: cleanedEmergency.secondary.name,
          phoneNumber: cleanedEmergency.secondary.phone,
          relationship: cleanedEmergency.secondary.relationship
        }
        : undefined
    };

    try {
      await updatePatientProfileApi(patient.id, payload);
      localStorage.removeItem("patient_me_cache");
      toast.success("Profile updated successfully");
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
