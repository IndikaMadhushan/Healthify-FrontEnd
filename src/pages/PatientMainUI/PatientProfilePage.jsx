import ProfileImageCropper from "../../components/profileImageCropper";
import { useState, useEffect } from "react";
import PatientProfileEdit from "../PatientFormPage/PatientProfileEdit";
import { getPatientProfileApi, updatePatientProfileApi, uploadPatientProfileImageApi } from "../../api/PatientApi";

export default function MyProfile() {
  const [openEdit, setOpenEdit] = useState(false);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getPatientProfileApi();
        console.log(res.data);
        setPatient(res.data);
      } catch (err) {
        console.error("Failed to load patient profile", err);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      await updatePatientProfileApi(patient.id, formData);

      // invalidate cache (important)
      localStorage.removeItem("patient_me_cache");

      onClose();
      window.location.reload(); // simple + safe
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  const handleProfileImageUpload = async (file) => {
    try {
      await uploadPatientProfileImageApi(patient.id, file);

      // invalidate cached /me response
      localStorage.removeItem("patient_me_cache");

      // optional: reload profile image cleanly
      const res = await getPatientProfileApi();
      setPatient(res.data);

    } catch (err) {
      console.error("Profile image upload failed", err);
      alert("Failed to upload profile image");
    }
  };



  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm p-6 sm:p-10">

        {/* HEADER */}
        <div className="flex flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="md:text-3xl text-2xl font-semibold text-[#18AAB0]">
              Patient Profile
            </h1>
            <p className="text-gray-500 md:text-sm text-xs mt-1">
              View and manage personal health information
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setOpenEdit(true)}
              className="px-5 py-2 rounded-full bg-[#18AAB0] text-white text-sm"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* PROFILE HEADER */}
        <div className="bg-white border border-[#D3F0ED] rounded-2xl px-8 py-6 mb-10 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">

            <div className="relative flex items-center justify-center">
              <div className="relative z-10">
                <ProfileImageCropper onCropped={(file) => handleProfileImageUpload(file)} />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-[#0F4F52]">
                {patient.fullName}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Registration No:{" "}
                <span className="font-medium text-[#0F4F52]">
                  {patient.patientId}
                </span>
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Patient Profile
              </p>

              <div className="mt-4 h-px w-40 bg-[#D3F0ED] mx-auto md:mx-0" />

              <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-500">
                <span>
                  📅 AGE:{" "}
                  <span className="font-medium text-[#0F4F52]">
                    {patient.age}
                  </span>
                </span>
                <span className="hidden sm:block">•</span>
                <span>
                  🧬 Gender:{" "}
                  <span className="font-medium text-[#0F4F52]">
                    {patient.gender}
                  </span>
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <ProfileSection1 title="Personal Information" margin="mb-10">
          <Info label="Full Name" value={patient.fullName} />
          <Info label="Date of Birth" value={patient.dateOfBirth} />
          <Info label="Age" value={patient.age} />
          <Info label="Gender" value={patient.gender} />
          <Info label="Nationality" value={patient.nationality} />
          <Info label="Marital Status" value={patient.maritalStatus} />
          <Info label="NIC" value={patient.nic} />
          <Info label="Occupation" value={patient.occupation} />
        </ProfileSection1>

        {/* CONTACT INFORMATION */}
        <ProfileSection1 title="Contact Information">
          <Info label="District" value={patient.district} />
          <Info label="Contact Number" value={patient.phone} />
        </ProfileSection1>

        <ProfileSection2 margin="mb-10 mt-4">
          <Info label="Address" value={patient.address} />
          <Info label="Email Address" value={patient.email} />
        </ProfileSection2>

        {/* EMERGENCY CONTACTS */}
        <ProfileSection1 title="Emergency Contacts" margin="mb-10">
          <SectionLabel text="Primary Emergency Contact" />
          <Info label="Contact Person" value={patient.primaryContact?.name} />
          <Info label="Relationship" value={patient.primaryContact?.relationship} />
          <Info label="Contact Number" value={patient.primaryContact?.phoneNumber} />

          {patient.secondaryContact?.name && (
            <>
              <SectionLabel text="Secondary Emergency Contact" className="mt-6" />
              <Info label="Contact Person" value={patient.secondaryContact.name} />
              <Info label="Relationship" value={patient.secondaryContact.relationship} />
              <Info label="Contact Number" value={patient.secondaryContact.phoneNumber} />
            </>
          )}
        </ProfileSection1>
      </div>

      {openEdit && (
        <PatientProfileEdit onClose={() => setOpenEdit(false)} />
      )}
    </div>
  );
}

/* ================== UI COMPONENTS (UNCHANGED) ================== */

function ProfileSection1({ title, children, margin }) {
  return (
    <div className={margin}>
      <h2 className="text-lg font-semibold text-[#0F4F52] mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function ProfileSection2({ children, margin }) {
  return (
    <div className={margin}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#F7FCFB] border border-[#D3F0ED] p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-[#0F4F52]">
        {value || "-"}
      </p>
    </div>
  );
}

function SectionLabel({ text, className = "" }) {
  return (
    <div className={`sm:col-span-2 text-sm font-semibold text-[#18AAB0] ${className}`}>
      {text}
    </div>
  );
}
