//thathsara
import { useState } from "react";

export function PastClinicPagesCard({ pastPages = [], onViewPage }) {
  const [viewingPage, setViewingPage] = useState(null);
  const cardBox = "border border-gray-300 rounded-xl bg-white shadow-sm p-4";

  const handleViewPage = (page) => {
    if (onViewPage) {
      onViewPage(page);
    } else {
      setViewingPage(page);
    }
  };

  const closeModal = () => {
    setViewingPage(null);
  };
  return (
    <>
      <div className={cardBox}>
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          Past Clinic Pages
        </h3>

        {pastPages.length === 0 ? (
          <p className="text-sm text-gray-500">No previous pages</p>
        ) : (
          <div className="space-y-2">
            {pastPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Visit on {page.date}
                  </p>
                  <p className="text-xs text-gray-600">{page.time}</p>
                </div>
                <button
                  onClick={() => handleViewPage(page)}
                  className="px-3 py-1 text-xs bg-secondary text-white rounded hover:bg-secondary/90 transition"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {viewingPage && !onViewPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Clinic Page - {viewingPage.date}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <strong>Reason:</strong> {viewingPage.reason}
              </div>
              <div>
                <strong>Time:</strong> {viewingPage.time}
              </div>

              <p className="text-gray-600 mt-4">
                This is a locked, read-only view of a completed clinic page.
              </p>
              <p className="text-xs text-gray-500">
                In the real application, this would show all examination notes,
                vital signs, and medication details from that visit.
              </p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
