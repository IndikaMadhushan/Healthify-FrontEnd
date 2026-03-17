import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { createSiteReview } from "../api/SiteReviewApi";

const MAX_CHARS = 300;

export default function AddReviewModal({ isOpen, onClose, onSubmitted }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setReview("");
      setRating(0);
      setHoveredRating(0);
      setSubmitting(false);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleReviewChange = (event) => {
    const nextValue = event.target.value.replace(/\r/g, "").slice(0, MAX_CHARS);
    setReview(nextValue);

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async () => {
    const trimmedReview = review.trim();

    if (!rating) {
      setError("Please rate your experience");
      return;
    }

    if (!trimmedReview) {
      setError("Please tell us about your experience");
      return;
    }

    try {
      setSubmitting(true);
      const response = await createSiteReview({
        rating,
        review: trimmedReview,
      });
      toast.success("Your review was submitted for admin approval.");
      setError("");
      onSubmitted?.(response);
    } catch (submissionError) {
      setError(
        submissionError?.response?.data?.message ||
          submissionError?.response?.data?.error ||
          submissionError?.message ||
          "Failed to submit your review",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-semibold text-[#0F4F52]">
              Tell Us About Your Experience
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              How has Healthify been working for you so far?
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            x
          </button>
        </div>

        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Rate your experience
          </p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const activeStar = star <= (hoveredRating || rating);

              return (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => {
                    setRating(star);
                    setError("");
                  }}
                  className="text-3xl transition-transform hover:scale-110"
                >
                  <FaStar
                    className={
                      activeStar ? "text-amber-400" : "text-gray-300"
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Your review
          </label>
          <textarea
            value={review}
            onChange={handleReviewChange}
            rows={5}
            placeholder="Share what you like, what could be improved, or how Healthify helped you."
            className="mt-2 w-full rounded-2xl border border-gray-300 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary"
            maxLength={MAX_CHARS}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>Required</span>
            <span>{review.length}/{MAX_CHARS}</span>
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
          >
            Maybe Later
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-5 py-2 rounded-xl bg-secondary text-white text-sm hover:bg-secondary/90 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
