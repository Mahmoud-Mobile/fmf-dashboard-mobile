import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors } from "../Global/colors";
import { Fonts } from "../Global/fonts";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

const DateSearchButton = ({ onPress, selectedDate, onClear, style }) => {
  const formatDate = (date) => {
    if (!date) return null;
    return moment(date).format("MMM DD, YYYY");
  };

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
          <MaterialIcons name="close" size={14} color={Colors.White} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.container, { width: selectedDate ? 120 : 50 }, style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="filter-list" size={22} color={Colors.Primary} />
          {selectedDate && (
            <Text style={styles.selectedDateText}>
              {formatDate(selectedDate)}
            </Text>
          )}
        </View>
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
    height: 50,
    backgroundColor: Colors.White,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clearButton: {
    position: "absolute",
    top: -5,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF0000",
    borderWidth: 1,
    borderColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  buttonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedDateText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Primary,
    marginLeft: 4,
  },
});

export default DateSearchButton;
