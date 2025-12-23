import React, { useState, useCallback, useMemo } from "react";
import { View, FlatList, RefreshControl, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomEventHeader from "../../components/CustomEventHeader";
import SearchActionRow from "../../components/SearchActionRow";
import FloatingChatIcon from "../../components/FloatingChatIcon";
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
import styles from "./Styles";

// Dummy hotel data
const dummyHotelsData = [
  {
    id: "1",
    guestName: "Ahmed Mohamed",
    phone: "+966 65 090 7242",
    organizationType: "Government",
    arrivalDate: "2026-01-10T16:00:00",
    hotelName: "Marriott Hotel",
    roomNumber: "207",
    assignedTo: "Mohammed Al-Rashid",
    isRoomPrepared: false,
    isGuestArrived: true,
    isRoomOccupied: true,
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    guestName: "Ahmed Mohamed",
    phone: "+966 65 090 7242",
    organizationType: "Government",
    arrivalDate: "2026-01-10T16:00:00",
    hotelName: "Ritz Carlton Hotel",
    roomNumber: "207",
    assignedTo: "Mohammed Al-Rashid",
    isRoomPrepared: true,
    isGuestArrived: false,
    isRoomOccupied: false,
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    guestName: "Ahmed Mohamed",
    phone: "+966 65 090 7242",
    organizationType: "Government",
    arrivalDate: "2026-01-10T16:00:00",
    hotelName: "Ritz Carlton Hotel",
    roomNumber: "207",
    assignedTo: "Mohammed Al-Rashid",
    isRoomPrepared: false,
    isGuestArrived: false,
    isRoomOccupied: false,
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    guestName: "Ahmed Mohamed",
    phone: "+966 65 090 7242",
    organizationType: "Government",
    arrivalDate: "2026-01-10T16:00:00",
    hotelName: "Ritz Carlton Hotel",
    roomNumber: "207",
    assignedTo: "Mohammed Al-Rashid",
    isRoomPrepared: false,
    isGuestArrived: true,
    isRoomOccupied: false,
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
];

const Hotels = () => {
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [hotelsData, setHotelsData] = useState(dummyHotelsData);

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

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredHotels = useMemo(() => {
    let filtered = hotelsData;

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (hotel) =>
          hotel?.guestName?.toLowerCase().includes(searchLower) ||
          hotel?.hotelName?.toLowerCase().includes(searchLower) ||
          hotel?.roomNumber?.toLowerCase().includes(searchLower) ||
          hotel?.phone?.toLowerCase().includes(searchLower) ||
          hotel?.assignedTo?.toLowerCase().includes(searchLower)
      );
    }

    if (selectedDate) {
      const selectedDateStr = selectedDate.toISOString().split("T")[0];
      filtered = filtered.filter((hotel) => {
        if (hotel?.arrivalDate) {
          const hotelDate = new Date(hotel.arrivalDate)
            .toISOString()
            .split("T")[0];
          return hotelDate >= selectedDateStr;
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
      // Transform hotels data into Excel rows
      const excelRows = filteredHotels.map((hotel) => {
        return {
          "Hotel ID": hotel.id || "N/A",
          "Guest Name": hotel.guestName || "N/A",
          "Guest Mobile": hotel.phone || "N/A",
          "Organization Type": hotel.organizationType || "N/A",
          "Arrival Date": formatDateTime(hotel.arrivalDate),
          "Hotel Name": hotel.hotelName || "N/A",
          "Room Number": hotel.roomNumber || "N/A",
          "Assigned To": hotel.assignedTo || "N/A",
          "Room Prepared": hotel.isRoomPrepared ? "Yes" : "No",
          "Guest Arrived": hotel.isGuestArrived ? "Yes" : "No",
          "Room Occupied": hotel.isRoomOccupied ? "Yes" : "No",
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
      console.error("Error exporting hotels to Excel:", error);
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

  const getActionButtons = useCallback((hotel) => {
    const hotelId = hotel.id || "unknown";

    return [
      {
        icon: "home",
        text: "Room Prepared",
        isSelected: hotel.isRoomPrepared || false,
        disabled: false,
        iconId: `room-prepared-${hotelId}`,
        onPress: () => {
          setHotelsData((prev) =>
            prev.map((h) =>
              h.id === hotel.id
                ? { ...h, isRoomPrepared: !h.isRoomPrepared }
                : h
            )
          );
        },
      },
      {
        icon: "person",
        text: "Guest Arrived",
        isSelected: hotel.isGuestArrived || false,
        disabled: false,
        iconId: `guest-arrived-${hotelId}`,
        onPress: () => {
          setHotelsData((prev) =>
            prev.map((h) =>
              h.id === hotel.id
                ? { ...h, isGuestArrived: !h.isGuestArrived }
                : h
            )
          );
        },
      },
      {
        icon: "hotel",
        text: "Room Occupied",
        isSelected: hotel.isRoomOccupied || false,
        disabled: false,
        iconId: `room-occupied-${hotelId}`,
        onPress: () => {
          setHotelsData((prev) =>
            prev.map((h) =>
              h.id === hotel.id
                ? { ...h, isRoomOccupied: !h.isRoomOccupied }
                : h
            )
          );
        },
      },
    ];
  }, []);

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
        contentInsetAdjustmentBehavior="always"
      />
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
