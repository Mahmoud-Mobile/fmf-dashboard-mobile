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
import DesignatedCarCard from "./components";
import NoShowModal from "./components/NoShowModal";
import { Colors } from "../../Global/colors";
import styles from "./Styles";
import { useDesignatedCarsData } from "./hooks/useDesignatedCarsData";
import { useDesignatedCarsFilters } from "./hooks/useDesignatedCarsFilters";
import { useCardSettings } from "./hooks/useCardSettings";
import { exportDesignatedCarsToExcel } from "./utils/designatedCarsExport";
import { createDesignatedCarsActionButtons } from "./utils/designatedCarsActions";
import { useActionButtonFilter } from "./utils/actionButtonFilter";
import { getDesignatedCarKey } from "./utils/designatedCarsUtils";
import { handleNoShowSubmit } from "./utils/noShowHandler";
import { DESIGNATED_CARS_CATEGORIES } from "./constants/designatedCarsCategories";

const DesignatedCars = () => {
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
  const [selectedDesignatedCarForNoShow, setSelectedDesignatedCarForNoShow] =
    useState(null);

  const {
    designatedCarsData,
    refreshing,
    fetchDesignatedCarsData,
    onRefresh,
    selectedEvent,
    loading,
  } = useDesignatedCarsData(selectedCategory);
  const filteredDesignatedCars = useDesignatedCarsFilters(
    designatedCarsData,
    searchText,
    selectedDate
  );
  const { cardWidth, cardSettings } = useCardSettings(viewMode);
  const filterActionButtons = useActionButtonFilter();

  useFocusEffect(
    useCallback(() => {
      fetchDesignatedCarsData();
    }, [fetchDesignatedCarsData])
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
    setSelectedDesignatedCarForNoShow({ tripId, participantId });
    setNoShowReason("");
    setShowNoShowModal(true);
  };

  const handleNoShowModalClose = () => {
    setShowNoShowModal(false);
    setNoShowReason("");
    setSelectedDesignatedCarForNoShow(null);
  };

  const onNoShowSubmit = async () => {
    await handleNoShowSubmit(
      selectedDesignatedCarForNoShow,
      noShowReason,
      selectedEvent?.id,
      designatedCarsData,
      dispatch,
      fetchDesignatedCarsData,
      setShowNoShowModal,
      setNoShowReason,
      setSelectedDesignatedCarForNoShow
    );
  };

  const printToFile = async () => {
    await exportDesignatedCarsToExcel(filteredDesignatedCars, setIsPrinting);
  };

  const getActionButtons = useCallback(
    (item) => {
      return createDesignatedCarsActionButtons(
        item,
        selectedEvent?.id,
        fetchDesignatedCarsData,
        handleNoShowPress,
        dispatch
      );
    },
    [selectedEvent?.id, fetchDesignatedCarsData, dispatch]
  );

  const handleDesignatedCarPress = useCallback(
    (item) => {
      // If participant has multiple trips, pass all trips data
      if (item.hasMultipleTrips && item.allTrips) {
        navigation.navigate("DesignatedCarDetails", {
          trip: item,
          allTrips: item.allTrips,
          participant: item.participant,
        });
      } else {
        navigation.navigate("DesignatedCarDetails", {
          trip: item,
        });
      }
    },
    [navigation]
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
    return getDesignatedCarKey(item, index);
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

      <CustomCategories
        categories={DESIGNATED_CARS_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
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

export default DesignatedCars;
