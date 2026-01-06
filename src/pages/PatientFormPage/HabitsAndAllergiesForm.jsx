import { useState } from "react";

const initialHabits = {
  smokingStatus: "",       // "never" | "current" | "stopped"
  smokingFrequency: "",    // one of defined options
  alcoholStatus: "",
  alcoholFrequency: "",
  drugUseStatus: "",
  drugUseFrequency: "",
  stressLevel: "",         // "low" | "medium" | "high"
  foodAllergies: "",
  drugAllergies: ""
};

export default function HabitsAndAllergiesForm({ onNext }) {
  const [form, setForm] = useState(initialHabits);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Habits & Allergies:", form);
    alert("Habits & allergies data saved (check console)");
  };

  // ✅ UI helper classes (only design)
  const sectionHeading = "text-xl font-bold text-mainblack mb-4";
  const labelTitle = "text-[15px] font-semibold text-gray-700";
  const smallLabel = "text-[14px] text-gray-700 mb-1";
  const cardBox =
    "border border-gray-300 rounded-xl bg-white shadow-sm p-4 space-y-2";
  const textAreaBase =
    "mt-1 w-full min-h-[70px] px-3 py-2 rounded-md bg-gray-100 border text-[15px] text-gray-700 " +
    "focus:ring-2 focus:ring-secondary focus:border-secondary outline-none resize-y transition";

  return (
    <form onSubmit={handleSubmit} className="text-mainblack space-y-6">
      <h2 className={sectionHeading}>Lifestyle & Habits</h2>

      {/* TOP 3 – Smoking / Alcohol / Drug use */}
      <div className="grid lg:grid-cols-3  grid-cols-1 gap-4">
        {/* Smoking */}
        <div className={cardBox}>
          <label className={labelTitle}>Smoking</label>

          {/* Status */}
          <div className="mt-2 flex flex-col gap-1 ml-2">
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="smokingStatus"
                value="never"
                checked={form.smokingStatus === "never"}
                onChange={handleChange("smokingStatus")}
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
              />
              I used to smoke, but I stopped
            </label>
          </div>

          {/* Frequency – only if current or stopped */}
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
                  />
                  1–5 cigarettes per day
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="smokingFrequency"
                    value="6-10"
                    checked={form.smokingFrequency === "6-10"}
                    onChange={handleChange("smokingFrequency")}
                  />
                  6–10 cigarettes per day
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="smokingFrequency"
                    value="10-plus"
                    checked={form.smokingFrequency === "10-plus"}
                    onChange={handleChange("smokingFrequency")}
                  />
                  More than 10 per day
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Alcohol Consumption */}
        <div className={cardBox}>
          <label className={labelTitle}>Alcohol Consumption</label>

          {/* Status */}
          <div className="mt-2 flex flex-col gap-1 ml-2">
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="alcoholStatus"
                value="never"
                checked={form.alcoholStatus === "never"}
                onChange={handleChange("alcoholStatus")}
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
              />
              I used to drink, but I stopped
            </label>
          </div>

          {/* Frequency – only if drinks now or stopped */}
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
                  />
                  1–3 times per month
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="alcoholFrequency"
                    value="1-2-week"
                    checked={form.alcoholFrequency === "1-2-week"}
                    onChange={handleChange("alcoholFrequency")}
                  />
                  1–2 times per week
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-700">
                  <input
                    type="radio"
                    name="alcoholFrequency"
                    value="3-plus-week"
                    checked={form.alcoholFrequency === "3-plus-week"}
                    onChange={handleChange("alcoholFrequency")}
                  />
                  3 or more times per week
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Drug Use */}
        <div className={cardBox}>
          <label className={labelTitle}>Drug Use</label>

          {/* Status */}
          <div className="mt-2 flex flex-col gap-1 ml-2">
            <label className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="radio"
                name="drugUseStatus"
                value="never"
                checked={form.drugUseStatus === "never"}
                onChange={handleChange("drugUseStatus")}
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
              />
              I used to, but I stopped
            </label>
          </div>

          {/* Frequency – only if current or stopped */}
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
                  />
                  Regularly
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stress Level */}
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
            />
            High
          </label>
        </div>
      </div>

      {/* Allergies Section */}
      <div className={cardBox}>
        <h3 className="text-[16px] font-bold text-mainblack mb-1">Allergies</h3>

        {/* Food allergies */}
        <div className="mt-2">
          <label className={labelTitle}>Food allergies</label>
          <textarea
            className={textAreaBase}
            placeholder="Mention any food allergies (e.g. peanuts, seafood) or write 'None'"
            value={form.foodAllergies}
            onChange={handleChange("foodAllergies")}
          />
        </div>

        {/* Drug allergies */}
        <div className="mt-4">
          <label className={labelTitle}>Drug allergies</label>
          <textarea
            className={textAreaBase}
            placeholder="Mention any medicine allergies (e.g. penicillin) or write 'None'"
            value={form.drugAllergies}
            onChange={handleChange("drugAllergies")}
          />
        </div>
      </div>

      <div className="mt-2 flex justify-end">
        {/* <button
        type="button"
        className="px-5 py-2 bg-secondary/90 hover:bg-secondary text-white rounded-full text-[15px] font-semibold"
        onClick={() => {
          // if you want validation later, put it here
          onNext(); // ✅ GO TO NEXT PAGE
        }}
      >
        Next
      </button> */}
      </div>
    </form>
  );
}