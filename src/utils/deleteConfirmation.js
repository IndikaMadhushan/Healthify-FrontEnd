import { createElement } from "react";
import toast from "react-hot-toast";
import DeleteConfirmationToast from "../components/DeleteConfirmationToast";

const DELETE_CONFIRMATION_TOAST_ID = "delete-confirmation";

export function confirmDeletion({
  title = "Delete reminder?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
} = {}) {
  if (typeof window === "undefined") {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    let settled = false;

    const resolveOnce = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    const closeToast = (value) => {
      toast.dismiss(DELETE_CONFIRMATION_TOAST_ID);
      resolveOnce(value);
    };

    toast.custom(
      () =>
        createElement(DeleteConfirmationToast, {
          title,
          message,
          confirmLabel,
          cancelLabel,
          onCancel: () => closeToast(false),
          onConfirm: () => closeToast(true),
        }),
      {
        id: DELETE_CONFIRMATION_TOAST_ID,
        duration: Infinity,
        position: "top-center",
      },
    );
  });
}
