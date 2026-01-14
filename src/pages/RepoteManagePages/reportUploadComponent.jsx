import React, { useState, useRef } from "react";

/**
 * ReportUploader.jsx
 * Single-file React component using TailwindCSS.
 *
 * Usage: import ReportUploader from "./ReportUploader"; <ReportUploader />
 *
 * Notes:
 * - Accepts images and PDFs (you can extend accept list).
 * - Uses URL.createObjectURL for previews (no upload to server).
 * - Title limited to 30 chars.
 */

export default function Uploader(props) {
  const fileInputRef = useRef(null);

  const [showTitleModal, setShowTitleModal] = useState(false);
  const [pendingFile, setPendingFile] = useState(null); // File object waiting for title
  const [titleText, setTitleText] = useState("");
  const [reports, setReports] = useState([]); // { id, title, name, url, type, uploadedAt }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewing, setViewing] = useState(null); // report object to view in modal

  // handle file selection
  const onFileSelected = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setPendingFile(f);
    setTitleText(f.name.replace(/\.[^/.]+$/, "").slice(0, 30)); // default title = filename (trim)
    setShowTitleModal(true);
    // reset input so selecting same file again possible
    e.target.value = null;
  };

  // confirm title + create report card
  const confirmAdd = () => {
    if (!pendingFile) return;
    const id = Date.now().toString();
    const url = URL.createObjectURL(pendingFile);
    const type = pendingFile.type || (pendingFile.name.endsWith(".pdf") ? "application/pdf" : "application/octet-stream");
    const newReport = {
      id,
      title: titleText.trim() || "Untitled",
      name: pendingFile.name,
      url,
      type,
      uploadedAt: new Date().toISOString(),
    };
    setReports((s) => [newReport, ...s]); // newest first
    setPendingFile(null);
    setTitleText("");
    setShowTitleModal(false);
  };

  // cancel adding
  const cancelAdd = () => {
    if (pendingFile) {
      // revoke object URL if we created any earlier (we create only on confirm)
      setPendingFile(null);
    }
    setTitleText("");
    setShowTitleModal(false);
  };

  // format uploadedAt nicely
  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString(); // user's locale; change if you prefer specific format
    } catch {
      return iso;
    }
  };

  // download helper (anchor download uses file name)
  const downloadReport = (r) => {
    const a = document.createElement("a");
    a.href = r.url;
    a.download = r.name || `${r.title}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      

      {/* Upload area */}
      <div className="mb-6 bg-white shadow rounded p-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <p className="md:text-md text-sm text-gray-600">{props.title}</p>
          <div className="mt-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-secondary/80 text-sm text-white rounded shadow hover:bg-secondary"
            >
              Upload Report
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              onChange={onFileSelected}
            />
          </div>
        </div>

        {/* Quick hint / count */}
        <div className="text-right">
          <div className="md:text-md text-sm text-gray-500">Total Files</div>
          <div className="text-lg font-medium">{reports.length}</div>
        </div>
      </div>

      {/* If no reports yet, show message */}
      {reports.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No Uploaded files
        </div>
      ) : null}

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2 sm:m-0">
        {reports.map((r) => (
          <div key={r.id} className="bg-white rounded shadow overflow-hidden">
            {/* thumbnail */}
            <button
              onClick={() => setViewing(r)}
              className="w-full block text-left"
            >
              <div className="h-40 w-full flex items-center justify-center bg-gray-50">
                {r.type.startsWith("image/") ? (
                  // image preview
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img src={r.url} alt={`Preview ${r.title}`} className="h-full object-contain" />
                ) : r.type === "application/pdf" || r.name.toLowerCase().endsWith(".pdf") ? (
                  <div className="flex flex-col items-center justify-center p-4">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v7h6" />
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    <div className="text-sm text-gray-600">PDF Report</div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 px-3">Preview not available</div>
                )}
              </div>

              {/* title + meta */}
              <div className="p-3 border-t">
                <div className="font-medium truncate">{r.title}</div>
                <div className="text-xs text-gray-500 mt-1">{r.name}</div>
                <div className="text-xs text-gray-400 mt-2">{formatDate(r.uploadedAt)}</div>
              </div>
            </button>

            {/* card footer actions */}
            <div className="flex items-center justify-between p-2 border-t">
              <button
                onClick={() => setViewing(r)}
                className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
              >
                View
              </button>
              <div className="flex gap-1">
                <button
                  onClick={() => downloadReport(r)}
                  className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50"
                >
                  Download
                </button>
               
               {/* //delete */}
                <button
                  onClick={() => setDeleteTarget(r)}
                  className="px-2 py-1 text-xs text-red-600 border border-red-100 rounded hover:bg-red-50"
                >
                    Delete
                </button>

              {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5">

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Delete report?
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                      Are you sure you want to delete
                      <span className="font-medium"> "{deleteTarget.title}"</span>?
                      This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setDeleteTarget(null)}
                        className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => {
                          URL.revokeObjectURL(deleteTarget.url);
                          setReports((s) =>
                            s.filter((x) => x.id !== deleteTarget.id)
                          );
                          setDeleteTarget(null);
                        }}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Title modal */}
      {showTitleModal && pendingFile && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-lg w-full max-w-md p-5">
            <h3 className="text-sm font-semibold mb-3">Report Title </h3>
            <input
              value={titleText}
              onChange={(e) => {
                if (e.target.value.length <= 30) setTitleText(e.target.value);
              }}
              placeholder="Title "
              className="w-full p-2 border rounded mb-2"
            />
            <div className="text-xs text-gray-500 mb-3">Characters: {titleText.length}/30</div>
            <div className="flex justify-end gap-2 text-sm">
              <button onClick={cancelAdd} className="px-3 py-1 rounded border">Cancel</button>
              <button onClick={confirmAdd} className="px-3 py-1 rounded bg-secondary text-white">OK</button>
            </div>
          </div>
        </div>
      )}

      {/* Viewing modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/70 items-stretch">
          <div className="flex items-center justify-between p-3 bg-white/90">
            <div>
              <div className="font-medium">{viewing.title}</div>
              <div className="text-sm text-gray-600">{viewing.name} • {formatDate(viewing.uploadedAt)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadReport(viewing)}
                className="px-3 py-1 bg-white border rounded"
              >
                Download
              </button>
              <button
                onClick={() => {
                  setViewing(null);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            {viewing.type.startsWith("image/") ? (
              <img src={viewing.url} alt={viewing.title} className="max-h-[80vh] object-contain" />
            ) : viewing.type === "application/pdf" || viewing.name.toLowerCase().endsWith(".pdf") ? (
              // embed pdf: fallback to object -> iframe
              <object data={viewing.url} type="application/pdf" width="100%" height="80%">
                <iframe src={viewing.url} title={viewing.title} className="w-full h-[80vh]" />
              </object>
            ) : (
              <div className="text-white">Preview not supported for this file type. Please download to open.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}