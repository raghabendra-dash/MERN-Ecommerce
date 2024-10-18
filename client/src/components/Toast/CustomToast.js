import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

// Helper function to trigger toasts based on type
export const triggerCustomToast = (
  type = "info",
  title = "Backend Initialization: Please wait a moment while the server starts up. If the loading indicator persists, it may take a minute to complete.",
) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Zoom,
  };

  switch (type) {
    case "success":
      return toast.success(title);

    case "warning":
      return toast.warning(title);

    case "error":
      return toast.error(title);

    default: // Default to info if type doesn't match any cases
      return toast.info(title, toastOptions);
  }
};
