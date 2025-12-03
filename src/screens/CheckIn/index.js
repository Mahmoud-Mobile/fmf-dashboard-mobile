import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, FlatList, RefreshControl, Alert, Platform } from "react-native";
import { Colors } from "../../Global/colors";
import { getDeviceDimensions } from "../../constant/deviceUtils";
import SearchActionRow from "../../components/SearchActionRow";
import LoadingModal from "../../components/LoadingModal";
import EmptyListComponent from "../../components/EmptyListComponent";
import DateSearchModal from "../../components/DateSearchModal";
import CustomCheckInCard from "./components";
import { styles } from "./Styles";
import { horizontalMargin } from "../../config/metrics";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomEventHeader from "../../components/CustomEventHeader";
import CustomCategories from "../../components/CustomCategories";
import {
  exportToExcel,
  formatDateTime,
  formatStamp,
} from "../../config/exportToExcel";
import { fetchSubEvents } from "../../redux/actions/api";

const CheckInScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("subEvent");
  const { selectedEvent, subEvents, loading } = useSelector(
    (state) => state.api
  );

  const { width: screenWidth } = getDeviceDimensions();

  const horizontalPadding = horizontalMargin * 2;

  const numColumns = useMemo(() => {
    if (viewMode === "list") {
      return 1;
    }
    return 3;
  }, [viewMode]);

  const { cardWidth } = useMemo(() => {
    const gapBetweenCards = (numColumns - 1) * 8;
    const width =
      (screenWidth - horizontalPadding - gapBetweenCards) / numColumns;
    return { cardWidth: width };
  }, [numColumns, screenWidth]);

  const categories = [
    { id: "subEvent", label: "Sub Event", key: "subEvent" },
    { id: "resource", label: "Resource", key: "resource" },
  ];

  const fetchSubEventsData = useCallback(() => {
    if (selectedEvent?.id) {
      dispatch(fetchSubEvents(selectedEvent.id));
    }
  }, [selectedEvent?.id, dispatch]);

  useEffect(() => {
    if (selectedEvent?.id) {
      fetchSubEventsData();
    }
  }, [selectedEvent?.id, fetchSubEventsData]);

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  const eventsList = useMemo(() => {
    if (!subEvents) {
      return [];
    }

    let rawEvents = [];
    if (subEvents?.subEvents && Array.isArray(subEvents.subEvents)) {
      rawEvents = subEvents.subEvents;
    } else if (subEvents?.events && Array.isArray(subEvents.events)) {
      rawEvents = subEvents.events;
    } else if (Array.isArray(subEvents)) {
      rawEvents = subEvents;
    }

    // Transform API response to match component expectations
    return rawEvents.map((event) => ({
      ...event,
      title: event.name || event.title || "N/A",
      capacity: event.maxAttendees?.toString() || event.capacity || "N/A",
      type:
        event.eventLevel === "SUB"
          ? "subEvent"
          : event.eventLevel?.toLowerCase() || event.type || "subEvent",
    }));
  }, [subEvents]);

  const filteredEvents = useMemo(() => {
    let filtered = eventsList;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((event) => event.type === selectedCategory);
    }

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.capacity.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower)
      );
    }

    if (selectedDate) {
      const selectedDateStr = selectedDate.toISOString().split("T")[0];
      filtered = filtered.filter((event) => {
        const startDate = event.startDate
          ? event.startDate.includes("T")
            ? event.startDate.split("T")[0]
            : new Date(event.startDate).toISOString().split("T")[0]
          : null;

        if (startDate) {
          return startDate >= selectedDateStr;
        }
        return false;
      });
    }

    return filtered;
  }, [eventsList, searchText, selectedDate, selectedCategory]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSubEventsData();
  }, [fetchSubEventsData]);

  const handleCheckIn = (event) => {
    const alertButtons = [
      {
        text: "Camera Scanner",
        onPress: () => {
          navigation.navigate("CameraQRScanner", {
            eventId: event?.id,
          });
        },
      },
    ];

    if (Platform.OS !== "ios") {
      alertButtons.push({
        text: "Zebra Scanner",
        onPress: () => {
          navigation.navigate("ZebraQR", {
            eventId: event?.id,
            manualMode: false,
          });
        },
      });
    }

    alertButtons.push(
      {
        text: "Check guest code manually",
        onPress: () => {
          navigation.navigate("ZebraQR", {
            eventId: event?.id,
            manualMode: true,
          });
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      }
    );

    Alert.alert(
      "Choose Scanner Type",
      "How would you like to scan the QR code?",
      alertButtons,
      { cancelable: true }
    );
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

      // Check if there are events to export
      if (filteredEvents.length === 0) {
        Alert.alert(
          "No Events to Export",
          "There are no events to generate an Excel report. Please adjust your search filters or refresh the data.",
          [{ text: "OK" }]
        );
        return;
      }

      const excelData = filteredEvents.map((event) => {
        return {
          "Event Title": event.title || "N/A",
          Location: event.location || "N/A",
          Capacity: event.capacity || "N/A",
          "Start Date": formatDateTime(event.startDate),
          "End Date": formatDateTime(event.endDate),
          "Check-In Status": event.isCheckedIn
            ? "Checked In"
            : "Not Checked In",
        };
      });

      const fileName = `checkin_events_${formatStamp(new Date())}.xlsx`;
      await exportToExcel({
        rows: excelData,
        fileName,
        sheetName: "Check-In Events",
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

  const cardSettings = useMemo(() => {
    const isGrid = viewMode === "grid" && numColumns > 1;
    return {
      isGrid,
      numColumns: numColumns,
      columnWrapper: isGrid ? styles.columnWrapper : undefined,
    };
  }, [numColumns, viewMode]);

  const renderEventCard = useCallback(
    ({ item }) => {
      return (
        <CustomCheckInCard
          item={item}
          onPreview={() => {
            navigation.navigate("PreviewSeats", {
              subEventID: item?.id,
            });
          }}
          onCheckIn={(event) => handleCheckIn(event)}
          width={cardWidth}
          onPress={(event) =>
            navigation.navigate("SubEventDetails", {
              subEventID: event?.id,
              title: event?.title || event?.name,
              location: event?.location,
            })
          }
        />
      );
    },
    [cardWidth, navigation, handleCheckIn]
  );

  const listKeyExtractor = useCallback((item) => {
    return String(item.id);
  }, []);

  return (
    <View style={styles.container}>
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />

      <SearchActionRow
        searchPlaceholder="Search check-in events..."
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

      {loading ? (
        <LoadingModal visible={loading} />
      ) : (
        <FlatList
          key={viewMode}
          data={filteredEvents}
          renderItem={renderEventCard}
          keyExtractor={listKeyExtractor}
          numColumns={cardSettings.numColumns}
          columnWrapperStyle={cardSettings.columnWrapper}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.Primary]}
              tintColor={Colors.Primary}
            />
          }
          ListEmptyComponent={() => (
            <EmptyListComponent
              title={
                searchText
                  ? "No Check-In Events Found"
                  : "No Check-In Events Available"
              }
              description={
                searchText
                  ? `No check-in events match "${searchText}". Try a different search term.`
                  : "There are no check-in events available at the moment."
              }
            />
          )}
          contentInsetAdjustmentBehavior="always"
        />
      )}

      <DateSearchModal
        visible={showDateModal}
        onClose={handleDateModalClose}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
        title="Filter Check-In Events by Date"
        placeholder="Select a date to show check-in events from that date onwards"
      />
    </View>
  );
};

export default CheckInScreen;
