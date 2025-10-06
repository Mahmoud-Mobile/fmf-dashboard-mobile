import React from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "react-native-platform-searchbar";
import { Colors } from "../Global/colors";
import { horizontalMargin } from "../config/metrics";

const SearchComponent = ({
  value,
  onChangeText,
  onSubmitEditing,
  backgroundColor,
  placeholder,
  marginBottom,
}) => {
  return (
    <View
      style={[
        styles.searchView,
        { marginBottom: marginBottom ? marginBottom : 10 },
      ]}
    >
      <SearchBar
        placeholder={placeholder ? placeholder : "Search..."}
        cancelText="Close"
        inputStyle={{
          backgroundColor: backgroundColor
            ? backgroundColor
            : Colors.WhiteColor,
          textAlign: "left",
          borderRadius: 8,
        }}
        theme="light"
        platform="ios"
        style={styles.searchBar}
        placeholderTextColor="#605E66"
        value={value}
        onChangeText={onChangeText}
        iconColor="#605E66"
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchView: {
    marginHorizontal: horizontalMargin,
  },
  searchBar: {
    alignSelf: "center",
    textAlign: "left",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: Colors.BlackColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 50,
  },
});
export default SearchComponent;
