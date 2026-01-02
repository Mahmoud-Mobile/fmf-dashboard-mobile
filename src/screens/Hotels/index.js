import React, { useState, useCallback } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CustomEventHeader from "../../components/CustomEventHeader";
import SearchActionRow from "../../components/SearchActionRow";
import EmptyListComponent from "../../components/EmptyListComponent";
import DateSearchModal from "../../components/DateSearchModal";
import HotelCard from "./components";
import { Colors } from "../../Global/colors";
import LoadingModal from "../../components/LoadingModal";
import styles from "./Styles";
import { useHotelsData } from "./hooks/useHotelsData";
import { useHotelsFilters } from "./hooks/useHotelsFilters";
import { useCardSettings } from "./hooks/useCardSettings";
import { exportHotelsToExcel } from "./utils/hotelsExport";
import { createHotelsActionButtons } from "./utils/hotelsActions";
import { useActionButtonFilter } from "./utils/actionButtonFilter";
import { getHotelKey } from "./utils/hotelsUtils";

const Hotels = () => {
  const navigation = useNavigation();
  const { loading } = useSelector((state) => state.api);
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const { hotelsData, refreshing, fetchHotelsData, onRefresh, selectedEvent } =
    useHotelsData();
  const filteredHotels = useHotelsFilters(hotelsData, searchText, selectedDate);
  const { cardWidth, cardSettings } = useCardSettings(viewMode);
  const filterActionButtons = useActionButtonFilter();

  useFocusEffect(
    useCallback(() => {
      fetchHotelsData();
    }, [fetchHotelsData])
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

  const printToFile = async () => {
    await exportHotelsToExcel(filteredHotels, setIsPrinting);
  };

  const getActionButtons = useCallback(
    (hotel) => {
      return createHotelsActionButtons(
        hotel,
        selectedEvent?.id,
        fetchHotelsData
      );
    },
    [selectedEvent?.id, fetchHotelsData]
  );

  const handleHotelPress = useCallback(
    (item) => {
      navigation.navigate("HotelDetails", {
        hotel: item,
      });
    },
    [navigation]
  );

  const renderHotelCard = useCallback(
    ({ item }) => {
      const allActionButtons = getActionButtons(item);
      const actionButtons = filterActionButtons(allActionButtons);
      return (
        <HotelCard
          item={item}
          width={cardWidth}
          actionButtons={actionButtons}
          onPress={() => handleHotelPress(item)}
        />
      );
    },
    [cardWidth, getActionButtons, handleHotelPress, filterActionButtons]
  );

  const listKeyExtractor = useCallback((item, index) => {
    return getHotelKey(item, index);
  }, []);

  return (
    <View style={styles.container}>
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />
      <SearchActionRow
        searchPlaceholder="Search hotels..."
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
          data={filteredHotels}
          renderItem={renderHotelCard}
          keyExtractor={listKeyExtractor}
          numColumns={cardSettings.numColumns}
          columnWrapperStyle={cardSettings.columnWrapper}
          ListEmptyComponent={
            <EmptyListComponent
              title={
                searchText || selectedDate
                  ? "No Hotels Found"
                  : "No Hotels Available"
              }
              description={
                searchText || selectedDate
                  ? "No hotels match your search criteria. Try adjusting your filters."
                  : "There are no hotels available at the moment."
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
            filteredHotels.length === 0
              ? styles.emptyContainer
              : styles.listContainer
          }
        />
      )}
      <DateSearchModal
        visible={showDateModal}
        onClose={handleDateModalClose}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
        title="Filter Hotels by Date"
        placeholder="Select a date to show hotels from that date onwards"
      />
    </View>
  );
};

export default Hotels;
