import { getDisplayName } from "../../utils/nameUtils";

export default function DoctorInfoCard({ doctor }) {
  if (!doctor) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border">
        <p className="text-gray-500">Loading doctor profile...</p>
      </div>
    );
  }

  const doctorDisplayName = getDisplayName(doctor);
  const doctorHeadingName = /^dr\.?\s/i.test(doctorDisplayName)
    ? doctorDisplayName
    : `Dr. ${doctorDisplayName}`;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div>
          <img
            src={doctor.photoUrl || "/profilePic.png"}
            alt={doctorDisplayName}
            className="w-32 h-32 rounded-full object-cover border-4 border-secondary shadow-lg"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-secondary mb-2">
            {doctorHeadingName}
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
