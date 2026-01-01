import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Modal from "react-native-modal";
import CustomEventHeader from "../../components/CustomEventHeader";
import SearchActionRow from "../../components/SearchActionRow";
import LoadingModal from "../../components/LoadingModal";
import EmptyListComponent from "../../components/EmptyListComponent";
import DateSearchModal from "../../components/DateSearchModal";
import CustomCategories from "../../components/CustomCategories";
import TripCard from "./components";
import { Colors } from "../../Global/colors";
import {
  fetchTripsParticipants,
  markTripParticipantAsNoShow,
  markTripParticipantAsPickedUp,
} from "../../redux/actions/api";
import { setIconDisabled } from "../../redux/reducers/uiReducer";
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
  const { tripsParticipants, loading, selectedEvent } = useSelector(
    (state) => state.api
  );
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tripsData, setTripsData] = useState([]);
  const [showNoShowModal, setShowNoShowModal] = useState(false);
  const [noShowReason, setNoShowReason] = useState("");
  const [selectedTripForNoShow, setSelectedTripForNoShow] = useState(null);

  const categories = [
    { id: "all", label: "All", key: "all" },
    { id: "PICKUP", label: "Pickup", key: "PICKUP" },
    { id: "DROP_OFF", label: "Drop off", key: "DROP_OFF" },
  ];

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

  useEffect(() => {
    if (
      tripsParticipants &&
      tripsParticipants.participants &&
      tripsParticipants.participants.length > 0
    ) {
      const transformedData = tripsParticipants.participants.map((item) => {
        return {
          ...item,
          id: item.trip?.id || "",
        };
      });
      setTripsData(transformedData);

      // Clear disabled icons based on API response - if API says action is done, keep it disabled
      // If API says action is not done, clear the Redux disabled state
      transformedData.forEach((item) => {
        const trip = item.trip || {};
        const participant = item.participant || {};
        const tripId = trip.id || "";
        const participantId = participant.id || "";

        // Clear picked up icon if API says not picked up
        if (!trip.isPickedUp) {
          dispatch(
            setIconDisabled({
              iconId: `picked-up-${tripId}-${participantId}`,
              disabled: false,
            })
          );
        }

        // Clear no show icon if API says not no show
        if (!trip.isNoShow) {
          dispatch(
            setIconDisabled({
              iconId: `no-show-${tripId}-${participantId}`,
              disabled: false,
            })
          );
        }
      });
    } else {
      setTripsData([]);
    }
  }, [tripsParticipants, dispatch]);

  const fetchTripsData = useCallback(() => {
    if (selectedEvent?.id) {
      const params = {
        page: 1,
        limit: 1000,
        ...(selectedCategory !== "all" && { tripType: selectedCategory }),
      };
      dispatch(fetchTripsParticipants(selectedEvent.id, params));
    }
  }, [selectedEvent?.id, dispatch, selectedCategory]);

  useEffect(() => {
    if (selectedEvent?.id) {
      fetchTripsData();
    }
  }, [selectedEvent?.id, selectedCategory, fetchTripsData]);

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    if (selectedEvent?.id) {
      const params = {
        page: 1,
        limit: 1000,
        ...(selectedCategory !== "all" && { tripType: selectedCategory }),
      };
      dispatch(fetchTripsParticipants(selectedEvent.id, params)).finally(() => {
        setRefreshing(false);
      });
    }
  };

  const filteredTrips = useMemo(() => {
    let filtered = tripsData;

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item?.participant?.firstName?.toLowerCase().includes(searchLower) ||
          item?.participant?.lastName?.toLowerCase().includes(searchLower) ||
          item?.participant?.email?.toLowerCase().includes(searchLower) ||
          item?.participant?.phone?.toLowerCase().includes(searchLower) ||
          item?.trip?.pickupLocation?.toLowerCase().includes(searchLower) ||
          item?.trip?.dropoffLocation?.toLowerCase().includes(searchLower) ||
          item?.trip?.tripType?.toLowerCase().includes(searchLower) ||
          item?.trip?.status?.toLowerCase().includes(searchLower)
      );
    }

    if (selectedDate) {
      const selectedMoment = moment(new Date(selectedDate)).startOf("day");
      if (!selectedMoment.isValid()) {
        return filtered;
      }

      filtered = filtered.filter((item) => {
        const scheduledPickup = item?.trip?.scheduledPickup;
        if (scheduledPickup) {
          const tripMoment = moment(new Date(scheduledPickup)).startOf("day");
          if (tripMoment.isValid()) {
            return tripMoment.isSameOrAfter(selectedMoment);
          }
        }
        return false;
      });
    }

    return filtered;
  }, [tripsData, searchText, selectedDate]);

  const handleSearchClear = () => {
    setSearchText("");
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDateModalClose = () => {
    setShowDateModal(false);
  };

  const handleNoShowSubmit = async () => {
    if (!selectedTripForNoShow) return;

    const { tripId, participantId } = selectedTripForNoShow;

    try {
      await dispatch(
        markTripParticipantAsNoShow(
          selectedEvent?.id,
          tripId,
          participantId,
          noShowReason
        )
      );
      // Clear the disabled icon state so button can be used again if needed
      dispatch(
        setIconDisabled({
          iconId: `no-show-${tripId}-${participantId}`,
          disabled: false,
        })
      );
      // Refetch data to get updated values from API
      fetchTripsData();
      setShowNoShowModal(false);
      setNoShowReason("");
      setSelectedTripForNoShow(null);
    } catch (error) {
      Alert.alert(
        "Mark No Show Failed",
        `Failed to mark as no show: ${error.message || "Unknown error"}`,
        [{ text: "OK", style: "default" }]
      );
    }
  };

  const handleNoShowModalClose = () => {
    setShowNoShowModal(false);
    setNoShowReason("");
    setSelectedTripForNoShow(null);
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
      const excelRows = filteredTrips.map((item) => {
        const participant = item.participant || {};
        const trip = item.trip || {};

        const userName =
          [participant?.firstName, participant?.lastName]
            .filter(Boolean)
            .join(" ") || "N/A";
        const userMobile = participant?.phone || "N/A";
        const userEmail = participant?.email || "N/A";

        return {
          "Trip ID": trip.id || "N/A",
          "Participant Name": userName,
          "Participant Mobile": userMobile,
          "Participant Email": userEmail,
          "Pickup Location": trip.pickupLocation || "N/A",
          "Drop-off Location": trip.dropoffLocation || "N/A",
          "Scheduled Pickup": formatDateTime(trip.scheduledPickup),
          "Trip Type": trip.tripType || "N/A",
          Status: trip.status || "N/A",
          "Picked Up": trip.isPickedUp ? "Yes" : "No",
          "No Show": trip.isNoShow ? "Yes" : "No",
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

  const getActionButtons = useCallback(
    (item) => {
      const trip = item.trip || {};
      const participant = item.participant || {};
      const tripId = trip.id || "";
      const participantId = participant.id || "";

      const isPickedUp = trip.isPickedUp || false;
      const isNoShow = trip.isNoShow || false;
      const isCompleted = trip.status === "COMPLETED" || false;

      return [
        {
          icon: "person",
          text: "Mark Picked Up",
          isSelected: isPickedUp,
          disabled: isPickedUp || isNoShow || isCompleted,
          iconId: `picked-up-${tripId}-${participantId}`,
          onPress: async () => {
            try {
              await dispatch(
                markTripParticipantAsPickedUp(
                  selectedEvent?.id,
                  tripId,
                  participantId
                )
              );
              // Clear the disabled icon state so button can be used again if needed
              dispatch(
                setIconDisabled({
                  iconId: `picked-up-${tripId}-${participantId}`,
                  disabled: false,
                })
              );
              // Refetch data to get updated values from API
              fetchTripsData();
            } catch (error) {
              Alert.alert(
                "Mark Picked Up Failed",
                `Failed to mark as picked up: ${
                  error.message || "Unknown error"
                }`,
                [{ text: "OK", style: "default" }]
              );
            }
          },
        },
        {
          icon: "cancel",
          text: "Mark No Show",
          isSelected: isNoShow,
          disabled: isNoShow || isPickedUp || isCompleted,
          iconId: `no-show-${tripId}-${participantId}`,
          onPress: () => {
            setSelectedTripForNoShow({ tripId, participantId });
            setNoShowReason("");
            setShowNoShowModal(true);
          },
        },
      ];
    },
    [dispatch, selectedEvent?.id, fetchTripsData]
  );

  const handleTripPress = useCallback(
    (item) => {
      navigation.navigate("TripsDetails", {
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

  const renderTripCard = useCallback(
    ({ item }) => {
      const allActionButtons = getActionButtons(item);
      const actionButtons = filterActionButtons(allActionButtons);
      return (
        <TripCard
          item={item}
          width={cardWidth}
          actionButtons={actionButtons}
          onPress={() => handleTripPress(item)}
        />
      );
    },
    [cardWidth, getActionButtons, handleTripPress, filterActionButtons]
  );

  const listKeyExtractor = useCallback((item, index) => {
    return (
      `${item?.trip?.id}-${item?.participant?.id}` ||
      item?.id?.toString() ||
      index.toString()
    );
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

      <Modal
        isVisible={showNoShowModal}
        onBackdropPress={handleNoShowModalClose}
        onBackButtonPress={handleNoShowModalClose}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: Colors.White,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            paddingBottom: 40,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15,
              color: Colors.Black,
            }}
          >
            Mark as No Show
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginBottom: 10,
              color: Colors.Gray,
            }}
          >
            Please enter the reason for no show:
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: Colors.Gray,
              borderRadius: 8,
              padding: 12,
              minHeight: 100,
              textAlignVertical: "top",
              marginBottom: 20,
            }}
            placeholder="Enter reason..."
            placeholderTextColor="#828282"
            value={noShowReason}
            onChangeText={setNoShowReason}
            multiline
            numberOfLines={4}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: Colors.Gray || "#E0E0E0",
                padding: 15,
                borderRadius: 8,
                marginRight: 10,
                alignItems: "center",
              }}
              onPress={handleNoShowModalClose}
            >
              <Text style={{ color: Colors.White, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: Colors.Primary,
                padding: 15,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={handleNoShowSubmit}
            >
              <Text style={{ color: Colors.White, fontSize: 16 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Trips;
