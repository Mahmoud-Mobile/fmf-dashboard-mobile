import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { horizontalMargin } from "../../config/metrics";

const CategoryItem = ({ title, isSelected, onPress, index }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.category, isSelected && styles.selectedCategory]}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const CustomCategories = ({
  categories = [],
  selectedCategory,
  onCategorySelect,
  horizontal = true,
  scrollable = true,
}) => {
  if (horizontal && scrollable) {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {categories.map((category, index) => (
            <CategoryItem
              key={category.id || index}
              title={category.label || category.title}
              isSelected={selectedCategory === (category.key || category.id)}
              onPress={() => onCategorySelect(category.key || category.id)}
              index={index}
            />
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        {categories.map((category, index) => (
          <CategoryItem
            key={category.id || index}
            title={category.label || category.title}
            isSelected={selectedCategory === (category.key || category.id)}
            onPress={() => onCategorySelect(category.key || category.id)}
            index={index}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    // alignItems: "center",
  },
  scrollContainer: {
    paddingHorizontal: horizontalMargin,
    alignItems: "center",
  },
  flexContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  category: {
    paddingVertical: 12,
    paddingHorizontal: 100,
    marginHorizontal: 6,
    borderRadius: 25,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCategory: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    fontWeight: "500",
  },
  selectedText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default CustomCategories;
