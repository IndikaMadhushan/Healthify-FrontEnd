import { useState } from "react";
import ChronicIllnessesSection from "./ChronicIllnessesSection";

const initialChronic = {
  chronicIllnesses: [],
  otherChronic: ""
};

export default function ParentMedicalForm() {
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

      {/* Save button */}
      <div className="mt-2">
        <button
          type="submit"
          className="px-5 py-2 bg-secondary/90 hover:bg-secondary text-white rounded-md text-[15px] font-semibold"
        >
          Save
        </button>
      </div>
    </form>
  );
}