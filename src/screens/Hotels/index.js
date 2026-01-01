import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, FlatList, RefreshControl, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import CustomEventHeader from "../../components/CustomEventHeader";
import SearchActionRow from "../../components/SearchActionRow";
import EmptyListComponent from "../../components/EmptyListComponent";
import DateSearchModal from "../../components/DateSearchModal";
import HotelCard from "./components";
import { Colors } from "../../Global/colors";
import { getDeviceDimensions } from "../../constant/deviceUtils";
import { horizontalMargin } from "../../config/metrics";
import {
  exportToExcel,
  formatDateTime,
  formatStamp,
} from "../../config/exportToExcel";
import {
  fetchAccommodationParticipants,
  markAccommodationAsCheckedIn,
  markAccommodationAsCheckedOut,
} from "../../redux/actions/api";
import LoadingModal from "../../components/LoadingModal";
import styles from "./Styles";

const Hotels = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { selectedEvent, accommodation, loading } = useSelector(
    (state) => state.api
  );
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);

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
      accommodation &&
      accommodation.participants &&
      accommodation.participants.length > 0
    ) {
      const transformedData = accommodation.participants.map((item) => {
        return {
          ...item,
          id: item.accommodation?.id || "",
        };
      });
      setHotelsData(transformedData);
    } else {
      setHotelsData([]);
    }
  }, [accommodation]);

  useEffect(() => {
    if (selectedEvent?.id) {
      dispatch(
        fetchAccommodationParticipants(selectedEvent.id, {
          page: 1,
          limit: 1000,
        })
      );
    }
  }, [selectedEvent?.id, dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    if (selectedEvent?.id) {
      dispatch(
        fetchAccommodationParticipants(selectedEvent.id, {
          page: 1,
          limit: 1000,
        })
      ).finally(() => {
        setRefreshing(false);
      });
    }
  };

  const filteredHotels = useMemo(() => {
    let filtered = hotelsData;

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (hotel) =>
          hotel?.accommodation?.hotelName
            ?.toLowerCase()
            .includes(searchLower) ||
          hotel?.accommodation?.roomNumber
            ?.toLowerCase()
            .includes(searchLower) ||
          hotel?.accommodation?.status?.toLowerCase().includes(searchLower)
      );
    }

    if (selectedDate) {
      const selectedMoment = moment(new Date(selectedDate)).startOf("day");
      if (!selectedMoment.isValid()) {
        return filtered;
      }

      filtered = filtered.filter((hotel) => {
        const checkInMoment = hotel?.accommodation?.checkInDate
          ? moment(new Date(hotel.accommodation.checkInDate)).startOf("day")
          : null;
        const checkOutMoment = hotel?.accommodation?.checkOutDate
          ? moment(new Date(hotel.accommodation.checkOutDate)).startOf("day")
          : null;

        if (
          checkInMoment &&
          checkInMoment.isValid() &&
          checkOutMoment &&
          checkOutMoment.isValid()
        ) {
          return (
            selectedMoment.isSameOrAfter(checkInMoment) &&
            selectedMoment.isSameOrBefore(checkOutMoment)
          );
        } else if (checkInMoment && checkInMoment.isValid()) {
          return selectedMoment.isSameOrAfter(checkInMoment);
        } else if (checkOutMoment && checkOutMoment.isValid()) {
          return selectedMoment.isSameOrBefore(checkOutMoment);
        }
        return false;
      });
    }

    return filtered;
  }, [hotelsData, searchText, selectedDate]);

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
    if (filteredHotels.length === 0) {
      Alert.alert(
        "No Data",
        "There are no hotels to export. Please adjust your filters or wait for data to load.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    setIsPrinting(true);
    try {
      const excelRows = filteredHotels.map((hotel) => {
        return {
          "Hotel ID": hotel.accommodation?.id || " ",
          "Hotel Name": hotel.accommodation?.hotelName || " ",
          "Room Number": hotel.accommodation?.roomNumber || " ",
          "Check In Date": formatDateTime(hotel.accommodation?.checkInDate),
          "Check Out Date": formatDateTime(hotel.accommodation?.checkOutDate),
          Status: hotel.accommodation?.status || " ",
          "Checked In": hotel.accommodation?.isCheckedIn ? "Yes" : "No",
          "Checked Out": hotel.accommodation?.isCheckedOut ? "Yes" : "No",
        };
      });

      const timestamp = formatStamp(new Date());
      const fileName = `hotels_export_${timestamp}.xlsx`;

      await exportToExcel({
        rows: excelRows,
        fileName,
        sheetName: "Hotels",
      });

      Alert.alert(
        "Export Successful",
        `Successfully exported ${excelRows.length} hotel(s) to Excel.`,
        [{ text: "OK", style: "default" }]
      );
    } catch (error) {
      Alert.alert(
        "Export Failed",
        `Failed to export hotels: ${error.message || "Unknown error"}`,
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
    (hotel) => {
      const hotelId = hotel.accommodation?.id || "";
      const isCheckedIn = hotel.accommodation?.isCheckedIn || false;
      const isCheckedOut = hotel.accommodation?.isCheckedOut || false;

      return [
        {
          icon: "check-circle",
          text: "Check In",
          isSelected: isCheckedIn,
          disabled: isCheckedIn,
          iconId: `check-in-${hotelId}`,
          onPress: async () => {
            try {
              await dispatch(
                markAccommodationAsCheckedIn(
                  selectedEvent?.id,
                  hotel.accommodation?.id || hotel.id
                )
              );
              setHotelsData((prev) =>
                prev.map((h) =>
                  (h.accommodation?.id || h.id) === hotelId
                    ? {
                        ...h,
                        accommodation: {
                          ...h.accommodation,
                          isCheckedIn: true,
                        },
                      }
                    : h
                )
              );
            } catch (error) {
              Alert.alert(
                "Check In Failed",
                `Failed to check in: ${error.message || "Unknown error"}`,
                [{ text: "OK", style: "default" }]
              );
            }
          },
        },
        {
          icon: "exit-to-app",
          text: "Check Out",
          isSelected: isCheckedOut,
          disabled: isCheckedOut,
          iconId: `check-out-${hotelId}`,
          onPress: async () => {
            try {
              await dispatch(
                markAccommodationAsCheckedOut(
                  selectedEvent?.id,
                  hotel.accommodation?.id || hotel.id
                )
              );
              setHotelsData((prev) =>
                prev.map((h) =>
                  (h.accommodation?.id || h.id) === hotelId
                    ? {
                        ...h,
                        accommodation: {
                          ...h.accommodation,
                          isCheckedOut: true,
                        },
                      }
                    : h
                )
              );
            } catch (error) {
              Alert.alert(
                "Check Out Failed",
                `Failed to check out: ${error.message || "Unknown error"}`,
                [{ text: "OK", style: "default" }]
              );
            }
          },
        },
      ];
    },
    [dispatch, selectedEvent?.id]
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
      const actionButtons = getActionButtons(item);
      return (
        <HotelCard
          item={item}
          width={cardWidth}
          actionButtons={actionButtons}
          onPress={() => handleHotelPress(item)}
        />
      );
    },
    [cardWidth, getActionButtons, handleHotelPress]
  );

  const listKeyExtractor = useCallback((item, index) => {
    return (
      item?.accommodation?.id?.toString() ||
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
