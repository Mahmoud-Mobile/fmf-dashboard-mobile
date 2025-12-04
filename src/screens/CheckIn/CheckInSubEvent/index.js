import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, FlatList, RefreshControl, Alert, Platform } from "react-native";
import { Colors } from "../../../Global/colors";
import { getDeviceDimensions } from "../../../constant/deviceUtils";
import LoadingModal from "../../../components/LoadingModal";
import EmptyListComponent from "../../../components/EmptyListComponent";
import CustomCheckInCard from "./components";
import { styles } from "./Styles";
import { horizontalMargin } from "../../../config/metrics";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  exportToExcel,
  formatDateTime,
  formatStamp,
} from "../../../config/exportToExcel";
import { fetchSubEvents } from "../../../redux/actions/api";

const CheckInSubEvent = ({
  searchText = "",
  viewMode = "list",
  selectedDate = null,
  onPrintReady,
  setIsPrinting,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
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
    if (!subEvents?.events) {
      return [];
    }

    return subEvents.events
      .map((event) => ({
        ...event,
        title: event.name || event.title || "N/A",
        capacity: event.maxAttendees?.toString() || event.capacity || "N/A",
        type:
          event.eventLevel === "SUB"
            ? "subEvent"
            : event.eventLevel?.toLowerCase() || event.type || "subEvent",
      }))
      .filter((event) => event.type === "subEvent");
  }, [subEvents]);

  const filteredEvents = useMemo(() => {
    let filtered = eventsList;

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.capacity.toLowerCase().includes(searchLower) ||
          (event.location && event.location.toLowerCase().includes(searchLower))
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
  }, [eventsList, searchText, selectedDate]);

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

  const printToFile = useCallback(async () => {
    try {
      setIsPrinting?.(true);

      // Check if there are events to export
      if (filteredEvents.length === 0) {
        Alert.alert(
          "No Sub Events to Export",
          "There are no sub events to generate an Excel report. Please adjust your search filters or refresh the data.",
          [{ text: "OK" }]
        );
        return;
      }

      const excelData = filteredEvents.map((event) => {
        return {
          "Sub Event Title": event.title || "N/A",
          Location: event.location || "N/A",
          Capacity: event.capacity || "N/A",
          "Start Date": formatDateTime(event.startDate),
          "End Date": formatDateTime(event.endDate),
          "Check-In Status": event.isCheckedIn
            ? "Checked In"
            : "Not Checked In",
        };
      });

      const fileName = `checkin_sub_events_${formatStamp(new Date())}.xlsx`;
      await exportToExcel({
        rows: excelData,
        fileName,
        sheetName: "Check-In Sub Events",
      });
    } catch (error) {
      let errorMessage = "Failed to generate Excel file. Please try again.";

      if (error.message?.includes("sharing")) {
        errorMessage =
          "Excel file was generated but couldn't be shared. Please check your device settings.";
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsPrinting?.(false);
    }
  }, [filteredEvents, setIsPrinting]);

  useEffect(() => {
    if (onPrintReady) {
      onPrintReady(printToFile);
    }
  }, [printToFile, onPrintReady]);

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
                searchText ? "No Sub Events Found" : "No Sub Events Available"
              }
              description={
                searchText
                  ? `No sub events match "${searchText}". Try a different search term.`
                  : "There are no sub events available at the moment."
              }
            />
          )}
          contentInsetAdjustmentBehavior="always"
        />
      )}
    </View>
  );
};

export default CheckInSubEvent;
