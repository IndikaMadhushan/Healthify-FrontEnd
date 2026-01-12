import { useState } from "react";
import { prescriptions } from "./Prescription.js";
import PrescriptionCard from "./PrescriptionCard";
import PrescriptionModal from "./PrescriptionModal";

export default function PrescriptionList() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-2xl font-bold text-[#0F4F52] mb-6">
        Patient Prescriptions
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {prescriptions.map((rx) => (
          <PrescriptionCard
            key={rx.id}
            data={rx}
            onClick={() => setSelected(rx)}
          />
        ))}
      </div>

      {selected && (
        <PrescriptionModal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
