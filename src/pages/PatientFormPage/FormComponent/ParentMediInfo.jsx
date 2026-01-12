import { useState } from "react";
import ChronicIllnessesSection from "./ChronicIllnessesSection";

const initialChronic = {
  chronicIllnesses: [],
  otherChronic: ""
};

export default function ParentMedicalForm({showButton=false, onNext }) {
  const [parentChronic, setParentChronic] = useState(initialChronic);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parent medical:", parentChronic);
  };

  const sectionHeading = "text-xl font-bold text-mainblack mb-1";
  const subText = "text-[14px] text-gray-600 mb-4";

  return (
    <form onSubmit={handleSubmit} className="text-mainblack space-y-4">
      {/* Heading + description */}
      <div>
        <h2 className={sectionHeading}>Parent Medical History</h2>
        <p className={subText}>
          If your father or mother has any of the following conditions, please select them.
        </p>
      </div>

      {/* Re-using chronic illnesses component */}
      <ChronicIllnessesSection
        value={parentChronic}
        onChange={setParentChronic}
      />
    {showButton && (
      <div className="mt-2 flex justify-end">
        <button
        type="button"
        className="px-8 py-3 bg-secondary/90 hover:bg-secondary text-white rounded-full text-[17px] font-semibold"
        onClick={() => {
          // if you want validation later, put it here
          onNext(); //  GO TO NEXT PAGE
        }}
      >
        Next
      </button>
      </div>
    )}
    </form>
  );
}