import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { horizontalMargin } from "../../config/metrics";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const screenWidth = Dimensions.get("window").width;

const CategoryItem = ({ title, isSelected, onPress, width, isLast }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {isSelected ? (
        <LinearGradient
          colors={Colors.PrimaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradientCategory,
            { width, marginRight: isLast ? 0 : 10 },
          ]}
        >
          <Text style={styles.selectedText}>{title}</Text>
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.unselectedCategory,
            { width, marginRight: isLast ? 0 : 10 },
          ]}
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
  const itemWidth = screenWidth * 0.3;

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
            width={itemWidth}
            isLast={index === categories.length - 1}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContainer: {
    paddingHorizontal: horizontalMargin,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  gradientCategory: {
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  unselectedCategory: {
    height: 45,
    borderRadius: 25,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: Colors.gray,
    textAlign: "center",
    fontFamily: Fonts.FONT_MEDIUM,
  },
  selectedText: {
    color: Colors.White,
    fontFamily: Fonts.FONT_BOLD,
  },
});

export default CustomCategories;
