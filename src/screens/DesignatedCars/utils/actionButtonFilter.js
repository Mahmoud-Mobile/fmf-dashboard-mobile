import { useSelector } from "react-redux";

export const useActionButtonFilter = () => {
  const actionButtonVisibility =
    useSelector((state) => state.ui?.actionButtonVisibility) || {};

  const filterActionButtons = (buttons) => {
    if (!buttons || !Array.isArray(buttons)) return [];
    return buttons.filter((button) => {
      if (!button || !button.text) return true;
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

  return filterActionButtons;
};

