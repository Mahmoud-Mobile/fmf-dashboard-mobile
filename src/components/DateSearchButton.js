import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";

const DateSearchButton = ({ onPress, selectedDate, onClear, style }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {selectedDate && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClear}
          activeOpacity={0.7}
        >
          <MaterialIcons name="close" size={12} color={Colors.White} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name="filter-list"
          size={20}
          color={Colors.SecondaryText}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    alignItems: "center",
  },
  container: {
    width: 40,
    height: 45,
    backgroundColor: Colors.White,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    position: "absolute",
    top: -5,
    right: 0,
    borderRadius: 8,
    backgroundColor: Colors.Error,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});

export default DateSearchButton;
