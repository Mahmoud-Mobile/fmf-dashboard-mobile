import React from "react";
import { View } from "react-native";
import SwipeToggle from "./SwipeToggle";
import styles from "./Styles";

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
}) => {
  return (
    <SwipeToggle
      title={swipeTitle || text || "Swipe to submit"}
      onSwipeSuccess={onSwipeSuccess || onPress}
      disabled={disabled}
      containerStyle={swipeContainerStyle || style}
      disabledText={disabledText}
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
