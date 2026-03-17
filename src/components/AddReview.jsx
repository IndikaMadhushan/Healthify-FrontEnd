


// import { useState } from "react";

// const MAX_CHARS = 200;

// export default function AddReviewModal({ isOpen, onClose }) {
//   const [review, setReview] = useState("");

//   if (!isOpen) return null;

//   // STRICT character control
//   const handleChange = (e) => {
//     const value = e.target.value;

//     // Hard limit characters
//     if (value.length <= MAX_CHARS) {
//       setReview(value);
//     }
//   };

//   const charCount = review.length;

//   const handleSubmit = () => {
//     if (!review.trim()) return;

//     // frontend only
//     localStorage.setItem("reviewStatus", "PENDING");

//     alert("Thank you! Your review has been submitted for admin approval.");
//     setReview("");
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Write a Review
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Description */}
//         <p className="text-sm text-gray-500 mb-3">
//           Share your experience in a short sentence.
//         </p>

//         {/* Textarea */}
//         <textarea
//           value={review}
//           onChange={handleChange}
//           rows={3}
//           placeholder="Good experience. Helpful notifications..."
//           className="w-full h-32 rounded-xl border border-gray-300 p-3 text-sm resize-none
//                      focus:outline-none focus:border-indigo-400"
//         />

//         {/* Character Counter */}
//         <div className="flex justify-between items-center mt-2 text-xs">
//           <span className="text-gray-500">
//             {charCount}/{MAX_CHARS}
//           </span>

//           {charCount === MAX_CHARS && (
//             <span className="text-indigo-600">
//               Limit reached
//             </span>
//           )}
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSubmit}
//             disabled={!review.trim()}
//             className={`px-4 py-2 text-sm rounded-lg text-white
//               ${
//                 !review.trim()
//                   ? "bg-indigo-300 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700"
//               }
//             `}
//           >
//             Submit Review
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { addReview } from "../api/reviewApi";

const MAX_CHARS = 200;

export default function AddReviewModal({ isOpen, onClose }) {
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setReview(value);
    }
  };

 const handleSubmit = async () => {
  if (!review.trim()) return;

  try {
    await addReview({ review });

    // keep your existing logic
    localStorage.setItem("reviewStatus", "PENDING");

    setSubmitted(true);

  } catch (error) {
    console.error("Error submitting review", error);
    alert("Failed to submit review");
  }
};
  const handleClose = () => {
    setReview("");
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {submitted ? "Review Submitted" : "Write a Review"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        {!submitted ? (
          <>
            <p className="text-sm text-gray-500 mb-3">
              Share your experience in a short sentence.
            </p>

            <textarea
              value={review}
              onChange={handleChange}
              rows={3}
              placeholder="Good experience. Helpful notifications..."
              className="w-full h-32 rounded-xl border border-gray-300 p-3 text-sm resize-none
                         focus:outline-none focus:border-secondary/40"
            />

            {/* Character Counter */}
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>{review.length}/{MAX_CHARS}</span>
              {review.length === MAX_CHARS && (
                <span className="text-secondary/85">
                  Limit reached
                </span>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={!review.trim()}
                className={`px-4 py-2 text-sm rounded-lg text-white
                  ${
                    !review.trim()
                      ? "bg-secondary/50 cursor-not-allowed"
                      : "bg-secondary/85 hover:bg-secondary"
                  }
                `}
              >
                Submit Review
              </button>
            </div>
          </>
        ) : (
          /* ✅ SUCCESS UI */
          <div className="text-center py-10">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center
                            rounded-full bg-secondary/10 text-secondary text-2xl">
              ✓
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Thank you!
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Your review has been submitted successfully.
              <br />
              It will be visible after admin approval.
            </p>

            <button
              onClick={handleClose}
              className="px-6 py-2 rounded-lg bg-secondary/85
                         text-white hover:bg-secondary text-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
