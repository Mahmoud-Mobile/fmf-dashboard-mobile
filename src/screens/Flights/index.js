import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import moment from "moment";
import CustomEventHeader from "../../components/CustomEventHeader";
import { useDispatch, useSelector } from "react-redux";
import CustomCategories from "../../components/CustomCategories";
import DateSearchModal from "../../components/DateSearchModal";
import LoadingModal from "../../components/LoadingModal";
import EmptyListComponent from "../../components/EmptyListComponent";
import { fetchFlights } from "../../redux/actions/api";
import styles from "./Styles";
import FlightCard from "./components";
import { useNavigation } from "@react-navigation/native";
import { horizontalMargin } from "../../config/metrics";
import SearchActionRow from "../../components/SearchActionRow";
import { getDeviceDimensions } from "../../constant/deviceUtils";
import { exportToExcel, formatStamp } from "../../config/exportToExcel";
import {
  prepareFlightCardData,
  filterFlightsBySearch,
  filterFlightsByDate,
  filterFlightsByType,
} from "./utils/flightDataUtils";
import { prepareFlightExportData } from "./utils/flightExportUtils";
import { useFlightActions } from "./hooks/useFlightActions";

const Flights = () => {
  const dispatch = useDispatch();
  const { flights, loading, error } = useSelector((state) => state.api);
  const { selectedEvent } = useSelector((state) => state.api);
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFlightType, setSelectedFlightType] = useState("ARRIVAL");
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  const { width: screenWidth } = getDeviceDimensions();
  // console.log(flights?.flights);
  const horizontalPadding = horizontalMargin * 2;

  const numColumns = useMemo(() => {
    if (viewMode === "list") {
      return 1;
    }
    return 2;
  }, [viewMode]);

  const { cardWidth } = useMemo(() => {
    const gapBetweenCards = (numColumns - 1) * 8;
    const width =
      (screenWidth - horizontalPadding - gapBetweenCards) / numColumns;
    return { cardWidth: width };
  }, [numColumns, screenWidth, horizontalPadding]);

  const categories = [
    { id: "all", label: "All", key: "all" },
    { id: "official", label: "Official", key: "official" },
  ];

  const flightTypeCategories = [
    { id: "ARRIVAL", label: "Arrival", key: "ARRIVAL" },
    { id: "DEPARTURE", label: "Departure", key: "DEPARTURE" },
  ];
  // console.log(filteredFlights[0]);

  const filteredFlights = useMemo(() => {
    let filtered = flights?.flights || [];

    // Apply filters in sequence
    filtered = filterFlightsBySearch(filtered, searchText);
    filtered = filterFlightsByDate(filtered, selectedDate, moment);
    filtered = filterFlightsByType(filtered, selectedFlightType);

    return filtered;
  }, [flights, searchText, selectedDate, selectedFlightType]);

  useEffect(() => {
    if (selectedEvent?.id) {
      fetchFlightsData();
    }
  }, [selectedEvent, selectedCategory]);

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  const fetchFlightsData = useCallback(() => {
    if (selectedEvent?.id) {
      const params = {
        page: 1,
        limit: 5000,
      };

      // Only include participantsType if category is not "all"
      if (selectedCategory !== "all") {
        params.participantsType = selectedCategory;
      }

      dispatch(fetchFlights(selectedEvent.id, params));
    }
  }, [selectedEvent, selectedCategory, dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFlightsData();
  };

  const handleFlightPress = (flight) => {
    const selectedCategoryName =
      categories.find((c) => c.id === selectedCategory)?.label ||
      selectedCategory;
    navigation.navigate("FlightDetails", {
      flight,
      selectedCategory,
      selectedCategoryName,
    });
  };

  const handleSearchClear = () => {
    setSearchText("");
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDateModalClose = () => {
    setShowDateModal(false);
  };

  const printToFile = async () => {
    try {
      setIsPrinting(true);

      // Check if there are flights to export
      if (filteredFlights.length === 0) {
        Alert.alert(
          "No Flights to Export",
          "There are no flights to generate an Excel report. Please adjust your search filters or refresh the data.",
          [{ text: "OK" }]
        );
        return;
      }

      // Prepare data for Excel
      const excelData = filteredFlights.map((flight) =>
        prepareFlightExportData(flight, selectedCategory)
      );

      const fileName = `flights_${formatStamp(new Date())}.xlsx`;
      await exportToExcel({
        rows: excelData,
        fileName,
        sheetName: "Flights",
      });
    } catch (error) {
      let errorMessage = "Failed to generate Excel file. Please try again.";

      if (error.message?.includes("sharing")) {
        errorMessage =
          "Excel file was generated but couldn't be shared. Please check your device settings.";
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsPrinting(false);
    }
  };

  // Use custom hook for flight actions
  const { getActionButtons } = useFlightActions(
    fetchFlightsData,
    selectedCategory
  );

  const cardSettings = useMemo(() => {
    const isGrid = viewMode === "grid" && numColumns > 1;

    return {
      isGrid,
      component: FlightCard,
      width: cardWidth,
      numColumns: numColumns,
      columnWrapper: isGrid ? styles.columnWrapper : undefined,
    };
  }, [cardWidth, numColumns, viewMode]);

  // Get action button visibility from Redux
  const actionButtonVisibility =
    useSelector((state) => state.ui?.actionButtonVisibility) || {};

  // Helper function to filter action buttons
  const filterActionButtons = useCallback(
    (buttons) => {
      if (!buttons || !Array.isArray(buttons)) return [];
      return buttons.filter((button) => {
        if (!button || !button.text) return true;
        const storedValue = actionButtonVisibility[button.text];
        const isVisible =
          storedValue === undefined
            ? true
            : typeof storedValue === "string"
            ? storedValue === "true"
            : Boolean(storedValue);
        return isVisible;
      });
    },
    [actionButtonVisibility]
  );

  const renderFlightItem = useCallback(
    ({ item }) => {
      const cardData = prepareFlightCardData(item, selectedCategory);
      const CardComponent = cardSettings.component;
      const allActionButtons = getActionButtons(item);
      const actionButtons = filterActionButtons(allActionButtons);
      return (
        <CardComponent
          {...cardData}
          actionButtons={actionButtons}
          onPress={() => handleFlightPress(item)}
          width={cardSettings.width}
        />
      );
    },
    [
      cardSettings,
      handleFlightPress,
      getActionButtons,
      filterActionButtons,
      selectedCategory,
    ]
  );

  const renderEmptyComponent = () => <EmptyListComponent />;

  const renderListFooter = () => (
    <View style={styles.listFooter}>
      <Text style={styles.footerText}>
        {filteredFlights.length} {selectedCategory} flights found
        {searchText && " (filtered)"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />

      <SearchActionRow
        searchPlaceholder="Search by participant name, airline, flight number, airport, city, seat, booking..."
        searchValue={searchText}
        onSearchChange={setSearchText}
        onSearchClear={handleSearchClear}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onPressPrint={printToFile}
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

      <CustomCategories
        categories={flightTypeCategories}
        selectedCategory={selectedFlightType}
        onCategorySelect={setSelectedFlightType}
      />
      <LoadingModal visible={loading} />
      {!loading && (
        <FlatList
          key={viewMode}
          data={filteredFlights}
          renderItem={renderFlightItem}
          keyExtractor={(item, index) =>
            item.id ? `${item.id}-${index}` : `flight-${index}`
          }
          ListFooterComponent={renderListFooter}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          numColumns={cardSettings.numColumns}
          columnWrapperStyle={cardSettings.columnWrapper}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <DateSearchModal
        visible={showDateModal}
        onClose={handleDateModalClose}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
        title="Filter Flights by Date"
        placeholder="Select a date to show flights from that date onwards"
      />
    </View>
  );
};

export default Flights;
