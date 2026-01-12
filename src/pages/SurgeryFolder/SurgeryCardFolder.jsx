import { useParams } from "react-router-dom";
import { surgeries } from "../../data/surgeries";
import Uploader from "../RepoteManagePages/reportUploadComponent";

export default function SurgeryCardFolder() {
  const { id } = useParams();

  const surgery = surgeries.find((s) => s.id === id);

  if (!surgery) {
    return <div className="p-6">Surgery not found</div>;
  }

  return (
<div className="bg-white rounded-2xl border border-[#D3F0ED] shadow-sm p-6 space-y-4 md:mx-20">
  
  <h2 className="text-lg font-semibold text-[#0F4F52] border-b pb-3">
    Surgery Details
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm ">
    
    <div className="flex flex-col">
      <span className="text-gray-500">Reason</span>
      <span className="font-medium text-gray-900">
        {surgery.reason}
      </span>
    </div>

    <div className="flex flex-col">
      <span className="text-gray-500">Date</span>
      <span className="font-medium text-gray-900">
        {surgery.date}
      </span>
    </div>

    <div className="flex flex-col">
      <span className="text-gray-500">Hospital</span>
      <span className="font-medium text-gray-900">
        {surgery.hospital}
      </span>
    </div>

    <div className="flex flex-col">
      <span className="text-gray-500">Complications</span>
      <span
        className={`font-medium ${
          surgery.complications && surgery.complications !== "None"
            ? "text-red-600"
            : "text-green-600"
        }`}
      >
        {surgery.complications || "None"}
      </span>
    </div>
    
  </div>
  <Uploader />
</div>
  );
}