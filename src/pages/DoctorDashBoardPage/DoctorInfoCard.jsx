import { useRef } from "react";

export default function DoctorInfoCard({ doctor, onProfileUpdate }) {
  const fileInputRef = useRef(null);

  //  API data not loaded yet
  if (!doctor) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border">
        <p className="text-gray-500">Loading doctor profile...</p>
      </div>
    );
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onProfileUpdate({
        ...doctor,
        photoUrl: reader.result, // align with backend
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

        {/* PROFILE IMAGE */}
        <div className="relative">
          <img
            src={doctor.photoUrl || "/profilePic.png"}
            alt={doctor.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-secondary shadow-lg"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full shadow-lg"
          >
            📷
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageChange}
          />
        </div>

        {/* DOCTOR INFO */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-secondary mb-2">
            {doctor.fullName}
          </h1>

          <p className="text-gray-600 text-sm mb-1">
            <span className="font-semibold">License:</span> {doctor.licenseNumber}
          </p>

          <p className="text-gray-600 text-sm mb-1">
            <span className="font-semibold">Specialization:</span> {doctor.specialization}
          </p>

          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Hospital:</span> {doctor.hospital}
          </p>
        </div>
      </div>
    </div>
  );
}
