import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

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

import FlightCardGrid from "./components/FlightCardGrid";
import FlightCardList from "./components/FlightCardList";
import PDFGenerator from "./components/PDFGenerator";
import ViewToggle from "../../components/ViewToggle";
import { useNavigation } from "@react-navigation/native";
import { horizontalMargin } from "../../config/metrics";

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
  const [isPrinting, setIsPrinting] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    { id: "ministry", label: "Ministry", key: "ministry" },
    { id: "arrival", label: "Arrival", key: "arrival" },
    { id: "return", label: "Return", key: "return" },
  ];

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

  const printToFile = async () => {
    try {
      setIsPrinting(true);

      // Check if there are flights to print
      if (filteredFlights.length === 0) {
        Alert.alert(
          "No Flights to Print",
          "There are no flights to generate a PDF report. Please adjust your search filters or refresh the data.",
          [{ text: "OK" }]
        );
        return;
      }

      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("PDF generation timeout")), 600000); // 60 seconds timeout
      });

      const generatePromise = async () => {
        const html = PDFGenerator.generateHTML(
          filteredFlights,
          searchText,
          selectedDate,
          selectedCategory
        );
        const { uri } = await Print.printToFileAsync({ html });
        console.log("File has been saved to:", uri);
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
        return uri;
      };

      await Promise.race([generatePromise(), timeoutPromise]);

      Alert.alert(
        "Success",
        `PDF generated successfully with ${filteredFlights.length} flight${
          filteredFlights.length !== 1 ? "s" : ""
        }!`
      );
    } catch (error) {
      let errorMessage = "Failed to generate PDF. Please try again.";

      if (error.message === "PDF generation timeout") {
        errorMessage = "PDF generation is taking too long. Please try again.";
      } else if (error.message?.includes("sharing")) {
        errorMessage =
          "PDF was generated but couldn't be shared. Please check your device settings.";
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsPrinting(false);
    }
  };

  const getStatusGradient = (status) => {
    switch (status) {
      case "SCHEDULED":
        return ["#667eea", "#764ba2"];
      case "DELAYED":
        return ["#FF9500", "#FF7A00"];
      case "CANCELLED":
        return ["#FF3B30", "#FF1B10"];
      case "ARRIVED":
        return ["#34C759", "#30B04F"];
      case "DEPARTED":
        return ["#34C759", "#30B04F"];
      default:
        return ["#667eea", "#764ba2"];
    }
  };

  const prepareFlightCardData = (flight) => {
    let flightData = {};
    let timeInfo = [];
    let additionalInfo = [];
    let actionButtons = [];

    if (selectedCategory === "arrival") {
      flightData = {
        airlineName: flight.arrivalAirlinesName || "N/A",
        flightNumber: flight.arrivalFlightNumber,
        status: flight.arrivalFlightStatus,
        headerGradientColors: getStatusGradient(flight.arrivalFlightStatus),
        airportCode: flight.arrivalAirportCode,
        airportName: flight.arrivalAirport,
        city: flight.arrivalCity,
        country: flight.arrivalCountry,
      };

      timeInfo = [
        {
          label: "✈️ Arrival Time",
          time: flight.arrivalDate,
          date: flight.arrivalDate,
        },
      ];
      if (flight.estimatedArrivalTime) {
        timeInfo.push({
          label: "⏰ Estimated",
          time: flight.estimatedArrivalTime,
          date: flight.estimatedArrivalTime,
        });
      }

      additionalInfo = [
        { title: "💺 Seat", value: flight.seatNumber || "N/A" },
        { title: "📋 Booking", value: flight.bookingReference || "N/A" },
      ];

      actionButtons = [
        {
          icon: "flight-land",
          text: "Plane Landed",
          onPress: () => {
            Alert.alert(
              "Plane Landed",
              `Flight ${flight.arrivalFlightNumber} has landed successfully!`,
              [{ text: "OK", style: "default" }]
            );
          },
        },
        {
          icon: "check-circle",
          text: "Logged Arrived",
          onPress: () => {
            Alert.alert(
              "Logged Arrived",
              `Passenger arrival has been logged for flight ${flight.arrivalFlightNumber}!`,
              [{ text: "OK", style: "default" }]
            );
          },
        },
        {
          icon: "verified-user",
          text: "Guest Granted",
          onPress: () => {
            Alert.alert(
              "Guest Granted",
              `Guest access has been granted for flight ${flight.arrivalFlightNumber}!`,
              [{ text: "OK", style: "default" }]
            );
          },
        },
      ];
    } else if (selectedCategory === "return") {
      flightData = {
        airlineName: flight.returnAirlineName || "N/A",
        flightNumber: flight.returnFlightNumber,
        status: flight.returnFlightStatus,
        headerGradientColors: getStatusGradient(flight.returnFlightStatus),
        airportCode: flight.returnAirportCode,
        airportName: flight.returnAirport,
        city: flight.returnCity,
        country: flight.returnCountry,
      };

      timeInfo = [
        {
          label: "🚀 Departure Time",
          time: flight.returnDate,
          date: flight.returnDate,
        },
      ];
      if (flight.estimatedDepartureTime) {
        timeInfo.push({
          label: "⏰ Estimated",
          time: flight.estimatedDepartureTime,
          date: flight.estimatedDepartureTime,
        });
      }

      additionalInfo = [
        { title: "💺 Seat", value: flight.seatNumber || "N/A" },
        { title: "📋 Booking", value: flight.bookingReference || "N/A" },
      ];

      actionButtons = [
        {
          colors: ["#EF4444", "#DC2626"],
          icon: "flight-takeoff",
          text: "Plane Taken Off",
          rightIcon: "arrow-upward",
          iconSize: 28,
          rightIconSize: 20,
          onPress: () => {
            Alert.alert(
              "Plane Taken Off",
              `Flight ${flight.returnFlightNumber} has taken off successfully!`,
              [{ text: "OK", style: "default" }]
            );
          },
        },
      ];
    } else {
      // Ministry
      flightData = {
        airlineName:
          flight.arrivalAirlinesName || flight.returnAirlineName || "N/A",
        flightNumber: flight.arrivalFlightNumber || flight.returnFlightNumber,
        status: "MINISTRY",
        headerGradientColors: ["#667eea", "#764ba2"],
        airportCode: flight.arrivalAirportCode || flight.returnAirportCode,
        airportName: flight.arrivalAirport || flight.returnAirport,
        city: flight.arrivalCity || flight.returnCity,
        country: flight.arrivalCountry || flight.returnCountry,
      };

      if (flight.arrivalDate) {
        timeInfo.push({
          label: "Arrival",
          time: flight.arrivalDate,
          date: flight.arrivalDate,
        });
      }
      if (flight.estimatedArrivalTime) {
        timeInfo.push({
          label: "⏰ Estimated",
          time: flight.estimatedArrivalTime,
          date: flight.estimatedArrivalTime,
        });
      }

      additionalInfo = [
        { title: "Flight Type", value: flight.flightType || "N/A" },
        { title: "Class", value: flight.flightClass || "N/A" },
      ];

      actionButtons = [
        {
          icon: "flight-land",
          text: "Plane Landed",
          onPress: () => {
            Alert.alert(
              "Plane Landed",
              `Flight ${
                flight.arrivalFlightNumber || flight.returnFlightNumber
              } has landed successfully!`,
              [{ text: "OK", style: "default" }]
            );
          },
        },
        {
          icon: "check-circle",
          text: "Logged Arrived",
          onPress: () => {
            Alert.alert(
              "Logged Arrived",
              `Passenger arrival has been logged for flight ${
                flight.arrivalFlightNumber || flight.returnFlightNumber
              }!`,
              [{ text: "OK", style: "default" }]
            );
          },
        },
        {
          icon: "verified-user",
          text: "Guest Granted",
          onPress: () => {
            Alert.alert(
              "Guest Granted",
              `Guest access has been granted for flight ${
                flight.arrivalFlightNumber || flight.returnFlightNumber
              }!`,
              [{ text: "OK", style: "default" }]
            );
          },
        },
      ];
    }

    return {
      ...flightData,
      timeInfo,
      additionalInfo,
      actionButtons,
    };
  };

  const renderFlightItem = ({ item }) => {
    const cardData = prepareFlightCardData(item);
    if (viewMode === "list") {
      return (
        <FlightCardList {...cardData} onPress={() => handleFlightPress(item)} />
      );
    }
    return (
      <FlightCardGrid
        {...cardData}
        onPress={() => handleFlightPress(item)}
        isTablet={isTablet}
      />
    );
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
    <SafeAreaView style={styles.container} edges={["top"]}>
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
          placeholder="Search by airline, flight number, airport, city, seat, booking..."
          value={searchText}
          onChangeText={setSearchText}
          onClear={handleSearchClear}
          style={styles.searchBarInRow}
        />
        <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        <TouchableOpacity
          style={[styles.printButton, isPrinting && styles.printButtonDisabled]}
          onPress={printToFile}
          activeOpacity={0.7}
          disabled={isPrinting}
        >
          <Text style={styles.printButtonText}>{isPrinting ? "⏳" : "📄"}</Text>
        </TouchableOpacity>
        <DateSearchButton
          onPress={() => setShowDateModal(true)}
          selectedDate={selectedDate}
          onClear={() => setSelectedDate(null)}
          title="Show Flights From Date"
          style={styles.dateButtonInRow}
        />
      </View>

      <FlatList
        key={viewMode}
        data={filteredFlights}
        renderItem={renderFlightItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        numColumns={viewMode === "grid" && isTablet ? 2 : 1}
        columnWrapperStyle={viewMode === "grid" && isTablet ? styles.row : null}
        contentContainerStyle={{ marginHorizontal: horizontalMargin }}
      />
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
