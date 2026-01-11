import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
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
  const { flights, loading } = useSelector((state) => state.api);
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

  const initialCategoriesRef = useRef([]);

  const { width: screenWidth } = getDeviceDimensions();
  const horizontalPadding = horizontalMargin * 2;

  const numColumns = useMemo(() => (viewMode === "list" ? 1 : 2), [viewMode]);

  const cardWidth = useMemo(() => {
    const gapBetweenCards = (numColumns - 1) * 8;
    return (screenWidth - horizontalPadding - gapBetweenCards) / numColumns;
  }, [numColumns, screenWidth, horizontalPadding]);

  const extractCategories = useCallback((flightsData) => {
    const baseCategories = [{ id: "all", label: "All", key: "all" }];

    if (!flightsData) {
      return baseCategories;
    }

    const participants = flightsData?.participants || [];
    const flightsArray = flightsData?.flights || [];
    const participantTypeMap = new Map();

    const addParticipantType = (participantType) => {
      if (participantType?.id && participantType?.name) {
        if (!participantTypeMap.has(participantType.id)) {
          participantTypeMap.set(participantType.id, {
            id: participantType.id,
            label: participantType.name,
            key: participantType.id,
          });
        }
      }
    };

    participants.forEach((item) => {
      addParticipantType(item?.participant?.participantType);
    });

    flightsArray.forEach((flight) => {
      addParticipantType(flight?.participant?.participantType);
    });

    const participantTypeCategories = Array.from(
      participantTypeMap.values()
    ).sort((a, b) => a.label.localeCompare(b.label));

    return [...baseCategories, ...participantTypeCategories];
  }, []);

  const [categoriesUpdated, setCategoriesUpdated] = useState(0);

  useEffect(() => {
    if (flights && selectedCategory === "all") {
      const extractedCategories = extractCategories(flights);
      if (
        extractedCategories.length > 1 &&
        extractedCategories.length >= initialCategoriesRef.current.length
      ) {
        initialCategoriesRef.current = extractedCategories;
        setCategoriesUpdated((prev) => prev + 1);
      }
    }
  }, [flights, selectedCategory, extractCategories]);

  const categories = useMemo(() => {
    if (initialCategoriesRef.current.length > 1) {
      return initialCategoriesRef.current;
    }
    return extractCategories(flights);
  }, [extractCategories, categoriesUpdated]);

  const flightTypeCategories = [
    { id: "ARRIVAL", label: "Arrival", key: "ARRIVAL" },
    {
      id: "ARRIVAL_COMPLETE",
      label: "Arrival Complete",
      key: "ARRIVAL_COMPLETE",
    },
    { id: "DEPARTURE", label: "Departure", key: "DEPARTURE" },
    {
      id: "DEPARTURE_COMPLETE",
      label: "Departure Complete",
      key: "DEPARTURE_COMPLETE",
    },
  ];

  const filteredFlights = useMemo(() => {
    let filtered = flights?.flights || [];
    filtered = filterFlightsBySearch(filtered, searchText);
    filtered = filterFlightsByDate(filtered, selectedDate, moment);
    filtered = filterFlightsByType(filtered, selectedFlightType);
    return filtered;
  }, [flights, searchText, selectedDate, selectedFlightType]);

  useEffect(() => {
    if (selectedCategory !== "all" && categories.length > 0) {
      const categoryExists = categories.some(
        (cat) => cat.id === selectedCategory
      );
      if (!categoryExists) {
        setSelectedCategory("all");
      }
    }
  }, [categories, selectedCategory]);

  const fetchFlightsData = useCallback(() => {
    if (!selectedEvent?.id) return;

    const params = {
      page: 1,
      limit: 5000,
    };

    if (selectedCategory !== "all") {
      params.participantTypeId = selectedCategory;
    }

    dispatch(fetchFlights(selectedEvent.id, params));
  }, [selectedEvent?.id, selectedCategory, dispatch]);

  useEffect(() => {
    fetchFlightsData();
  }, [fetchFlightsData]);

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFlightsData();
  }, [fetchFlightsData]);

  const handleFlightPress = useCallback(
    (flight) => {
      const selectedCategoryName =
        categories.find((c) => c.id === selectedCategory)?.label ||
        selectedCategory;
      navigation.navigate("FlightDetails", {
        flight,
        selectedCategory,
        selectedCategoryName,
      });
    },
    [categories, selectedCategory, navigation]
  );

  const handleSearchClear = useCallback(() => {
    setSearchText("");
  }, []);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const handleDateModalClose = useCallback(() => {
    setShowDateModal(false);
  }, []);

  const printToFile = useCallback(async () => {
    try {
      setIsPrinting(true);

      if (filteredFlights.length === 0) {
        Alert.alert(
          "No Flights to Export",
          "There are no flights to generate an Excel report. Please adjust your search filters or refresh the data.",
          [{ text: "OK" }]
        );
        return;
      }

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
      const errorMessage = error.message?.includes("sharing")
        ? "Excel file was generated but couldn't be shared. Please check your device settings."
        : "Failed to generate Excel file. Please try again.";

      Alert.alert("Error", errorMessage);
    } finally {
      setIsPrinting(false);
    }
  }, [filteredFlights, selectedCategory]);

  const { getActionButtons } = useFlightActions(
    fetchFlightsData,
    selectedCategory
  );

  const actionButtonVisibility =
    useSelector((state) => state.ui?.actionButtonVisibility) || {};

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

  const filterActionButtons = useCallback(
    (buttons) => {
      if (!buttons || !Array.isArray(buttons)) return [];
      return buttons.filter((button) => {
        if (!button || !button.text) return true;
        const storedValue = actionButtonVisibility[button.text];
        return storedValue === undefined
          ? true
          : typeof storedValue === "string"
          ? storedValue === "true"
          : Boolean(storedValue);
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
        {filteredFlights.length} flights found
        {searchText && " (filtered)"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomEventHeader
        event={selectedEvent}
        // onLeftButtonPress={() => navigation.goBack()}
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
            item.id ? String(item.id) : `flight-${index}`
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
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          windowSize={10}
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
