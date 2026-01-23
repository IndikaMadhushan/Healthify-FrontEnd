// import { useState } from "react";
// import { prescriptions } from "./Prescription.js";
// import PrescriptionCard from "./PrescriptionCard";
// import PrescriptionModal from "./PrescriptionModal";

// export default function PrescriptionList() {
//   const [selected, setSelected] = useState(null);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">


//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {prescriptions.map((rx) => (
//           <PrescriptionCard
//             key={rx.id}
//             data={rx}
//             onClick={() => setSelected(rx)}
//           />
//         ))}
//       </div>

//       {selected && (
//         <PrescriptionModal
//           data={selected}
//           onClose={() => setSelected(null)}
//         />
//       )}
//     </div>
//   );
// }



import { useState } from "react";
import { prescriptions } from "./Prescription.js";
import PrescriptionCard from "./PrescriptionCard";
import PrescriptionModal from "./PrescriptionModal";

export default function PrescriptionList() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* EMPTY STATE */}
      {prescriptions.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📄</div>
          <h2 className="text-xl font-semibold text-gray-700">
            No prescriptions found
          </h2>
          <p className="text-gray-500 mt-2">
            You don’t have any prescriptions yet
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prescriptions.map((rx) => (
            <PrescriptionCard
              key={rx.id}
              data={rx}
              onClick={() => setSelected(rx)}
            />
          ))}
        </div>
      )}

      {selected && (
        <PrescriptionModal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}