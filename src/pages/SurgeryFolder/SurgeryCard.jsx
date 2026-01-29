// export default function SurgeryCard({ data, onCreateFolder }) {
//   return (
//     <div
//       className={`relative rounded-xl border p-5 transition ${
//         data.isFolder
//           ? "bg-[#F2FBFA] border-[#18AAB0]"
//           : "bg-white border-gray-200 hover:shadow-md"
//       }`}
//     >
//       {/* TITLE */}
//       <h3 className="text-lg font-semibold text-[#0F4F52] mb-2">
//         {data.isFolder ? "📁 Surgical Record" : "Surgery"}
//       </h3>

//       {/* CONTENT */}
//       <div className="text-sm space-y-1">
//         <p><b>Reason:</b> {data.reason}</p>
//         <p><b>Date:</b> {data.date}</p>
//         <p><b>Hospital / Surgeon:</b> {data.hospital}</p>
//         <p><b>Complications:</b> {data.complications || "None"}</p>
//       </div>

//       {/* CREATE FOLDER BUTTON */}
//       {!data.isFolder && (
//         <button
//           onClick={() => onCreateFolder(data.id)}
//           className="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full 
//                      bg-[#18AAB0] text-white hover:opacity-90"
//         >
//           Create Folder
//         </button>
//       )}
//     </div>
//   );
// }

// export default function SurgeryCard({ data, onCreateFolder }) {
//   return (
//     <div className="relative rounded-xl border p-5 bg-white hover:shadow-md transition">
//       <h3 className="text-lg font-semibold text-[#0F4F52] mb-2">
//         {data.isFolder ? "📁 Surgical Record" : "Surgery"}
//       </h3>

//       <div className="text-sm space-y-1">
//         <p><b>Reason:</b> {data.reason}</p>
//         <p><b>Date:</b> {data.date}</p>
//         <p><b>Hospital:</b> {data.hospital}</p>
//         <p><b>Complications:</b> {data.complications || "None"}</p>
//       </div>

//       {!data.isFolder && (
//         <button
//           onClick={() => onCreateFolder(data)}
//           className="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full 
//                      bg-[#18AAB0] text-white hover:opacity-90"
//         >
//           Create Folder
//         </button>
//       )}
//     </div>
//   );
// }



// import { useNavigate } from "react-router-dom";

// export default function SurgeryCard({ data, onCreateFolder }) {

// const navigate = useNavigate();

// const handleCardClick = () => {
//     if (data.isFolder) {
//       navigate(`/surgery/${data.id}`);
//     }
// };

// return (
//     <div  onClick={handleCardClick} className="relative rounded-xl border p-5 bg-white hover:shadow-md transition">
//       <h3 className="text-lg font-semibold text-[#0F4F52] mb-2">
//         {data.isFolder ? "📁 Surgical Record" : "Surgery"}
//       </h3>

//       <div className="text-sm space-y-1 h-[140px]">
//         <p><b>Reason:</b> {data.reason}</p>
//         <p><b>Date:</b> {data.date}</p>
//         <p><b>Hospital:</b> {data.hospital}</p>
//         <p><b>Complications:</b> {data.complications || "None"}</p>
//       </div>

//       {/* {!data.isFolder && (
//         <button
//           onClick={() => onCreateFolder(data)}
//           className="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full 
//                      bg-[#18AAB0] text-white hover:opacity-90"
//         >
//           Create Folder
//         </button>
//       )} */}
//       {!data.isFolder && (
//         <button
//           onClick={(e) => {
//             e.stopPropagation(); 
//             onCreateFolder(data);
//           }}
//           className="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full 
//                      bg-[#18AAB0] text-white hover:opacity-90"
//         >
//           Create Folder
//         </button>
//       )}
//     </div>
//   );
// }




import { useNavigate } from "react-router-dom";

export default function SurgeryCard({ data, onCreateFolder }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (data.isFolder) {
      navigate(`/surgery/${data.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="
        relative cursor-pointer
        rounded-2xl p-6
        bg-white/80 backdrop-blur-md
        border border-[#E6F5F4]
        shadow-sm hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        group
      "
    >
      {/* Gradient Timeline Dot */}
      <div
        className={`
          absolute -left-3 top-8 w-4 h-4 rounded-full
          ${data.isFolder
            ? "bg-gradient-to-r from-green-400 to-green-600"
            : "bg-gradient-to-r from-cyan-400 to-teal-500"}
          ring-4 ring-white
        `}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-[#0F4F52]">
          {data.isFolder ? "Surgical Folder" : "Surgery Record"}
        </h3>

        <span
          className={`
            text-[11px] px-3 py-1 rounded-full font-medium
            ${data.isFolder
              ? "bg-green-50 text-green-600"
              : "bg-cyan-50 text-cyan-600"}
          `}
        >
          {data.isFolder ? "Folder" : "Procedure"}
        </span>
      </div>

      {/* Meta */}
      <div className="space-y-2 text-sm text-gray-700">
        <Info label="Reason" value={data.reason} />
        <Info label="Date" value={data.date} />
        <Info label="Hospital" value={data.hospital} />
        <Info
          label="Complications"
          value={data.complications || "None"}
        />
      </div>

      {/* Action */}
      {!data.isFolder ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCreateFolder(data);
          }}
          className="
            mt-5 w-full
            py-2 rounded-xl
            text-sm font-medium
            bg-gradient-to-r from-[#18AAB0] to-[#86C443]
            text-white
            hover:opacity-90
            transition
          "
        >
          Create Folder
        </button>
      ) : (
        <div className="
          mt-5 text-xs text-green-600
          opacity-0 group-hover:opacity-100
          transition
        ">
          Open folder →
        </div>
      )}
    </div>
  );
}

/* -------- Small Info Row -------- */
function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}