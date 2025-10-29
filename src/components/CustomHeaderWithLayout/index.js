import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import styles from "./Styles";

const CustomHeaderWithLayout = ({
  title,
  viewMode,
  onViewModeChange,
  onPrintPress,
  isPrinting = false,
  top = 0,
}) => {
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewMode === "grid" && styles.toggleButtonActive,
          ]}
          onPress={() => onViewModeChange("grid")}
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
          onPress={() => onViewModeChange("list")}
          activeOpacity={0.7}
        >
          <Ionicons
            name={viewMode === "list" ? "list" : "list-outline"}
            size={18}
            color={viewMode === "list" ? Colors.White : Colors.Primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            styles.printButton,
            isPrinting && styles.printButtonDisabled,
          ]}
          onPress={onPrintPress}
          activeOpacity={0.7}
          disabled={isPrinting}
        >
          <Text style={styles.printButtonText}>{isPrinting ? "⏳" : "📄"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeaderWithLayout;
