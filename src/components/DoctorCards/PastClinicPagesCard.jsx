//thathsara
export function PastClinicPagesCard({ pastPages = [], onViewPage }) {
  const cardBox = "border border-gray-300 rounded-xl bg-white shadow-sm p-4";

  return (
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
                onClick={() => onViewPage(page)}
                className="px-3 py-1 text-xs bg-secondary text-white rounded hover:bg-secondary/90 transition"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
