import React, { useState, useCallback } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CustomEventHeader from "../../components/CustomEventHeader";
import SearchActionRow from "../../components/SearchActionRow";
import LoadingModal from "../../components/LoadingModal";
import EmptyListComponent from "../../components/EmptyListComponent";
import DateSearchModal from "../../components/DateSearchModal";
import CustomCategories from "../../components/CustomCategories";
import TripCard from "./components";
import NoShowModal from "./components/NoShowModal";
import { Colors } from "../../Global/colors";
import styles from "./Styles";
import { useTripsData } from "./hooks/useTripsData";
import { useTripsFilters } from "./hooks/useTripsFilters";
import { useCardSettings } from "./hooks/useCardSettings";
import { exportTripsToExcel } from "./utils/tripsExport";
import { createTripsActionButtons } from "./utils/tripsActions";
import { useActionButtonFilter } from "./utils/actionButtonFilter";
import { getTripKey } from "./utils/tripsUtils";
import { handleNoShowSubmit } from "./utils/noShowHandler";
import { TRIPS_CATEGORIES } from "./constants/tripsCategories";

const Trips = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showNoShowModal, setShowNoShowModal] = useState(false);
  const [noShowReason, setNoShowReason] = useState("");
  const [selectedTripForNoShow, setSelectedTripForNoShow] = useState(null);

  const {
    tripsData,
    refreshing,
    fetchTripsData,
    onRefresh,
    selectedEvent,
    loading,
  } = useTripsData(selectedCategory);
  const filteredTrips = useTripsFilters(tripsData, searchText, selectedDate);
  const { cardWidth, cardSettings } = useCardSettings(viewMode);
  const filterActionButtons = useActionButtonFilter();

  useFocusEffect(
    useCallback(() => {
      fetchTripsData();
    }, [fetchTripsData])
  );

  const handleSearchClear = () => {
    setSearchText("");
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDateModalClose = () => {
    setShowDateModal(false);
  };

  const handleNoShowPress = ({ tripId, participantId }) => {
    setSelectedTripForNoShow({ tripId, participantId });
    setNoShowReason("");
    setShowNoShowModal(true);
  };

  const handleNoShowModalClose = () => {
    setShowNoShowModal(false);
    setNoShowReason("");
    setSelectedTripForNoShow(null);
  };

  const onNoShowSubmit = async () => {
    await handleNoShowSubmit(
      selectedTripForNoShow,
      noShowReason,
      selectedEvent?.id,
      tripsData,
      dispatch,
      fetchTripsData,
      setShowNoShowModal,
      setNoShowReason,
      setSelectedTripForNoShow
    );
  };

  const printToFile = async () => {
    await exportTripsToExcel(filteredTrips, setIsPrinting);
  };

  const getActionButtons = useCallback(
    (item) => {
      return createTripsActionButtons(
        item,
        selectedEvent?.id,
        fetchTripsData,
        handleNoShowPress,
        dispatch
      );
    },
    [selectedEvent?.id, fetchTripsData, dispatch]
  );

  const handleTripPress = useCallback(
    (item) => {
      // If participant has multiple trips, pass all trips data
      if (item.hasMultipleTrips && item.allTrips) {
        navigation.navigate("TripsDetails", {
          trip: item,
          allTrips: item.allTrips,
          participant: item.participant,
        });
      } else {
        navigation.navigate("TripsDetails", {
          trip: item,
        });
      }
    },
    [navigation]
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
    return getTripKey(item, index);
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
        categories={TRIPS_CATEGORIES}
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

      <NoShowModal
        visible={showNoShowModal}
        noShowReason={noShowReason}
        onReasonChange={setNoShowReason}
        onSubmit={onNoShowSubmit}
        onClose={handleNoShowModalClose}
      />
    </View>
  );
};

export default Trips;
