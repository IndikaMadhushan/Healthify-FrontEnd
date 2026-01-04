//thathsara

export function PatientDetailsCard({
  patientInfo,
  onMoreAboutPatient,
  showMedicationPurpose = true,
}) {
  const patient = patientInfo || {
    patientId: "UR234567",
    fullName: "Parindya Hewage",
    age: 23,
    gender: "Female",
    medicationPurpose: "Treat Gastritis",
  };

  const cardBox = "border border-gray-300 rounded-xl bg-white shadow-sm p-4";
  return (
    <div className={cardBox}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
          {patient.fullName.charAt(0)}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {patient.fullName}
          </h2>
          <p className="text-sm text-gray-500">Patient Details</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Patient ID (NIC):</span>
          <span className="font-semibold text-gray-800">
            {patient.patientId}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Age:</span>
          <span className="font-semibold text-gray-800">{patient.age}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Gender:</span>
          <span className="font-semibold text-gray-800">{patient.gender}</span>
        </div>
        {showMedicationPurpose && patient.medicationPurpose && (
          <div className="flex justify-between">
            <span className="text-gray-600">Medication Purpose:</span>
            <span className="font-semibold text-gray-800">
              {patient.medicationPurpose}
            </span>
          </div>
        )}
      </div>

      {onMoreAboutPatient && (
        <button
          onClick={onMoreAboutPatient}
          className="mt-4 text-sm text-secondary hover:underline font-semibold"
        >
          More About Patient →
        </button>
      )}
    </div>
  );
}
