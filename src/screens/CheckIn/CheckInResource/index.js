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
import { fetchResources } from "../../../redux/actions/api";

const CheckInResource = ({
  searchText = "",
  viewMode = "list",
  selectedDate = null,
  onPrintReady,
  setIsPrinting,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const { selectedEvent, resources, loading } = useSelector(
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

  const fetchResourcesData = useCallback(() => {
    if (selectedEvent?.id) {
      dispatch(fetchResources(selectedEvent.id, { type: "AREA" }));
    }
  }, [selectedEvent?.id, dispatch]);

  useEffect(() => {
    if (selectedEvent?.id) {
      fetchResourcesData();
    }
  }, [selectedEvent?.id, fetchResourcesData]);

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  const eventsList = useMemo(() => {
    if (!resources?.resources) {
      return [];
    }

    return resources.resources.map((resource) => ({
      ...resource,
      title: resource.name || resource.title || "N/A",
      capacity: resource.maxAttendees?.toString() || resource.capacity || "N/A",
      type: "resource",
    }));
  }, [resources]);

  const filteredEvents = useMemo(() => {
    let filtered = eventsList;

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title?.toLowerCase().includes(searchLower) ||
          (event.location &&
            event.location?.toLowerCase().includes(searchLower))
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
    fetchResourcesData();
  }, [fetchResourcesData]);

  const handleCheckIn = useCallback(
    (eventOrId) => {
      const resource =
        typeof eventOrId === "string"
          ? eventsList.find((item) => item.id === eventOrId)
          : eventOrId;

      const alertButtons = [
        {
          text: "Camera Scanner",
          onPress: () => {
            navigation.navigate("CameraQRScanner", {
              eventId: selectedEvent?.id,
              resourceId: resource?.id,
              scanLocation: resource?.location,
            });
          },
        },
      ];

      if (Platform.OS !== "ios") {
        alertButtons.push({
          text: "Zebra Scanner",
          onPress: () => {
            navigation.navigate("ZebraQR", {
              eventId: selectedEvent?.id,
              resourceId: resource?.id,
              manualMode: false,
              scanLocation: resource?.location,
            });
          },
        });
      }

      alertButtons.push(
        {
          text: "Check guest code manually",
          onPress: () => {
            navigation.navigate("ZebraQR", {
              eventId: selectedEvent?.id,
              resourceId: resource?.id,
              manualMode: true,
              scanLocation: resource?.location,
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
    },
    [eventsList, selectedEvent?.id, navigation]
  );

  const printToFile = useCallback(async () => {
    try {
      setIsPrinting?.(true);

      if (filteredEvents.length === 0) {
        Alert.alert(
          "No Resources to Export",
          "There are no resources to generate an Excel report. Please adjust your search filters or refresh the data.",
          [{ text: "OK" }]
        );
        return;
      }

      const excelData = filteredEvents.map((event) => {
        return {
          "Resource Title": event.title || "N/A",
          Location: event.location || "N/A",
          Capacity: event.capacity || "N/A",
          "Start Date": formatDateTime(event.startDate),
          "End Date": formatDateTime(event.endDate),
          "Check-In Status": event.isCheckedIn
            ? "Checked In"
            : "Not Checked In",
        };
      });

      const fileName = `checkin_resources_${formatStamp(new Date())}.xlsx`;
      await exportToExcel({
        rows: excelData,
        fileName,
        sheetName: "Check-In Resources",
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
            navigation.navigate("ResourceDetails", {
              resourceID: event?.id,
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
                searchText ? "No Resources Found" : "No Resources Available"
              }
              description={
                searchText
                  ? `No resources match "${searchText}". Try a different search term.`
                  : "There are no resources available at the moment."
              }
            />
          )}
          contentInsetAdjustmentBehavior="always"
        />
      )}
    </View>
  );
};

export default CheckInResource;
