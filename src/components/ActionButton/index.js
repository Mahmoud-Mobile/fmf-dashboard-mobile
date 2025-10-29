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

  flex,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style?.width ? null : { flex: flex !== undefined ? flex : 1 },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={colors ? colors : ["#374151", "#374151"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <MaterialIcons name={icon} size={iconSize} color="#FFFFFF" />
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </View>
      </LinearGradient>
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
