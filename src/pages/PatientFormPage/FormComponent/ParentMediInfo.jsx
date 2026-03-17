import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChronicIllnessesSection from "./ChronicIllnessesSection";

const initialChronic = {
  chronicIllnesses: [],
  otherChronic: ""
};

export default function ParentMedicalForm({
  showButton = false,
  onNext,
  initialData,
  onSubmit,
  isSaving = false,
}) {
  const [parentChronic, setParentChronic] = useState(initialChronic);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) return;

    // The form needs to rehydrate when page data is loaded or refreshed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParentChronic({
      chronicIllnesses: Array.isArray(initialData.chronicIllnesses)
        ? initialData.chronicIllnesses
        : [],
      otherChronic: initialData.otherChronic ?? "",
    });
    setErrors({});
  }, [initialData]);

  const handleChronicChange = (nextValue) => {
    setParentChronic(nextValue);
    setErrors((prev) => {
      if (
        prev.otherChronic &&
        (!nextValue.chronicIllnesses.includes("Other") ||
          nextValue.otherChronic.trim())
      ) {
        const nextErrors = { ...prev };
        delete nextErrors.otherChronic;
        return nextErrors;
      }

      return prev;
    });
  };

  const validateForm = () => {
    const nextErrors = {};
    if (
      parentChronic.chronicIllnesses.includes("Other") &&
      !parentChronic.otherChronic.trim()
    ) {
      nextErrors.otherChronic = "Please specify other chronic illness";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return null;
    }

    return {
      ...parentChronic,
      otherChronic: parentChronic.otherChronic.trim(),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = validateForm();
    if (!payload) return;

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        console.log("Parent medical:", payload);
      }
      toast.success("Parent medical information submitted successfully");
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Failed to submit parent medical information";
      toast.error(message);
    }
  };

  const handleNextClick = () => {
    const payload = validateForm();
    if (!payload) return;
    onNext();
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

      <ChronicIllnessesSection
        value={parentChronic}
        onChange={handleChronicChange}
        errors={errors}
      />

      {showButton ? (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className={actionButtonClass}
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={actionButtonClass}
          >
            {isSaving ? "Saving..." : "Submit Parent Info"}
          </button>
        </div>
      )}
    </form>
  );
}
