import { LogOut } from "lucide-react";

export default function LogoutConfirmationToast({
  message,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="pointer-events-auto w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-3xl border border-[#D3F0ED] bg-white shadow-[0_24px_60px_rgba(15,79,82,0.18)]">
      <div className="h-1.5 bg-gradient-to-r from-[#18AAB0] via-[#42B59F] to-[#86C443]" />

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7F6] text-[#0F4F52]">
            <LogOut className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-[#0F4F52]">
              Confirm Logout
            </h3>
            <p className="mt-1 text-sm leading-6 text-gray-600">{message}</p>
            <p className="mt-2 text-xs text-gray-400">
              You can sign back in at any time.
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-[#D3F0ED] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F4F52] transition hover:bg-[#F7FCFB]"
          >
            Stay Signed In
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-full bg-gradient-to-r from-[#0F4F52] to-[#18AAB0] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
