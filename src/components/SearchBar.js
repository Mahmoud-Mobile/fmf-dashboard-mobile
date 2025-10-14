import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

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
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = {
  searchContainer: {
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
  },
  clearIcon: {
    fontSize: 16,
    color: "#94A3B8",
    padding: 4,
  },
};

export default SearchBar;
