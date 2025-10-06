import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../Global/colors";
import styles from "./Styles";
const CustomPressable = ({
  onPress,
  title,
  style,
  isLoading,
  disabled,
  textColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }, style]}
    >
      <LinearGradient
        colors={["#880CB9", "#368BBA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, { borderRadius: 10 }]}
      >
        {isLoading ? (
          <ActivityIndicator
            color={Colors.WhiteColor}
            size="small"
            style={{ paddingVertical: 20 }}
          />
        ) : (
          <Text
            style={[
              styles.buttonText,
              { color: textColor ? textColor : "#ffffff" },
            ]}
          >
            {title}
          </Text>
        )}
      </LinearGradient>
    </Pressable>
  );
};

export default CustomPressable;
