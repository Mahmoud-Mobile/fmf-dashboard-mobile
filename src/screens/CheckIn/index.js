import React, { useState, useCallback, useRef } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CustomEventHeader from "../../components/CustomEventHeader";
import CustomCategories from "../../components/CustomCategories";
import SearchActionRow from "../../components/SearchActionRow";
import DateSearchModal from "../../components/DateSearchModal";
import { styles } from "./Styles";
import CheckInSubEvent from "./CheckInSubEvent";
import CheckInResource from "./CheckInResource";

const CheckInScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("subEvent");
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const printFunctionRef = useRef(null);
  const { selectedEvent } = useSelector((state) => state.api);

  const categories = [
    { id: "subEvent", label: "Sub Event", key: "subEvent" },
    { id: "resource", label: "Resource", key: "resource" },
  ];

  const handleSearchClear = useCallback(() => {
    setSearchText("");
  }, []);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    setShowDateModal(false);
  }, []);

  const handleDateModalClose = useCallback(() => {
    setShowDateModal(false);
  }, []);

  const handlePrint = useCallback(async () => {
    if (printFunctionRef.current) {
      await printFunctionRef.current();
    }
  }, []);

  const handlePrintReady = useCallback((printFn) => {
    printFunctionRef.current = printFn;
  }, []);

  const searchPlaceholder =
    selectedCategory === "subEvent"
      ? "Search sub events..."
      : "Search resources...";

  return (
    <View style={styles.container}>
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />

      <SearchActionRow
        searchPlaceholder={searchPlaceholder}
        searchValue={searchText}
        onSearchChange={setSearchText}
        onSearchClear={handleSearchClear}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onPressPrint={handlePrint}
        isPrinting={isPrinting}
        onPressDate={() => setShowDateModal(true)}
        selectedDate={selectedDate}
        onClearDate={() => setSelectedDate(null)}
      />

      <CustomCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {selectedCategory === "subEvent" ? (
        <CheckInSubEvent
          searchText={searchText}
          viewMode={viewMode}
          selectedDate={selectedDate}
          onPrintReady={handlePrintReady}
          setIsPrinting={setIsPrinting}
        />
      ) : (
        <CheckInResource
          searchText={searchText}
          viewMode={viewMode}
          selectedDate={selectedDate}
          onPrintReady={handlePrintReady}
          setIsPrinting={setIsPrinting}
        />
      )}

      <DateSearchModal
        visible={showDateModal}
        onClose={handleDateModalClose}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
        title={
          selectedCategory === "subEvent"
            ? "Filter Sub Events by Date"
            : "Filter Resources by Date"
        }
        placeholder={
          selectedCategory === "subEvent"
            ? "Select a date to show sub events from that date onwards"
            : "Select a date to show resources from that date onwards"
        }
      />
    </View>
  );
};

export default CheckInScreen;
