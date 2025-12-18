import React, { useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Storage } from "expo-storage";
import styles from "./EnvironmentSelectorStyles";

const EnvironmentSelector = ({ onCategoryChange, error, onErrorChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { label: "FMF", value: "fmf" },
    { label: "Offer Home", value: "offerHome" },
  ];

  const handleCategorySelect = async (item) => {
    setSelectedCategory(item.value);
    if (onErrorChange) {
      onErrorChange(false);
    }
    try {
      await Storage.setItem({ key: "selected-category", value: item.value });
      if (onCategoryChange) {
        onCategoryChange(item.value);
      }
    } catch (error) {
      console.error("Error saving selected category:", error);
    }
  };

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.labelText}>Environment</Text>
      <Dropdown
        style={[styles.dropdown, error && styles.dropdownError]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categories}
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Please select your env"
        value={selectedCategory}
        onChange={handleCategorySelect}
        renderLeftIcon={() => null}
      />
    </View>
  );
};

export default EnvironmentSelector;
