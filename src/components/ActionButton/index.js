import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const ActionButton = ({
  colors,
  icon,
  text,
  onPress,
  style,
  iconSize = 14,
  textStyle,
  iconOnly = false,
  flex,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style?.width ? null : { flex: flex !== undefined ? flex : 1 },
        iconOnly && styles.iconOnlyButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={colors ? colors : ["#f4f6fc", "#f4f6fc"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, iconOnly && styles.iconOnlyGradient]}
      >
        <View style={[styles.content, iconOnly && styles.iconOnlyContent]}>
          <MaterialIcons
            name={icon}
            size={iconOnly ? iconSize || 18 : iconSize}
            color="#374151"
          />
          {!iconOnly && <Text style={[styles.text, textStyle]}>{text}</Text>}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const ActionButtonGroup = ({ buttons, containerStyle, iconOnly = false }) => {
  return (
    <View style={[styles.buttonGroup, containerStyle]}>
      {buttons.map((button, index) => (
        <ActionButton key={index} {...button} iconOnly={iconOnly} />
      ))}
    </View>
  );
};

export default ActionButton;
export { ActionButton, ActionButtonGroup };
