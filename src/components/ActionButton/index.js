import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";

const ActionButton = ({
  name,
  icon,
  onPress,
  isCompleted = false,
  style = {},
}) => {
  const renderIcon = () => {
    // You can replace these with actual icon components
    switch (icon) {
      case "plane":
        return <Text style={styles.iconText}>✈️</Text>;
      case "luggage":
        return <Text style={styles.iconText}>🧳</Text>;
      case "person":
        return <Text style={styles.iconText}>👋</Text>;
      case "car":
        return <Text style={styles.iconText}>🚗</Text>;
      case "hotel":
        return <Text style={styles.iconText}>🏨</Text>;
      default:
        return <Text style={styles.iconText}>📋</Text>;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        isCompleted && styles.actionButtonCompleted,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isCompleted ? (
        <LinearGradient
          colors={Colors.PrimaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <View style={styles.actionButtonIcon}>{renderIcon()}</View>
          <Text style={styles.actionButtonCompletedText}>{name}</Text>
          <View style={styles.actionButtonCheck}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        </LinearGradient>
      ) : (
        <>
          <View style={styles.actionButtonIcon}>{renderIcon()}</View>
          <Text style={styles.actionButtonText}>{name}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = {
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  actionButtonCompleted: {
    backgroundColor: "#F0F9FF",
    borderColor: "#BFDBFE",
  },
  actionButtonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 16,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#374151",
    flex: 1,
    textAlign: "center",
  },
  actionButtonCompletedText: {
    color: Colors.White,
  },
  gradientButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  actionButtonCheck: {
    width: 16,
    height: 16,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: {
    fontSize: 12,
    color: "#059669",
    fontFamily: Fonts.FONT_BOLD,
  },
};

export default ActionButton;
