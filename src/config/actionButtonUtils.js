import { useSelector } from "react-redux";

export const filterActionButtonsByVisibility = (actionButtons) => {
  const actionButtonVisibility =
    useSelector?.((state) => state.ui?.actionButtonVisibility) || {};

  if (!actionButtons || !Array.isArray(actionButtons)) {
    return [];
  }

  return actionButtons.filter((button) => {
    if (!button || !button.text) {
      return true;
    }

    const storedValue = actionButtonVisibility[button.text];
    // Default to visible (true) if not set
    const isVisible =
      storedValue === undefined
        ? true
        : typeof storedValue === "string"
        ? storedValue === "true"
        : Boolean(storedValue);

    return isVisible;
  });
};

export const useFilterActionButtons = (actionButtons) => {
  const actionButtonVisibility =
    useSelector((state) => state.ui?.actionButtonVisibility) || {};

  if (!actionButtons || !Array.isArray(actionButtons)) {
    return [];
  }

  return actionButtons.filter((button) => {
    if (!button || !button.text) {
      return true;
    }

    const storedValue = actionButtonVisibility[button.text];
    const isVisible =
      storedValue === undefined
        ? true
        : typeof storedValue === "string"
        ? storedValue === "true"
        : Boolean(storedValue);

    return isVisible;
  });
};
