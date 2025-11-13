import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./Styles";

const CategoryItem = ({ title, isSelected, onPress, isLast }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {isSelected ? (
        <View
          style={[styles.selectedCategory, { marginRight: isLast ? 0 : 10 }]}
        >
          <Text style={styles.selectedText}>{title}</Text>
        </View>
      ) : (
        <View
          style={[styles.unselectedCategory, { marginRight: isLast ? 0 : 10 }]}
        >
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const CustomCategories = ({
  categories = [],
  selectedCategory,
  onCategorySelect,
}) => {
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
            isLast={index === categories.length - 1}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CustomCategories;
