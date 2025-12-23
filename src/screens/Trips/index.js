import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, FlatList, RefreshControl, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomEventHeader from "../../components/CustomEventHeader";
import SearchActionRow from "../../components/SearchActionRow";
import LoadingModal from "../../components/LoadingModal";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import EmptyListComponent from "../../components/EmptyListComponent";
import DateSearchModal from "../../components/DateSearchModal";
import TripCard from "./components";
import { Colors } from "../../Global/colors";
import { fetchTrips } from "../../redux/actions/api";
import { getDeviceDimensions } from "../../constant/deviceUtils";
import { horizontalMargin } from "../../config/metrics";
import {
  exportToExcel,
  formatDateTime,
  formatStamp,
} from "../../config/exportToExcel";
import styles from "./Styles";

const Trips = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { trips, loading, selectedEvent } = useSelector((state) => state.api);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const { width: screenWidth } = getDeviceDimensions();
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

  const fetchTripsData = useCallback(() => {
    if (selectedEvent?.id) {
      const params = {
        status: "SCHEDULED",
        page: 1,
        limit: 1000,
      };
      dispatch(fetchTrips(selectedEvent.id, params));
    }
  }, [selectedEvent?.id, dispatch]);

  useEffect(() => {
    if (selectedEvent?.id) {
      fetchTripsData();
    }
  }, [selectedEvent?.id, fetchTripsData]);

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTripsData();
  };

  const tripsList = useMemo(() => {
    if (!trips) {
      return [];
    }
    if (trips?.trips && Array.isArray(trips.trips)) {
      return trips.trips;
    }
    if (Array.isArray(trips)) {
      return trips;
    }
    return [];
  }, [trips]);

  const filteredTrips = useMemo(() => {
    let filtered = tripsList;

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (trip) =>
          trip?.title?.toLowerCase().includes(searchLower) ||
          trip?.pickupLocation?.toLowerCase().includes(searchLower) ||
          trip?.dropoffLocation?.toLowerCase().includes(searchLower) ||
          trip?.tripType?.toLowerCase().includes(searchLower) ||
          trip?.status?.toLowerCase().includes(searchLower)
      );
    }

    if (selectedDate) {
      const selectedDateStr = selectedDate.toISOString().split("T")[0];
      filtered = filtered.filter((trip) => {
        if (trip?.scheduledPickup) {
          const tripDate = new Date(trip.scheduledPickup)
            .toISOString()
            .split("T")[0];
          return tripDate >= selectedDateStr;
        }
        return false;
      });
    }

    return filtered;
  }, [tripsList, searchText, selectedDate]);

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
    if (filteredTrips.length === 0) {
      Alert.alert(
        "No Data",
        "There are no trips to export. Please adjust your filters or wait for data to load.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    setIsPrinting(true);
    try {
      // Transform trips data into Excel rows
      const excelRows = filteredTrips.map((trip) => {
        const participantTrips = trip.participantTrips || [];
        const firstParticipant = participantTrips[0] || {};
        const participant = firstParticipant.participant || {};
        const driverShift = trip.driverShift || {};
        const driver = driverShift.driver || {};
        const vehicle = trip.vehicle || {};

        const userName = participant?.name || participant?.fullName || "N/A";
        const userMobile = participant?.mobile || participant?.phone || "N/A";
        const driverName =
          [driver?.firstName, driver?.lastName].filter(Boolean).join(" ") ||
          "N/A";
        const carModel = vehicle?.model || "N/A";
        const carBrand = vehicle?.brand || "";
        const plateNumber = vehicle?.vehicleNumber || "N/A";
        const fullCarModel = carBrand ? `${carBrand} ${carModel}` : carModel;

        return {
          "Trip ID": trip.id || trip.tripId || "N/A",
          Title: trip.title || "N/A",
          "Guest Name": userName,
          "Guest Mobile": userMobile,
          "Driver Name": driverName,
          Vehicle: fullCarModel,
          "Plate Number": plateNumber,
          "Pickup Location": trip.pickupLocation || "N/A",
          "Drop-off Location": trip.dropoffLocation || "N/A",
          "Scheduled Pickup": formatDateTime(trip.scheduledPickup),
          "Trip Type": trip.tripType || "N/A",
          Status: trip.status || "N/A",
          "Vehicle Ready": trip.isVehicleReady ? "Yes" : "No",
          "Guest Picked Up": trip.isGuestPickedUp ? "Yes" : "No",
          "Trip Completed": trip.isTripCompleted ? "Yes" : "No",
        };
      });

      const timestamp = formatStamp(new Date());
      const fileName = `trips_export_${timestamp}.xlsx`;

      await exportToExcel({
        rows: excelRows,
        fileName,
        sheetName: "Trips",
      });

      Alert.alert(
        "Export Successful",
        `Successfully exported ${excelRows.length} trip(s) to Excel.`,
        [{ text: "OK", style: "default" }]
      );
    } catch (error) {
      console.error("Error exporting trips to Excel:", error);
      Alert.alert(
        "Export Failed",
        `Failed to export trips: ${error.message || "Unknown error"}`,
        [{ text: "OK", style: "default" }]
      );
    } finally {
      setIsPrinting(false);
    }
  };

  const cardSettings = useMemo(() => {
    const isGrid = viewMode === "grid" && numColumns > 1;
    return {
      isGrid,
      numColumns: numColumns,
      columnWrapper: isGrid ? styles.columnWrapper : undefined,
    };
  }, [numColumns, viewMode]);

  const getActionButtons = useCallback((trip) => {
    const isDisabled =
      trip.isVehicleReady === true ||
      trip.isGuestPickedUp === true ||
      trip.isTripCompleted === true;

    const isSelected = !isDisabled;
    const tripId = trip.id || trip.tripId || "unknown";

    return [
      {
        icon: "directions-car",
        text: "Vehicle Ready",
        isSelected: isSelected,
        disabled: isDisabled,
        iconId: `vehicle-ready-${tripId}`,
        onPress: () => {
          Alert.alert("Vehicle Ready", `Vehicle is ready for trip ${tripId}!`, [
            { text: "OK", style: "default" },
          ]);
        },
      },
      {
        icon: "person",
        text: "Guest Picked up",
        isSelected: isSelected,
        disabled: isDisabled,
        iconId: `guest-picked-up-${tripId}`,
        onPress: () => {
          Alert.alert(
            "Guest Picked up",
            `Guest has been picked up for trip ${tripId}!`,
            [{ text: "OK", style: "default" }]
          );
        },
      },
      {
        icon: "check-circle",
        text: "Trip Completed",
        isSelected: isSelected,
        disabled: isDisabled,
        iconId: `trip-completed-${tripId}`,
        onPress: () => {
          Alert.alert(
            "Trip Completed",
            `Trip ${tripId} has been completed successfully!`,
            [{ text: "OK", style: "default" }]
          );
        },
      },
    ];
  }, []);

  const handleTripPress = useCallback(
    (item) => {
      navigation.navigate("TripsDetails", {
        trip: item,
      });
    },
    [navigation]
  );

  const renderTripCard = useCallback(
    ({ item }) => {
      const actionButtons = getActionButtons(item);
      return (
        <TripCard
          item={item}
          width={cardWidth}
          actionButtons={actionButtons}
          onPress={() => handleTripPress(item)}
        />
      );
    },
    [cardWidth, getActionButtons, handleTripPress]
  );

  const listKeyExtractor = useCallback((item, index) => {
    return item?.id?.toString() || index.toString();
  }, []);

  return (
    <View style={styles.container}>
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />

      <SearchActionRow
        searchPlaceholder="Search trips..."
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
      {loading ? (
        <LoadingModal visible={loading} />
      ) : (
        <FlatList
          key={viewMode}
          data={filteredTrips}
          renderItem={renderTripCard}
          keyExtractor={listKeyExtractor}
          numColumns={cardSettings.numColumns}
          columnWrapperStyle={cardSettings.columnWrapper}
          ListEmptyComponent={
            <EmptyListComponent
              title={
                searchText || selectedDate
                  ? "No Trips Found"
                  : "No Trips Available"
              }
              description={
                searchText || selectedDate
                  ? "No trips match your search criteria. Try adjusting your filters."
                  : "There are no trips available at the moment."
              }
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.Primary]}
              tintColor={Colors.Primary}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            filteredTrips.length === 0
              ? styles.emptyContainer
              : styles.listContainer
          }
          contentInsetAdjustmentBehavior="always"
        />
      )}
      <DateSearchModal
        visible={showDateModal}
        onClose={handleDateModalClose}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
        title="Filter Trips by Date"
        placeholder="Select a date to show trips from that date onwards"
      />
    </View>
  );
};

export default Trips;
