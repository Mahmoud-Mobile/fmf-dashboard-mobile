import React, { useState, useEffect, useMemo } from "react";
import { View, Text, FlatList, Dimensions, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import CustomCategories from "../../components/CustomCategories";
import SearchBar from "../../components/SearchBar";
import DateSearchButton from "../../components/DateSearchButton";
import DateSearchModal from "../../components/DateSearchModal";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import LoadingModal from "../../components/LoadingModal";
import EmptyListComponent from "../../components/EmptyListComponent";
import { fetchFlights } from "../../redux/actions/api";
import styles from "./Styles";

// Custom Category Components
import CustomMinistryItem from "./components/CustomMinistryItem";
import CustomArrivalItem from "./components/CustomArrivalItem";
import CustomReturnItem from "./components/CustomReturnItem";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const isTablet = width > 768;

const Flights = () => {
  const dispatch = useDispatch();
  const { flights, loading, error } = useSelector((state) => state.api);
  const { selectedEvent } = useSelector((state) => state.api);
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("ministry");
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);

  const categories = [
    { id: "ministry", label: "Ministry", key: "ministry" },
    { id: "arrival", label: "Arrival", key: "arrival" },
    { id: "return", label: "Return", key: "return" },
  ];

  // Filter flights based on search text and date
  const filteredFlights = useMemo(() => {
    let filtered = flights?.flights || [];

    // Filter by search text
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter((flight) => {
        // Search across all relevant flight fields
        const airlineName = (
          flight.arrivalAirlinesName ||
          flight.returnAirlineName ||
          ""
        ).toLowerCase();
        const flightNumber = (
          flight.arrivalFlightNumber ||
          flight.returnFlightNumber ||
          ""
        ).toLowerCase();
        const airportCode = (
          flight.arrivalAirportCode ||
          flight.returnAirportCode ||
          ""
        ).toLowerCase();
        const airportName = (
          flight.arrivalAirport ||
          flight.returnAirport ||
          ""
        ).toLowerCase();
        const city = (
          flight.arrivalCity ||
          flight.returnCity ||
          ""
        ).toLowerCase();
        const country = (
          flight.arrivalCountry ||
          flight.returnCountry ||
          ""
        ).toLowerCase();
        const flightType = (flight.flightType || "").toLowerCase();
        const flightClass = (flight.flightClass || "").toLowerCase();
        const seatNumber = (flight.seatNumber || "").toLowerCase();
        const bookingReference = (flight.bookingReference || "").toLowerCase();
        const status = (
          flight.arrivalFlightStatus ||
          flight.returnFlightStatus ||
          ""
        ).toLowerCase();

        return (
          airlineName.includes(searchLower) ||
          flightNumber.includes(searchLower) ||
          airportCode.includes(searchLower) ||
          airportName.includes(searchLower) ||
          city.includes(searchLower) ||
          country.includes(searchLower) ||
          flightType.includes(searchLower) ||
          flightClass.includes(searchLower) ||
          seatNumber.includes(searchLower) ||
          bookingReference.includes(searchLower) ||
          status.includes(searchLower)
        );
      });
    }

    // Filter by date - show all flights from selected date onwards
    if (selectedDate) {
      const selectedDateStr = selectedDate.toISOString().split("T")[0];

      filtered = filtered.filter((flight) => {
        // Parse flight dates correctly - they are in JavaScript Date string format
        const arrivalDate = flight.arrivalDate
          ? new Date(flight.arrivalDate).toISOString().split("T")[0]
          : null;
        const returnDate = flight.returnDate
          ? new Date(flight.returnDate).toISOString().split("T")[0]
          : null;

        // Show flights that arrive on or after the selected date
        // OR flights that return on or after the selected date
        return (
          (arrivalDate && arrivalDate >= selectedDateStr) ||
          (returnDate && returnDate >= selectedDateStr)
        );
      });
    }

    return filtered;
  }, [flights, searchText, selectedDate]);

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

  const fetchFlightsData = () => {
    if (selectedEvent?.id) {
      const params = {
        status: "SCHEDULED",
        participantsType: selectedCategory,
      };
      dispatch(fetchFlights(selectedEvent.id, params));
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFlightsData();
  };

  const handleFlightPress = (flight) => {
    navigation.navigate("FlightDetails", { flight });
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

  const renderFlightItem = ({ item }) => {
    switch (selectedCategory) {
      case "ministry":
        return (
          <CustomMinistryItem
            flight={item}
            onPress={handleFlightPress}
            isTablet={isTablet}
          />
        );
      case "arrival":
        return (
          <CustomArrivalItem
            flight={item}
            onPress={handleFlightPress}
            isTablet={isTablet}
          />
        );
      case "return":
        return (
          <CustomReturnItem
            flight={item}
            onPress={handleFlightPress}
            isTablet={isTablet}
          />
        );
      default:
        return (
          <CustomMinistryItem
            flight={item}
            onPress={handleFlightPress}
            isTablet={isTablet}
          />
        );
    }
  };

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
    <SafeAreaView style={styles.container}>
      <CustomHeader title={selectedEvent?.name || "Event flights"} center />

      <CustomCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        horizontal={true}
        scrollable={true}
      />

      <View style={styles.searchRow}>
        <SearchBar
          placeholder="Search flights..."
          value={searchText}
          onChangeText={setSearchText}
          onClear={handleSearchClear}
          style={styles.searchBarInRow}
        />
        <DateSearchButton
          onPress={() => setShowDateModal(true)}
          selectedDate={selectedDate}
          onClear={() => setSelectedDate(null)}
          title="Show Flights From Date"
          style={styles.dateButtonInRow}
        />
      </View>

      <View style={{ marginHorizontal: 12 }}>
        <FlatList
          data={filteredFlights}
          renderItem={renderFlightItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderListFooter}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          numColumns={isTablet ? 2 : 1}
          columnWrapperStyle={isTablet ? styles.row : null}
        />
      </View>
      <LoadingModal visible={loading} />
      <FloatingChatIcon />

      <DateSearchModal
        visible={showDateModal}
        onClose={handleDateModalClose}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
        title="Filter Flights by Date"
        placeholder="Select a date to show flights from that date onwards"
      />
    </SafeAreaView>
  );
};

export default Flights;
