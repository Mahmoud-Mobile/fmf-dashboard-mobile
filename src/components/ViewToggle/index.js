import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Styles";
import { Colors } from "../../Global/colors";

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
        <Ionicons name="grid-outline" size={20} color={Colors.SecondaryText} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          viewMode === "list" && styles.toggleButtonActive,
        ]}
        onPress={() => onToggle("list")}
        activeOpacity={0.7}
      >
        <Ionicons name="list" size={20} color={Colors.SecondaryText} />
      </TouchableOpacity>
    </View>
  );
};

export default ViewToggle;
