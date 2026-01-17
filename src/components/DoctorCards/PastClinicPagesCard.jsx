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
          <div className="space-y-2 max-h-64 overflow-y-auto">
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
                <strong>Date:</strong> {viewingPage.date}
              </div>
              <div>
                <strong>Time:</strong> {viewingPage.time}
              </div>
              <div>
                <strong>Reason:</strong> {viewingPage.reason}
              </div>

              {viewingPage.fullData && (
                <>
                  <div>
                    <strong>Examination Notes:</strong>{" "}
                    {viewingPage.fullData.pageData.examinationNotes || "—"}
                  </div>

                  <div>
                    <strong>Blood Pressure:</strong>{" "}
                    {viewingPage.fullData.pageData.bloodPressure || "—"}
                  </div>

                  <div>
                    <strong>Pulse:</strong>{" "}
                    {viewingPage.fullData.pageData.pulse || "—"}
                  </div>

                  <div>
                    <strong>Temperature:</strong>{" "}
                    {viewingPage.fullData.pageData.temperature || "—"}
                  </div>

                  <div>
                    <strong>Medication:</strong>{" "}
                    {viewingPage.fullData.pageData.medication || "—"}
                  </div>
                  <div>
                    <strong>Suggested Tests:</strong>{" "}
                    {viewingPage.fullData.pageData.suggestedTests || "—"}
                  </div>

                  <div>
                    <strong>Doctor Note:</strong>{" "}
                    {viewingPage.fullData.pageData.doctorNote || "—"}
                  </div>

                  <div>
                    <strong>Next Consultation Date:</strong>{" "}
                    {viewingPage.fullData.pageData.nextClinicDate || "—"}
                  </div>
                </>
              )}

              {!viewingPage.fullData && (
                <p className="text-gray-500 text-sm">
                  Detailed clinic data not available.
                </p>
              )}
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
