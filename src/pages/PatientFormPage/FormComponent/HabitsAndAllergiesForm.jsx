import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { sanitizeMultilineText } from "../../../utils/patientProfileValidation";

const initialHabits = {
  smokingStatus: "",
  smokingFrequency: "",
  alcoholStatus: "",
  alcoholFrequency: "",
  drugUseStatus: "",
  drugUseFrequency: "",
  stressLevel: "",
  foodAllergies: "",
  drugAllergies: ""
};

export default function HabitsAndAllergiesForm({
  showButton = false,
  onNext,
  initialData,
  onSubmit,
  isSaving = false,
  readOnly = false,
}) {
  const [form, setForm] = useState(initialHabits);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) return;

    // The form needs to rehydrate when page data is loaded or refreshed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      smokingStatus: initialData.smokingStatus ?? "",
      smokingFrequency: initialData.smokingFrequency ?? "",
      alcoholStatus: initialData.alcoholStatus ?? "",
      alcoholFrequency: initialData.alcoholFrequency ?? "",
      drugUseStatus: initialData.drugUseStatus ?? "",
      drugUseFrequency: initialData.drugUseFrequency ?? "",
      stressLevel: initialData.stressLevel ?? "",
      foodAllergies: initialData.foodAllergies ?? "",
      drugAllergies: initialData.drugAllergies ?? "",
    });
    setErrors({});
  }, [initialData]);

  const handleChange = (field) => (e) => {
    let value = e.target.value;

    if (field === "foodAllergies" || field === "drugAllergies") {
      value = sanitizeMultilineText(value, 250);
    }

    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "smokingStatus" && value === "never"
        ? { smokingFrequency: "" }
        : {}),
      ...(field === "alcoholStatus" && value === "never"
        ? { alcoholFrequency: "" }
        : {}),
      ...(field === "drugUseStatus" && value === "never"
        ? { drugUseFrequency: "" }
        : {}),
    }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];

       if (field === "smokingStatus" && value === "never") {
        delete next.smokingFrequency;
      }

      if (field === "alcoholStatus" && value === "never") {
        delete next.alcoholFrequency;
      }

      if (field === "drugUseStatus" && value === "never") {
        delete next.drugUseFrequency;
      }

      return next;
    });
  };

  const validateForm = () => {
    const nextErrors = {};

    if (
      ["current", "stopped"].includes(form.smokingStatus) &&
      !form.smokingFrequency
    ) {
      nextErrors.smokingFrequency = "Please select how often you smoke";
    }

    if (
      ["current", "stopped"].includes(form.alcoholStatus) &&
      !form.alcoholFrequency
    ) {
      nextErrors.alcoholFrequency = "Please select how often you drink";
    }

    if (
      ["current", "stopped"].includes(form.drugUseStatus) &&
      !form.drugUseFrequency
    ) {
      nextErrors.drugUseFrequency = "Please select how often you use drugs";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return null;
    }

    return {
      ...form,
      foodAllergies: form.foodAllergies.trim(),
      drugAllergies: form.drugAllergies.trim(),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (readOnly) return;

    const payload = validateForm();
    if (!payload) return;

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        console.log("Habits & Allergies:", payload);
      }
      toast.success("Lifestyle and allergy details submitted successfully");
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Failed to submit lifestyle information";
      toast.error(message);
    }
  };

  const handleNextClick = () => {
    if (readOnly) return;
    const payload = validateForm();
    if (!payload) return;
    onNext();
  };

  const sectionHeading = "text-xl font-bold text-mainblack mb-4";
  const labelTitle = "text-[15px] font-semibold text-gray-700";
  const smallLabel = "text-[14px] text-gray-700 mb-1";
  const cardBox =
    "border border-gray-300 rounded-xl bg-white shadow-sm p-4 space-y-2";
  const textAreaBase =
    "mt-1 w-full min-h-[70px] px-3 py-2 rounded-md bg-gray-100 border text-[15px] text-gray-700 " +
    "focus:ring-2 focus:ring-secondary focus:border-secondary outline-none resize-y transition";
  const actionButtonClass =
    "px-5 py-2 bg-secondary/90 hover:bg-secondary text-white rounded-full text-[15px] font-semibold";
  const choiceInputClass =
    "h-4 w-4 shrink-0 accent-blue-600 disabled:opacity-100 disabled:cursor-not-allowed";

  return (
    <form onSubmit={handleSubmit} className="text-mainblack space-y-6">
      <h2 className={sectionHeading}>Lifestyle & Habits</h2>

      <fieldset disabled={readOnly} className="space-y-6">

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <div className={cardBox}>
          <label className={labelTitle}>Smoking</label>

          <div className="mt-2 flex flex-col gap-1 ml-2">
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="smokingStatus"
                value="never"
                checked={form.smokingStatus === "never"}
                onChange={handleChange("smokingStatus")}
                className={choiceInputClass}
              />
              No, never
            </label>
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="smokingStatus"
                value="current"
                checked={form.smokingStatus === "current"}
                onChange={handleChange("smokingStatus")}
                className={choiceInputClass}
              />
              Yes, I smoke now
            </label>
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="smokingStatus"
                value="stopped"
                checked={form.smokingStatus === "stopped"}
                onChange={handleChange("smokingStatus")}
                className={choiceInputClass}
              />
              I used to smoke, but I stopped
            </label>
          </div>

          {(form.smokingStatus === "current" ||
            form.smokingStatus === "stopped") && (
            <div className="mt-3 ml-2">
              <p className={smallLabel}>How often do you smoke?</p>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="smokingFrequency"
                    value="occasional"
                    checked={form.smokingFrequency === "occasional"}
                    onChange={handleChange("smokingFrequency")}
                    className={choiceInputClass}
                  />
                  Occasionally (less than once a week)
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="smokingFrequency"
                    value="1-5"
                    checked={form.smokingFrequency === "1-5"}
                    onChange={handleChange("smokingFrequency")}
                    className={choiceInputClass}
                  />
                  1-5 cigarettes per day
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="smokingFrequency"
                    value="6-10"
                    checked={form.smokingFrequency === "6-10"}
                    onChange={handleChange("smokingFrequency")}
                    className={choiceInputClass}
                  />
                  6-10 cigarettes per day
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="smokingFrequency"
                    value="10-plus"
                    checked={form.smokingFrequency === "10-plus"}
                    onChange={handleChange("smokingFrequency")}
                    className={choiceInputClass}
                  />
                  More than 10 per day
                </label>
              </div>
              {errors.smokingFrequency && (
                <p className="text-xs text-red-500 mt-2">{errors.smokingFrequency}</p>
              )}
            </div>
          )}
        </div>

        <div className={cardBox}>
          <label className={labelTitle}>Alcohol Consumption</label>

          <div className="mt-2 flex flex-col gap-1 ml-2">
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="alcoholStatus"
                value="never"
                checked={form.alcoholStatus === "never"}
                onChange={handleChange("alcoholStatus")}
                className={choiceInputClass}
              />
              No, I don&apos;t drink
            </label>
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="alcoholStatus"
                value="current"
                checked={form.alcoholStatus === "current"}
                onChange={handleChange("alcoholStatus")}
                className={choiceInputClass}
              />
              Yes, I drink
            </label>
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="alcoholStatus"
                value="stopped"
                checked={form.alcoholStatus === "stopped"}
                onChange={handleChange("alcoholStatus")}
                className={choiceInputClass}
              />
              I used to drink, but I stopped
            </label>
          </div>

          {(form.alcoholStatus === "current" ||
            form.alcoholStatus === "stopped") && (
            <div className="mt-3 ml-2">
              <p className={smallLabel}>How often do you drink?</p>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="alcoholFrequency"
                    value="monthly"
                    checked={form.alcoholFrequency === "monthly"}
                    onChange={handleChange("alcoholFrequency")}
                    className={choiceInputClass}
                  />
                  Less than once a month
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="alcoholFrequency"
                    value="1-3-month"
                    checked={form.alcoholFrequency === "1-3-month"}
                    onChange={handleChange("alcoholFrequency")}
                    className={choiceInputClass}
                  />
                  1-3 times per month
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="alcoholFrequency"
                    value="1-2-week"
                    checked={form.alcoholFrequency === "1-2-week"}
                    onChange={handleChange("alcoholFrequency")}
                    className={choiceInputClass}
                  />
                  1-2 times per week
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="alcoholFrequency"
                    value="3-plus-week"
                    checked={form.alcoholFrequency === "3-plus-week"}
                    onChange={handleChange("alcoholFrequency")}
                    className={choiceInputClass}
                  />
                  3 or more times per week
                </label>
              </div>
              {errors.alcoholFrequency && (
                <p className="text-xs text-red-500 mt-2">{errors.alcoholFrequency}</p>
              )}
            </div>
          )}
        </div>

        <div className={cardBox}>
          <label className={labelTitle}>Drug Use</label>

          <div className="mt-2 flex flex-col gap-1 ml-2">
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="drugUseStatus"
                value="never"
                checked={form.drugUseStatus === "never"}
                onChange={handleChange("drugUseStatus")}
                className={choiceInputClass}
              />
              No
            </label>
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="drugUseStatus"
                value="current"
                checked={form.drugUseStatus === "current"}
                onChange={handleChange("drugUseStatus")}
                className={choiceInputClass}
              />
              Yes
            </label>
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="drugUseStatus"
                value="stopped"
                checked={form.drugUseStatus === "stopped"}
                onChange={handleChange("drugUseStatus")}
                className={choiceInputClass}
              />
              I used to, but I stopped
            </label>
          </div>

          {(form.drugUseStatus === "current" ||
            form.drugUseStatus === "stopped") && (
            <div className="mt-3 ml-2">
              <p className={smallLabel}>How often do you use drugs?</p>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="drugUseFrequency"
                    value="tried"
                    checked={form.drugUseFrequency === "tried"}
                    onChange={handleChange("drugUseFrequency")}
                    className={choiceInputClass}
                  />
                  Tried once or twice
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="drugUseFrequency"
                    value="occasional"
                    checked={form.drugUseFrequency === "occasional"}
                    onChange={handleChange("drugUseFrequency")}
                    className={choiceInputClass}
                  />
                  Occasionally
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="drugUseFrequency"
                    value="regular"
                    checked={form.drugUseFrequency === "regular"}
                    onChange={handleChange("drugUseFrequency")}
                    className={choiceInputClass}
                  />
                  Regularly
                </label>
              </div>
              {errors.drugUseFrequency && (
                <p className="text-xs text-red-500 mt-2">{errors.drugUseFrequency}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={cardBox}>
        <label className={labelTitle}>Stress Level</label>
        <div className="mt-2 flex gap-6 items-center ml-2 text-[14px] text-gray-700">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="stressLevel"
              value="low"
              checked={form.stressLevel === "low"}
              onChange={handleChange("stressLevel")}
              className={choiceInputClass}
            />
            Low
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="stressLevel"
              value="medium"
              checked={form.stressLevel === "medium"}
              onChange={handleChange("stressLevel")}
              className={choiceInputClass}
            />
            Medium
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="stressLevel"
              value="high"
              checked={form.stressLevel === "high"}
              onChange={handleChange("stressLevel")}
              className={choiceInputClass}
            />
            High
          </label>
        </div>
      </div>

      <div className={cardBox}>
        <h3 className="text-[16px] font-bold text-mainblack mb-1">Allergies</h3>

        <div className="mt-2">
          <label className={labelTitle}>Food allergies</label>
          <textarea
            className={textAreaBase}
            placeholder="Mention any food allergies (e.g. peanuts, seafood) or write 'None'"
            value={form.foodAllergies}
            maxLength={250}
            onChange={handleChange("foodAllergies")}
          />
        </div>

        <div className="mt-4">
          <label className={labelTitle}>Drug allergies</label>
          <textarea
            className={textAreaBase}
            placeholder="Mention any medicine allergies (e.g. penicillin) or write 'None'"
            value={form.drugAllergies}
            maxLength={250}
            onChange={handleChange("drugAllergies")}
          />
        </div>
      </div>
      </fieldset>

      {readOnly ? null : showButton ? (
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
            {isSaving ? "Saving..." : "Submit Lifestyle Info"}
          </button>
        </div>
      )}
    </form>
  );
}
