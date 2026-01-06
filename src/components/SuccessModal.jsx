/**
 * thathsara
 * Reusable Success Modal Component
 * Location: src/components/SuccessModal.jsx
 *
 * Usage:
 * <SuccessModal
 *   show={showModal}
 *   title="Registration Successful!"
 *   message="Your account has been created successfully."
 *   buttonText="Continue to Dashboard"
 *   onClose={handleModalClose}
 * />
 */

export default function SuccessModal({
  show,
  title = "Success!",
  message = "Operation completed successfully.",
  buttonText = "Continue",
  onClose,
  iconType = "checkmark", // "checkmark" or "custom"
}) {
  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-[scaleIn_0.3s_ease-out]">
          {/* Success Icon */}
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-8 flex justify-center">
            <div className="bg-white rounded-full p-4 animate-[bounceIn_0.5s_ease-out]">
              {iconType === "checkmark" ? (
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                // You can add custom icon here if needed
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-secondary to-primary text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }

        @keyframes bounceIn {
          0% { 
            opacity: 0;
            transform: scale(0.3); 
          }
          50% { 
            transform: scale(1.05); 
          }
          100% { 
            opacity: 1;
            transform: scale(1); 
          }
        }
      `}</style>
    </>
  );
}
