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
import { useNavigate } from "react-router-dom";

export default function SurgeryCard({ data, onCreateFolder }) {

const navigate = useNavigate();

const handleCardClick = () => {
    if (data.isFolder) {
      navigate(`/surgery/${data.id}`);
    }
};

return (
    <div  onClick={handleCardClick} className="relative rounded-xl border p-5 bg-white hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-[#0F4F52] mb-2">
        {data.isFolder ? "📁 Surgical Record" : "Surgery"}
      </h3>

      <div className="text-sm space-y-1">
        <p><b>Reason:</b> {data.reason}</p>
        <p><b>Date:</b> {data.date}</p>
        <p><b>Hospital:</b> {data.hospital}</p>
        <p><b>Complications:</b> {data.complications || "None"}</p>
      </div>

      {/* {!data.isFolder && (
        <button
          onClick={() => onCreateFolder(data)}
          className="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full 
                     bg-[#18AAB0] text-white hover:opacity-90"
        >
          Create Folder
        </button>
      )} */}
      {!data.isFolder && (
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            onCreateFolder(data);
          }}
          className="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full 
                     bg-[#18AAB0] text-white hover:opacity-90"
        >
          Create Folder
        </button>
      )}
    </div>
  );
}