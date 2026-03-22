import { Trash2 } from "lucide-react";

export default function DeleteConfirmationToast({
  title,
  message,
  onCancel,
  onConfirm,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}) {
  return (
    <div className="pointer-events-auto w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-3xl border border-red-100 bg-white shadow-[0_24px_60px_rgba(15,79,82,0.18)]">
      <div className="h-1.5 bg-gradient-to-r from-red-500 via-[#F97316] to-[#F59E0B]" />

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <Trash2 className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-[#0F4F52]">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-[#D3F0ED] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F4F52] transition hover:bg-[#F7FCFB]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-full bg-gradient-to-r from-red-500 to-[#F97316] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
