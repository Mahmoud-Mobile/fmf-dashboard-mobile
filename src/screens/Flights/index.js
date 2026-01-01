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
import {
  markFlightArrived,
  markFlightDeparted,
  toggleMeetDone,
  toggleLuggageReceived,
} from "../../webservice/apiConfig";
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
import { sendNotification } from "../../config/notificationUtils";

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

        // Extract participant userName
        const participant = flight.participant || {};
        const firstName = (participant.firstName || "").toLowerCase();
        const lastName = (participant.lastName || "").toLowerCase();
        const userName = `${firstName} ${lastName}`.trim().toLowerCase();
        const firstNameOnly = firstName;
        const lastNameOnly = lastName;

        return (
          flightNumber.includes(searchLower) ||
          airportCode.includes(searchLower) ||
          airportName.includes(searchLower) ||
          flightType.includes(searchLower) ||
          status.includes(searchLower) ||
          userName.includes(searchLower) ||
          firstNameOnly.includes(searchLower) ||
          lastNameOnly.includes(searchLower)
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

    // Filter by flight type
    if (selectedFlightType) {
      filtered = filtered.filter((flight) => {
        return flight.flightType === selectedFlightType;
      });
    }

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

        // Extract passenger name from participant data
        const participant = flight.participant || {};
        const firstName = participant.firstName || "";
        const lastName = participant.lastName || "";
        passengerName = `${firstName} ${lastName}`.trim() || "N/A";

        // Use flightType to determine which data to export
        if (flight.flightType === "ARRIVAL") {
          airlineName = flight.arrivalAirlinesName || "N/A";
          flightNumber = flight.arrivalFlightNumber || "N/A";
          status = flight.arrivalFlightStatus || "N/A";
          airportCode = flight.arrivalAirportCode || "N/A";
          airportName = flight.arrivalAirport || "N/A";
          date = formatDateTime(flight.arrivalDate);
        } else if (flight.flightType === "DEPARTURE") {
          airlineName =
            flight.returnAirlinesName || flight.returnAirlineName || "N/A";
          flightNumber = flight.returnFlightNumber || "N/A";
          status = flight.returnFlightStatus || "N/A";
          airportCode = flight.returnAirportCode || "N/A";
          airportName = flight.returnAirport || "N/A";
          date = formatDateTime(flight.returnDate);
        } else {
          // Fallback: use selectedCategory for backward compatibility
          if (selectedCategory === "arrival") {
            airlineName = flight.arrivalAirlinesName || "N/A";
            flightNumber = flight.arrivalFlightNumber || "N/A";
            status = flight.arrivalFlightStatus || "N/A";
            airportCode = flight.arrivalAirportCode || "N/A";
            airportName = flight.arrivalAirport || "N/A";
            date = formatDateTime(flight.arrivalDate);
          } else if (selectedCategory === "return") {
            airlineName =
              flight.returnAirlinesName || flight.returnAirlineName || "N/A";
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

    // Extract participant data from flight object
    const participant = flight.participant || {};
    const firstName = participant.firstName || "";
    const lastName = participant.lastName || "";
    const userName = `${firstName} ${lastName}`.trim() || "N/A";
    const userMobile = participant.phone || "N/A";
    const userPhoto = participant.photo || null;
    const participantType = participant?.dynamicParticipantType?.name || null;

    const passengerData = {
      userName,
      userMobile,
      userPhoto,
      firstName,
      lastName,
      participantType,
    };

    // Use flightType to determine which data to show
    if (flight.flightType === "ARRIVAL") {
      // Show arrival data for ARRIVAL flights
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
    } else if (flight.flightType === "DEPARTURE") {
      // Show return/departure data for DEPARTURE flights
      flightData = {
        airlineName:
          flight.returnAirlinesName || flight.returnAirlineName || "N/A",
        flightNumber: flight.returnFlightNumber,
        status: flight.returnFlightStatus,
        airportCode: flight.returnAirportCode || "N/A",
        airportName: flight.returnAirport || "N/A",
        ...passengerData,
      };

      timeInfo.push({
        label: "Departure",
        date: flight.returnDate,
      });
    } else {
      // Fallback: use selectedCategory for backward compatibility
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
            flight.returnAirlinesName || flight.returnAirlineName || "N/A",
          flightNumber: flight.returnFlightNumber,
          status: flight.returnFlightStatus,
          airportCode: flight.returnAirportCode || "N/A",
          airportName: flight.returnAirport || "N/A",
          ...passengerData,
        };

        timeInfo.push({
          label: "Return",
          date: flight.returnDate,
        });
      } else {
        // Default to arrival data
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
      }
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
      const flightId = flight.id;
      const participantId = flight.participant?.id;

      // Don't show buttons if flightId or participantId is missing
      if (!flightId || !participantId) {
        return [];
      }

      // Handle DEPARTURE flight type - show only "Participant Departed" button
      if (flight.flightType === "DEPARTURE") {
        // Disable if isParticipantDeparted is true
        const isParticipantDepartedDisabled =
          flight.isParticipantDeparted === true;

        const handleParticipantDeparted = async () => {
          try {
            await markFlightDeparted(flightId, participantId, {
              departed: true,
            });

            // Get participant name for notification
            const participant = flight.participant || {};
            const participantName =
              `${participant.firstName || ""} ${
                participant.lastName || ""
              }`.trim() || "Participant";
            const flightNumber =
              flight.returnFlightNumber || flight.arrivalFlightNumber || "N/A";

            // Send notification
            await sendNotification(
              "Participant Departed",
              `${participantName} has departed on flight ${flightNumber}`,
              {
                type: "flight_departed",
                flightId: flightId,
                participantId: participantId,
              }
            );

            Alert.alert(
              "Success",
              "Participant departed status updated successfully!",
              [{ text: "OK", style: "default" }]
            );
            // Refresh flights data
            fetchFlightsData();
          } catch (error) {
            Alert.alert(
              "Error",
              "Failed to update participant departed status. Please try again.",
              [{ text: "OK", style: "default" }]
            );
          }
        };

        return [
          {
            icon: "flight-takeoff",
            text: "Participant Departed",
            isSelected: !isParticipantDepartedDisabled,
            disabled: isParticipantDepartedDisabled,
            onPress: handleParticipantDeparted,
          },
        ];
      }

      // Handle arrival and officially categories
      // Disable "Meet Done" if isMeetDone is true
      const isMeetDoneDisabled = flight.isMeetDone === true;

      // Disable "Luggage Received" if isLuggageReceived is true
      const isLuggageReceivedDisabled = flight.isLuggageReceived === true;

      // Disable "Participant Arrived" if isParticipantArrived is true
      const isParticipantArrivedDisabled = flight.isParticipantArrived === true;

      const handleMeetDone = async () => {
        try {
          await toggleMeetDone(flightId, participantId, {
            meetDone: true,
          });

          // Get participant name for notification
          const participant = flight.participant || {};
          const participantName =
            `${participant.firstName || ""} ${
              participant.lastName || ""
            }`.trim() || "Participant";
          const flightNumber = flight.arrivalFlightNumber || "N/A";

          // Send notification
          await sendNotification(
            "Meet Done",
            `Meet completed for ${participantName} on flight ${flightNumber}`,
            {
              type: "flight_meet_done",
              flightId: flightId,
              participantId: participantId,
            }
          );

          Alert.alert("Success", "Meet done status updated successfully!", [
            { text: "OK", style: "default" },
          ]);
          // Refresh flights data
          fetchFlightsData();
        } catch (error) {
          Alert.alert(
            "Error",
            "Failed to update meet done status. Please try again.",
            [{ text: "OK", style: "default" }]
          );
        }
      };

      const handleLuggageReceived = async () => {
        try {
          await toggleLuggageReceived(flightId, participantId, {
            luggageReceived: true,
          });

          // Get participant name for notification
          const participant = flight.participant || {};
          const participantName =
            `${participant.firstName || ""} ${
              participant.lastName || ""
            }`.trim() || "Participant";
          const flightNumber = flight.arrivalFlightNumber || "N/A";

          // Send notification
          await sendNotification(
            "Luggage Received",
            `Luggage received for ${participantName} on flight ${flightNumber}`,
            {
              type: "flight_luggage_received",
              flightId: flightId,
              participantId: participantId,
            }
          );

          Alert.alert(
            "Success",
            "Luggage received status updated successfully!",
            [{ text: "OK", style: "default" }]
          );
          // Refresh flights data
          fetchFlightsData();
        } catch (error) {
          Alert.alert(
            "Error",
            "Failed to update luggage received status. Please try again.",
            [{ text: "OK", style: "default" }]
          );
        }
      };

      const handleParticipantArrived = async () => {
        try {
          await markFlightArrived(flightId, participantId, {
            arrived: true,
          });

          // Get participant name for notification
          const participant = flight.participant || {};
          const participantName =
            `${participant.firstName || ""} ${
              participant.lastName || ""
            }`.trim() || "Participant";
          const flightNumber = flight.arrivalFlightNumber || "N/A";

          // Send notification
          await sendNotification(
            "Participant Arrived",
            `${participantName} has arrived on flight ${flightNumber}`,
            {
              type: "flight_participant_arrived",
              flightId: flightId,
              participantId: participantId,
            }
          );

          Alert.alert(
            "Success",
            "Participant arrived status updated successfully!",
            [{ text: "OK", style: "default" }]
          );
          // Refresh flights data
          fetchFlightsData();
        } catch (error) {
          Alert.alert(
            "Error",
            "Failed to update participant arrived status. Please try again.",
            [{ text: "OK", style: "default" }]
          );
        }
      };

      return [
        {
          icon: "work",
          text: "Luggage Received",
          isSelected: !isLuggageReceivedDisabled,
          disabled: isLuggageReceivedDisabled,
          onPress: handleLuggageReceived,
        },
        {
          icon: "check-circle",
          text: "Meet Done",
          isSelected: !isMeetDoneDisabled,
          disabled: isMeetDoneDisabled,
          onPress: handleMeetDone,
        },
        {
          icon: "person",
          text: "Participant Arrived",
          isSelected: !isParticipantArrivedDisabled,
          disabled: isParticipantArrivedDisabled,
          onPress: handleParticipantArrived,
        },
      ];
    },
    [selectedCategory, fetchFlightsData]
  );

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
      const cardData = prepareFlightCardData(item);
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
    [cardSettings, handleFlightPress, getActionButtons, filterActionButtons]
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
