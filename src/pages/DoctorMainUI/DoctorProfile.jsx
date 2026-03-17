import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProfileImageCropper from "../../components/profileImageCropper";
import {
  getDoctorProfileApi,
  uploadDoctorProfileImageApi,
} from "../../api/DoctorApi";
import DoctorProfileEditModal from "./DoctorProfileEditModal";
import { getDisplayName } from "../../utils/nameUtils";

const showValue = (value) =>
  value === null || value === undefined || value === "" ? "-" : value;

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const refreshDoctorProfile = async () => {
    const res = await getDoctorProfileApi();
    setDoctor(res.data);
    return res.data;
  };

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        await refreshDoctorProfile();
      } catch (err) {
        console.error("Failed to load doctor profile", err);
      }
    };

    void loadDoctor();
  }, []);

  const handleDoctorImageCropped = async (file) => {
    try {
      setIsUploadingImage(true);
      const res = await uploadDoctorProfileImageApi(file);
      if (res?.data && typeof res.data === "object") {
        setDoctor(res.data);
      } else {
        await refreshDoctorProfile();
      }
      toast.success("Profile photo updated");
    } catch (err) {
      console.error("Doctor image upload failed", err);
      toast.error("Failed to upload profile photo");
      try {
        await refreshDoctorProfile();
      } catch (refreshError) {
        console.error("Failed to reload doctor profile after image error", refreshError);
      }
    } finally {
      setIsUploadingImage(false);
    }
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading doctor profile...</p>
      </div>
    );
  }

  const doctorDisplayName = getDisplayName(doctor);

  return (
    <div className="w-full">
      <div className="w-screen h-32 bg-gradient-to-r from-secondary to-primary relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="absolute -bottom-16 left-12">
          <div className="bg-white p-2 rounded-full shadow-xl">
            <ProfileImageCropper
              imageUrl={doctor.photoUrl || doctor.profilePic}
              onCropped={handleDoctorImageCropped}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-24 px-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dr. {showValue(doctorDisplayName)}
            </h1>

            <p className="text-secondary font-medium mt-1">
              {showValue(doctor.specialization)}
            </p>

            <p className="text-gray-500 text-sm">
              {showValue(doctor.hospital)}
            </p>

            {isUploadingImage && (
              <p className="text-xs text-gray-500 mt-2">
                Updating profile photo...
              </p>
            )}
          </div>

          <button
            onClick={() => setEditOpen(true)}
            className="bg-secondary text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            Edit Profile
          </button>
        </div>

        {editOpen && (
          <DoctorProfileEditModal
            doctor={doctor}
            onClose={() => setEditOpen(false)}
            onUpdated={(updatedDoctor) => {
              setDoctor(updatedDoctor);
            }}
          />
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-secondary mb-4">
              Personal Information
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{showValue(doctor.gender)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{showValue(doctor.dateOfBirth)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{showValue(doctor.age)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-secondary mb-4">
              Contact Information
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{showValue(doctor.email)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Hospital / Clinic</p>
                <p className="font-medium">{showValue(doctor.hospital)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-secondary mb-4">
              Professional Details
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Specialization</p>
                <p className="font-medium">{showValue(doctor.specialization)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">SLMC Number</p>
                <p className="font-medium">{showValue(doctor.licenseNumber)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
