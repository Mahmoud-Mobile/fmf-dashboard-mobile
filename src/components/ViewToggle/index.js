import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import styles from "./Styles";

const ViewToggle = ({ viewMode, onToggle, containerStyle }) => {
  return (
    <View style={[styles.toggleContainer, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          viewMode === "grid" && styles.toggleButtonActive,
        ]}
        onPress={() => onToggle("grid")}
        activeOpacity={0.7}
      >
        <Ionicons
          name={viewMode === "grid" ? "grid" : "grid-outline"}
          size={18}
          color={viewMode === "grid" ? Colors.White : Colors.Primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          viewMode === "list" && styles.toggleButtonActive,
        ]}
        onPress={() => onToggle("list")}
        activeOpacity={0.7}
      >
        <Ionicons
          name={viewMode === "list" ? "list" : "list-outline"}
          size={18}
          color={viewMode === "list" ? Colors.White : Colors.Primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ViewToggle;

