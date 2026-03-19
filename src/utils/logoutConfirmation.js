import { createElement } from "react";
import toast from "react-hot-toast";
import LogoutConfirmationToast from "../components/LogoutConfirmationToast";

const LOGOUT_CONFIRMATION_TOAST_ID = "logout-confirmation";

export function confirmLogout(message = "Are you sure you want to log out?") {
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
      toast.dismiss(LOGOUT_CONFIRMATION_TOAST_ID);
      resolveOnce(value);
    };

    toast.custom(
      () =>
        createElement(LogoutConfirmationToast, {
          message,
          onCancel: () => closeToast(false),
          onConfirm: () => closeToast(true),
        }),
      {
        id: LOGOUT_CONFIRMATION_TOAST_ID,
        duration: Infinity,
        position: "top-center",
      },
    );
  });
}
