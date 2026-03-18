export function confirmLogout(
  message = "Are you sure you want to log out?",
) {
  if (typeof window === "undefined" || typeof window.confirm !== "function") {
    return true;
  }

  return window.confirm(message);
}
