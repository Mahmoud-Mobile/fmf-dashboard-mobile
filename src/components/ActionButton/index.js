import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";
import { Colors } from "../../Global/colors";

const ActionButton = ({
  icon,
  text,
  onPress,
  style,
  textStyle,
  flex,
  isSelected = false,
  disabled = false,
}) => {
  const isButtonActive = isSelected && !disabled;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isButtonActive ? styles.buttonActive : styles.buttonInactive,
        style?.width ? null : { flex: flex !== undefined ? flex : 1 },
        style,
        disabled && { opacity: 0.5 },
      ]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.8}
      disabled={disabled}
    >
      <MaterialIcons
        name={icon}
        size={12}
        color={isButtonActive ? Colors.White : Colors.Black}
      />
      <Text
        style={[
          styles.text,
          isButtonActive ? styles.textActive : styles.textInactive,
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
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
