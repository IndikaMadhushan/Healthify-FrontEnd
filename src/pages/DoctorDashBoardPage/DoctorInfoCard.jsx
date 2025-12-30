// ============================================
// FILE 3: src/pages/DoctorProfilePage/DoctorInfoCard.jsx
// ============================================

import { useRef } from "react";

export default function DoctorInfoCard({ doctor, onProfileUpdate }) {
  const fileInputRef = useRef(null);

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onProfileUpdate({ ...doctor, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={doctor.profileImage}
            alt={doctor.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-secondary shadow-lg"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full shadow-lg hover:bg-secondary/90 transition"
            title="Update profile picture"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageChange}
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-secondary mb-2">
            {doctor.fullName}
          </h1>
          <p className="text-gray-600 text-sm mb-1">
            <span className="font-semibold">SLMC:</span> {doctor.slmcNumber}
          </p>
          <p className="text-gray-600 text-sm mb-1">
            <span className="font-semibold">Specialization:</span>{" "}
            {doctor.specialization}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Hospital:</span> {doctor.hospital}
          </p>
        </div>
      </div>
    </div>
  );
}
