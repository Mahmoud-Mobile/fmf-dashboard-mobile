import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import moment from "moment";
import CustomEventHeader from "../../components/CustomEventHeader";
import { useDispatch, useSelector } from "react-redux";
import CustomCategories from "../../components/CustomCategories";
import DateSearchModal from "../../components/DateSearchModal";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import LoadingModal from "../../components/LoadingModal";
import EmptyListComponent from "../../components/EmptyListComponent";
import { fetchFlights } from "../../redux/actions/api";
import styles from "./Styles";

import FlightCard from "./components";
import { useNavigation } from "@react-navigation/native";
import { horizontalMargin } from "../../config/metrics";
import SearchActionRow from "../../components/SearchActionRow";
import { getDeviceDimensions } from "../../constant/deviceUtils";
import {
  exportToExcel,
  formatDateTime,
  formatStamp,
} from "../../config/exportToExcel";

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
  const [viewMode, setViewMode] = useState("list");

  const { width: screenWidth } = getDeviceDimensions();
  // console.log(flights?.flights?.[0]);
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
        const flightType = (flight.flightType || "").toLowerCase();
        const status = (
          flight.arrivalFlightStatus ||
          flight.returnFlightStatus ||
          ""
        ).toLowerCase();

        return (
          flightNumber.includes(searchLower) ||
          airportCode.includes(searchLower) ||
          airportName.includes(searchLower) ||
          flightType.includes(searchLower) ||
          status.includes(searchLower)
        );
      });
    }

    if (selectedDate) {
      const selectedMoment = moment(selectedDate);
      const selectedDateStr = selectedMoment.isValid()
        ? selectedMoment.format("YYYY-MM-DD")
        : null;

      if (!selectedDateStr) {
        return filtered;
      }

      filtered = filtered.filter((flight) => {
        const arrivalMoment = flight.arrivalDate
          ? moment(flight.arrivalDate)
          : null;
        const returnMoment = flight.returnDate
          ? moment(flight.returnDate)
          : null;

        const arrivalDate =
          arrivalMoment && arrivalMoment.isValid()
            ? arrivalMoment.format("YYYY-MM-DD")
            : null;
        const returnDate =
          returnMoment && returnMoment.isValid()
            ? returnMoment.format("YYYY-MM-DD")
            : null;

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
        page: 1,
        limit: 500,
      };
      dispatch(fetchFlights(selectedEvent.id, params));
    }
  };

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

      // date helpers are imported from config/exportToExcel

      // Prepare data for Excel
      const excelData = filteredFlights.map((flight) => {
        let passengerName = "N/A";
        let airlineName = "N/A";
        let flightNumber = "N/A";
        let status = "N/A";
        let airportCode = "N/A";
        let airportName = "N/A";
        let date = "N/A";

        // Extract passenger name
        passengerName = "Mahmoud Tawba";

        // Category-based data extraction
        if (selectedCategory === "arrival") {
          airlineName = flight.arrivalAirlinesName || "N/A";
          flightNumber = flight.arrivalFlightNumber || "N/A";
          status = flight.arrivalFlightStatus || "N/A";
          airportCode = flight.arrivalAirportCode || "N/A";
          airportName = flight.arrivalAirport || "N/A";
          date = formatDateTime(flight.arrivalDate);
        } else if (selectedCategory === "return") {
          airlineName = flight.returnAirlinesName || "N/A";
          flightNumber = flight.returnFlightNumber || "N/A";
          status = flight.returnFlightStatus || "N/A";
          airportCode = flight.returnAirportCode || "N/A";
          airportName = flight.returnAirport || "N/A";
          date = formatDateTime(flight.returnDate);
        } else {
          airlineName = flight.arrivalAirlinesName || "N/A";
          flightNumber = flight.arrivalFlightNumber || "N/A";
          status = flight.arrivalFlightStatus || "N/A";
          airportCode = flight.arrivalAirportCode || "N/A";
          airportName = flight.arrivalAirport || "N/A";
          date = formatDateTime(flight.arrivalDate);
        }

        return {
          "Passenger Name": passengerName,
          "Airline Name": airlineName,
          "Flight Number": flightNumber,
          Status: status,
          "Airport Code": airportCode,
          "Airport Name": airportName,
          Date: date,
        };
      });

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

  const prepareFlightCardData = (flight) => {
    let flightData = {};
    let timeInfo = [];

    // Static passenger data
    const passengerData = {
      userName: "Ahmed Mohamed",
      userMobile: "+966 65 090 7242",
      userPhoto:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    };

    if (selectedCategory === "arrival") {
      flightData = {
        airlineName: flight.arrivalAirlinesName,
        flightNumber: flight.arrivalFlightNumber,
        status: flight.arrivalFlightStatus,
        airportCode: flight.arrivalAirportCode,
        airportName: flight.arrivalAirport,
        ...passengerData,
      };

      timeInfo.push({
        label: "Arrival",
        date: flight.arrivalDate,
      });
    } else if (selectedCategory === "return") {
      flightData = {
        airlineName:
          flight.returnAirlinesName || "this parameter is not available",
        flightNumber: flight.returnFlightNumber,
        status: flight.returnFlightStatus,
        airportCode:
          flight.returnAirportCode || "this parameter is not available",
        airportName: flight.returnAirport,
        ...passengerData,
      };

      timeInfo.push({
        label: "Return",
        date: flight.returnDate,
      });
    } else {
      flightData = {
        airlineName: flight.arrivalAirlinesName,
        flightNumber: flight.arrivalFlightNumber,
        status: flight.returnFlightStatus,
        airportCode: flight.arrivalAirportCode,
        airportName: flight.arrivalAirport,
        ...passengerData,
      };

      timeInfo.push({
        label: "Arrival",
        date: flight.arrivalDate,
      });
    }

    return {
      ...flightData,
      timeInfo,
    };
  };

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

  const getActionButtons = useCallback(
    (flight) => {
      const isDisabled =
        flight.isLuggageReceived === true ||
        flight.isParticipantArrived === true ||
        flight.isParticipantDeparted === true;

      const isSelected = !isDisabled;
      const flightId =
        flight.id ||
        flight.arrivalFlightNumber ||
        flight.returnFlightNumber ||
        "unknown";

      if (selectedCategory === "return") {
        return [
          {
            icon: "flight-takeoff",
            text: "Plane Taken Off",
            iconSize: 24,
            isSelected: isSelected,
            disabled: isDisabled,
            iconId: `flight-takeoff-${flightId}`,
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
        return [
          {
            icon: "flight-land",
            text: "Plane Landed",
            isSelected: isSelected,
            disabled: isDisabled,
            iconId: `flight-land-${flightId}`,
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
            isSelected: isSelected,
            disabled: isDisabled,
            iconId: `check-circle-${flightId}`,
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
            isSelected: isSelected,
            disabled: isDisabled,
            iconId: `verified-user-${flightId}`,
            onPress: () => {
              Alert.alert(
                "Guest Granted",
                `Guest access has been granted for flight ${flight.arrivalFlightNumber}!`,
                [{ text: "OK", style: "default" }]
              );
            },
          },
        ];
      }
    },
    [selectedCategory]
  );

  const renderFlightItem = useCallback(
    ({ item }) => {
      const cardData = prepareFlightCardData(item);
      const CardComponent = cardSettings.component;
      const actionButtons = getActionButtons(item);
      return (
        <CardComponent
          {...cardData}
          actionButtons={actionButtons}
          onPress={() => handleFlightPress(item)}
          width={cardSettings.width}
        />
      );
    },
    [cardSettings, handleFlightPress, getActionButtons]
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
        searchPlaceholder="Search by airline, flight number, airport, city, seat, booking..."
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
        // containerStyle={{ marginBottom: 20 }}
      />

      <CustomCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
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

      {/* <FloatingChatIcon /> */}

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
