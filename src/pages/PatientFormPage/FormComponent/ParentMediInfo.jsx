import { useState } from "react";
import toast from "react-hot-toast";
import ChronicIllnessesSection from "./ChronicIllnessesSection";

const initialChronic = {
  chronicIllnesses: [],
  otherChronic: ""
};

export default function ParentMedicalForm({ showButton = false, onNext }) {
  const [parentChronic, setParentChronic] = useState(initialChronic);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parent medical:", parentChronic);
    toast.success("Parent medical information submitted successfully");
  };

  const sectionHeading = "text-xl font-bold text-mainblack mb-1";
  const subText = "text-[14px] text-gray-600 mb-4";
  const actionButtonClass =
    "px-5 py-2 bg-secondary/90 hover:bg-secondary text-white rounded-full text-[15px] font-semibold";

  return (
    <form onSubmit={handleSubmit} className="text-mainblack space-y-4">
      <div>
        <h2 className={sectionHeading}>Parent Medical History</h2>
        <p className={subText}>
          If your father or mother has any of the following conditions, please
          select them.
        </p>
      </div>

      <ChronicIllnessesSection value={parentChronic} onChange={setParentChronic} />

      {showButton ? (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className={actionButtonClass}
            onClick={() => {
              onNext();
            }}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="mt-2 flex justify-end">
          <button type="submit" className={actionButtonClass}>
            Submit Parent Info
          </button>
        </div>
      )}
    </form>
  );
}
