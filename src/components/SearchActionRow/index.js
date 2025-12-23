import React from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import SearchBar from "../SearchBar";
import DateSearchButton from "../DateSearchButton";
import ViewToggle from "../ViewToggle";
import { Colors } from "../../Global/colors";
import { isMobile } from "../../constant/deviceUtils";
import styles from "./Styles";

const SearchActionRow = ({
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  onSearchClear,
  searchBarStyle,
  searchBarProps = {},
  showSearch = true,
  showViewToggle = true,
  viewMode,
  onToggleViewMode,
  viewToggleProps = {},
  showPrintButton = true,
  onPressPrint,
  isPrinting = false,
  printIconName = "save-alt",
  printIconSize = 20,
  printIconColor = Colors.SecondaryText,
  printButtonStyle,
  printButtonDisabledStyle,
  showDateButton = true,
  onPressDate,
  selectedDate,
  onClearDate,
  dateButtonStyle,
  containerStyle,
  children,
}) => {
  const shouldRenderSearch =
    showSearch &&
    typeof searchValue !== "undefined" &&
    typeof onSearchChange === "function";
  const shouldRenderViewToggle =
    showViewToggle && typeof onToggleViewMode === "function" && !isMobile();
  const shouldRenderPrint =
    showPrintButton && typeof onPressPrint === "function";
  const shouldRenderDate = showDateButton && typeof onPressDate === "function";

  return (
    <View style={[styles.container, containerStyle]}>
      {shouldRenderSearch && (
        <SearchBar
          placeholder={searchPlaceholder}
          value={searchValue}
          onChangeText={onSearchChange}
          onClear={onSearchClear}
          style={[styles.searchBar, searchBarStyle]}
          {...searchBarProps}
        />
      )}

      {shouldRenderViewToggle && (
        <ViewToggle
          viewMode={viewMode}
          onToggle={onToggleViewMode}
          {...viewToggleProps}
        />
      )}

      {shouldRenderPrint && (
        <TouchableOpacity
          style={[
            styles.printButton,
            isPrinting && styles.printButtonDisabled,
            printButtonStyle,
            isPrinting && printButtonDisabledStyle,
          ]}
          onPress={onPressPrint}
          activeOpacity={0.7}
          disabled={isPrinting}
        >
          <MaterialIcons
            name={printIconName}
            size={printIconSize}
            color={printIconColor}
          />
        </TouchableOpacity>
      )}

      {shouldRenderDate && (
        <DateSearchButton
          onPress={onPressDate}
          selectedDate={selectedDate}
          onClear={onClearDate}
          style={dateButtonStyle}
        />
      )}

      {children}
    </View>
  );
};

export default SearchActionRow;
