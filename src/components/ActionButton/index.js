import React from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SwipeToggle from "./SwipeToggle";
import styles from "./Styles";
import { setIconDisabled } from "../../redux/reducers/uiReducer";

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
  iconId,
}) => {
  const dispatch = useDispatch();
  const disabledIcons = useSelector(
    (state) => state.ui?.disabledIcons ?? EMPTY_DISABLED_ICONS,
    (left, right) => {
      if (left === right) return true;
      if (!left || !right) return false;
      const leftKeys = Object.keys(left);
      const rightKeys = Object.keys(right);
      if (leftKeys.length !== rightKeys.length) return false;
      return leftKeys.every((key) => left[key] === right[key]);
    }
  );

  const isIconDisabled = iconId ? disabledIcons[iconId] : false;

  const isDisabled = disabled !== undefined ? disabled : isIconDisabled;

  const handleSwipeSuccess = () => {
    if (iconId && !isIconDisabled) {
      dispatch(setIconDisabled({ iconId, disabled: true }));
    }

    if (onSwipeSuccess) {
      onSwipeSuccess();
    } else if (onPress) {
      onPress();
    }
  };

  const getDisabledText = () => {
    if (isIconDisabled) {
      const actionText = text || swipeTitle || "Action";
      return disabledText || `${actionText} - Done`;
    }
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
