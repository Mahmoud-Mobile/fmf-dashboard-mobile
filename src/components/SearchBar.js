import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "../Global/fonts";

const SearchBar = ({
  placeholder = "Search...",
  value,
  onChangeText,
  onClear,
  style,
}) => {
  const handleClear = () => {
    onChangeText("");
    if (onClear) {
      onClear();
    }
  };

  return (
    <View style={[styles.searchContainer, style]}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={22} color={Colors.Gray} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close" size={24} color={Colors.Gray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = {
  searchContainer: {},
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.White,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.TextPrimary,
    marginLeft: 5,
  },
};

export default SearchBar;
