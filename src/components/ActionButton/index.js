import React, { useMemo } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SwipeToggle from "./SwipeToggle";
import styles from "./Styles";
import { setIconDisabled } from "../../redux/reducers/uiReducer";

// Stable empty object to avoid creating new references
const EMPTY_DISABLED_ICONS = {};

const ActionButton = ({
  text,
  onPress,
  style,
  disabled = false,
  swipeTitle,
  onSwipeSuccess,
  swipeContainerStyle,
  disabledText,
  icon,
  iconId, // Unique identifier for the icon (e.g., "flight-land-123")
}) => {
  const dispatch = useDispatch();
  const disabledIcons = useSelector(
    (state) => state.ui?.disabledIcons ?? EMPTY_DISABLED_ICONS,
    (left, right) => {
      // Custom equality check to prevent unnecessary rerenders
      if (left === right) return true;
      if (!left || !right) return false;
      const leftKeys = Object.keys(left);
      const rightKeys = Object.keys(right);
      if (leftKeys.length !== rightKeys.length) return false;
      return leftKeys.every((key) => left[key] === right[key]);
    }
  );

  // Check if this specific icon is disabled in Redux
  const isIconDisabled = iconId ? disabledIcons[iconId] : false;

  // Combined disabled state: either prop disabled or Redux disabled
  const isDisabled = disabled || isIconDisabled;

  const handleSwipeSuccess = () => {
    // If iconId is provided, disable the icon after successful swipe
    if (iconId && !isIconDisabled) {
      dispatch(setIconDisabled({ iconId, disabled: true }));
    }

    // Call the original onSwipeSuccess or onPress
    if (onSwipeSuccess) {
      onSwipeSuccess();
    } else if (onPress) {
      onPress();
    }
  };

  // If icon is disabled via Redux (completed), show "Done" status
  // Otherwise use provided disabledText or default
  const getDisabledText = () => {
    if (isIconDisabled) {
      // Action was completed - show action text with " - Done"
      const actionText = text || swipeTitle || "Action";
      return disabledText || `${actionText} - Done`;
    }
    // Regular disabled state (not completed)
    return disabledText || text || swipeTitle || "Disabled";
  };

  const finalDisabledText = getDisabledText();

  return (
    <SwipeToggle
      title={swipeTitle || text || "Swipe to submit"}
      onSwipeSuccess={handleSwipeSuccess}
      disabled={isDisabled}
      containerStyle={swipeContainerStyle || style}
      disabledText={finalDisabledText}
      icon={icon}
    />
  );
};

const ActionButtonGroup = ({ buttons, containerStyle }) => {
  return (
    <View style={[styles.buttonGroup, containerStyle]}>
      {buttons.map((button, index) => (
        <ActionButton key={index} {...button} />
      ))}
    </View>
  );
};

export default ActionButton;
export { ActionButton, ActionButtonGroup };
export { default as SwipeToggle } from "./SwipeToggle";
