import { Plus } from "lucide-react";

export default function CreateClinicBookCard({ onCreate }) {
  return (
    <div
      onClick={onCreate}
      className="
        flex flex-col items-center justify-center
        border-2 border-dashed border-slate-600
        rounded-2xl p-6 cursor-pointer
        hover:border-[#86c443]
        transition-all duration-300
        bg-slate-800/80 
      "
    >
      <div className="
        w-14 h-14 rounded-full
        bg-gradient-to-r from-[#86c443] to-[#18AAB0]
        flex items-center justify-center
        text-white
        shadow-lg
      ">
        <Plus size={28} />
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-300">
        Create Clinic Book
      </p>
    </div>
  );
}