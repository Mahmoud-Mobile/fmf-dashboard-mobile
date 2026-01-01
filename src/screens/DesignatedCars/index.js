import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, FlatList, RefreshControl, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomEventHeader from "../../components/CustomEventHeader";
import SearchActionRow from "../../components/SearchActionRow";
import LoadingModal from "../../components/LoadingModal";
import EmptyListComponent from "../../components/EmptyListComponent";
import DateSearchModal from "../../components/DateSearchModal";
import DesignatedCarCard from "./components";
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

const DesignatedCars = () => {
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

  const fetchDesignatedCarsData = useCallback(() => {
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
      fetchDesignatedCarsData();
    }
  }, [selectedEvent?.id, fetchDesignatedCarsData]);

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDesignatedCarsData();
  };

  const designatedCarsList = useMemo(() => {
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

  const filteredDesignatedCars = useMemo(() => {
    let filtered = designatedCarsList;

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (designatedCar) =>
          designatedCar?.title?.toLowerCase().includes(searchLower) ||
          designatedCar?.pickupLocation?.toLowerCase().includes(searchLower) ||
          designatedCar?.dropoffLocation?.toLowerCase().includes(searchLower) ||
          designatedCar?.tripType?.toLowerCase().includes(searchLower) ||
          designatedCar?.status?.toLowerCase().includes(searchLower)
      );
    }

    if (selectedDate) {
      const selectedDateStr = selectedDate.toISOString().split("T")[0];
      filtered = filtered.filter((designatedCar) => {
        if (designatedCar?.scheduledPickup) {
          const designatedCarDate = new Date(designatedCar.scheduledPickup)
            .toISOString()
            .split("T")[0];
          return designatedCarDate >= selectedDateStr;
        }
        return false;
      });
    }

    return filtered;
  }, [designatedCarsList, searchText, selectedDate]);

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
    if (filteredDesignatedCars.length === 0) {
      Alert.alert(
        "No Data",
        "There are no designated cars to export. Please adjust your filters or wait for data to load.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    setIsPrinting(true);
    try {
      // Transform designated cars data into Excel rows
      const excelRows = filteredDesignatedCars.map((designatedCar) => {
        const participantTrips = designatedCar.participantTrips || [];
        const firstParticipant = participantTrips[0] || {};
        const participant = firstParticipant.participant || {};
        const driverShift = designatedCar.driverShift || {};
        const driver = driverShift.driver || {};
        const vehicle = designatedCar.vehicle || {};

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
          "Trip ID": designatedCar.id || designatedCar.tripId || "N/A",
          Title: designatedCar.title || "N/A",
          "Guest Name": userName,
          "Guest Mobile": userMobile,
          "Driver Name": driverName,
          Vehicle: fullCarModel,
          "Plate Number": plateNumber,
          "Pickup Location": designatedCar.pickupLocation || "N/A",
          "Drop-off Location": designatedCar.dropoffLocation || "N/A",
          "Scheduled Pickup": formatDateTime(designatedCar.scheduledPickup),
          "Trip Type": designatedCar.tripType || "N/A",
          Status: designatedCar.status || "N/A",
          "Vehicle Ready": designatedCar.isVehicleReady ? "Yes" : "No",
          "Guest Picked Up": designatedCar.isGuestPickedUp ? "Yes" : "No",
          "Trip Completed": designatedCar.isTripCompleted ? "Yes" : "No",
        };
      });

      const timestamp = formatStamp(new Date());
      const fileName = `designated_cars_export_${timestamp}.xlsx`;

      await exportToExcel({
        rows: excelRows,
        fileName,
        sheetName: "Designated Cars",
      });

      Alert.alert(
        "Export Successful",
        `Successfully exported ${excelRows.length} designated car(s) to Excel.`,
        [{ text: "OK", style: "default" }]
      );
    } catch (error) {
      console.error("Error exporting designated cars to Excel:", error);
      Alert.alert(
        "Export Failed",
        `Failed to export designated cars: ${error.message || "Unknown error"}`,
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

  const getActionButtons = useCallback((designatedCar) => {
    const isDisabled =
      designatedCar.isVehicleReady === true ||
      designatedCar.isGuestPickedUp === true ||
      designatedCar.isTripCompleted === true;

    const isSelected = !isDisabled;
    const designatedCarId =
      designatedCar.id || designatedCar.tripId || "unknown";

    return [
      {
        icon: "directions-car",
        text: "Vehicle Ready",
        isSelected: isSelected,
        disabled: isDisabled,
        iconId: `vehicle-ready-${designatedCarId}`,
        onPress: () => {
          Alert.alert(
            "Vehicle Ready",
            `Vehicle is ready for designated car ${designatedCarId}!`,
            [{ text: "OK", style: "default" }]
          );
        },
      },
      {
        icon: "person",
        text: "Guest Picked up",
        isSelected: isSelected,
        disabled: isDisabled,
        iconId: `guest-picked-up-${designatedCarId}`,
        onPress: () => {
          Alert.alert(
            "Guest Picked up",
            `Guest has been picked up for designated car ${designatedCarId}!`,
            [{ text: "OK", style: "default" }]
          );
        },
      },
      {
        icon: "check-circle",
        text: "Trip Completed",
        isSelected: isSelected,
        disabled: isDisabled,
        iconId: `trip-completed-${designatedCarId}`,
        onPress: () => {
          Alert.alert(
            "Trip Completed",
            `Designated car ${designatedCarId} has been completed successfully!`,
            [{ text: "OK", style: "default" }]
          );
        },
      },
    ];
  }, []);

  const handleDesignatedCarPress = useCallback(
    (item) => {
      navigation.navigate("DesignatedCarDetails", {
        trip: item,
      });
    },
    [navigation]
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

  const renderDesignatedCarCard = useCallback(
    ({ item }) => {
      const allActionButtons = getActionButtons(item);
      const actionButtons = filterActionButtons(allActionButtons);
      return (
        <DesignatedCarCard
          item={item}
          width={cardWidth}
          actionButtons={actionButtons}
          onPress={() => handleDesignatedCarPress(item)}
        />
      );
    },
    [cardWidth, getActionButtons, handleDesignatedCarPress, filterActionButtons]
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
        searchPlaceholder="Search designated cars..."
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
          data={filteredDesignatedCars}
          renderItem={renderDesignatedCarCard}
          keyExtractor={listKeyExtractor}
          numColumns={cardSettings.numColumns}
          columnWrapperStyle={cardSettings.columnWrapper}
          ListEmptyComponent={
            <EmptyListComponent
              title={
                searchText || selectedDate
                  ? "No Designated Cars Found"
                  : "No Designated Cars Available"
              }
              description={
                searchText || selectedDate
                  ? "No designated cars match your search criteria. Try adjusting your filters."
                  : "There are no designated cars available at the moment."
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
            filteredDesignatedCars.length === 0
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
        title="Filter Designated Cars by Date"
        placeholder="Select a date to show designated cars from that date onwards"
      />
    </View>
  );
};

export default DesignatedCars;
