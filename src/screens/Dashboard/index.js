import React, { useEffect, useState, useMemo, useCallback } from "react";
import { View, Alert, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import LoadingModal from "../../components/LoadingModal";
import DateSearchModal from "../../components/DateSearchModal";
import SearchActionRow from "../../components/SearchActionRow";
import {
  fetchEvents,
  setSelectedEvent,
  fetchEventById,
} from "../../redux/actions/api";
import HomeHeader from "./components/HomeHeader";
import EventCardGrid from "./components/EventCardGrid";
import EventCardList from "./components/EventCardList";
import EmptyListComponent from "../../components/EmptyListComponent";
import PDFGenerator from "./components/PDFGenerator";
import { getDeviceDimensions } from "../../constant/deviceUtils";
import { Colors } from "../../Global/colors";
import styles from "./Styles";

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.api);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const { width: screenWidth } = getDeviceDimensions();

  const numColumns = screenWidth >= 768 ? 3 : 2;
  const horizontalPadding = 24 * 2;
  const gapBetweenCards = (numColumns - 1) * 8;
  const cardWidth =
    (screenWidth - horizontalPadding - gapBetweenCards) / numColumns;
  const listCardWidth = screenWidth - horizontalPadding;

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter((event) => {
        const title = (event.title || event.name || "").toLowerCase();
        const description = (event.description || "").toLowerCase();
        const location = (event.location || "").toLowerCase();
        const eventType = (event.eventType || "").toLowerCase();
        const eventLevel = (event.eventLevel || "").toLowerCase();
        const status = (event.status || "").toLowerCase();

        return (
          title.includes(searchLower) ||
          description.includes(searchLower) ||
          location.includes(searchLower) ||
          eventType.includes(searchLower) ||
          eventLevel.includes(searchLower) ||
          status.includes(searchLower)
        );
      });
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
  }, [events, searchText, selectedDate]);

  useEffect(() => {
    let params = {
      eventLevel: "MAIN",
    };
    dispatch(fetchEvents(params));
  }, [dispatch]);

  const onRefresh = async () => {
    let params = {
      eventLevel: "MAIN",
    };
    setRefreshing(true);
    await dispatch(fetchEvents(params));
    setRefreshing(false);
  };

  const handleEventPress = async (item) => {
    try {
      dispatch(setSelectedEvent(item));
      await dispatch(fetchEventById(item.id));
      navigation.navigate("MyTabs");
    } catch (error) {
      Alert.alert("Error", "Failed to load event details");
    }
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

      // Check if there are events to print
      if (filteredEvents.length === 0) {
        Alert.alert(
          "No Events to Print",
          "There are no events to generate a PDF report. Please adjust your search filters or refresh the data.",
          [{ text: "OK" }]
        );
        return;
      }

      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("PDF generation timeout")), 30000); // 30 seconds timeout
      });

      const generatePromise = async () => {
        const html = PDFGenerator.generateHTML(
          filteredEvents,
          searchText,
          selectedDate
        );
        const { uri } = await Print.printToFileAsync({ html });
        console.log("File has been saved to:", uri);
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
        return uri;
      };

      await Promise.race([generatePromise(), timeoutPromise]);

      Alert.alert(
        "Success",
        `PDF generated successfully with ${filteredEvents.length} event${
          filteredEvents.length !== 1 ? "s" : ""
        }!`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      let errorMessage = "Failed to generate PDF. Please try again.";

      if (error.message === "PDF generation timeout") {
        errorMessage = "PDF generation is taking too long. Please try again.";
      } else if (error.message?.includes("sharing")) {
        errorMessage =
          "PDF was generated but couldn't be shared. Please check your device settings.";
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsPrinting(false);
    }
  };

  const cardSettings = useMemo(() => {
    const isGrid = viewMode === "grid";

    return {
      isGrid,
      component: isGrid ? EventCardGrid : EventCardList,
      width: isGrid ? cardWidth : listCardWidth,
      numColumns: isGrid ? numColumns : 1,
      columnWrapper: isGrid ? styles.columnWrapper : undefined,
    };
  }, [cardWidth, listCardWidth, numColumns, viewMode]);

  const renderEventCard = useCallback(
    ({ item }) => {
      const CardComponent = cardSettings.component;
      return (
        <CardComponent
          item={item}
          onPress={handleEventPress}
          width={cardSettings.width}
        />
      );
    },
    [cardSettings, handleEventPress]
  );

  const listKeyExtractor = useCallback((item, index) => {
    if (item?.id || item?.eventId) {
      return String(item.id || item.eventId);
    }
    if (item?._id) {
      return String(item._id);
    }
    return `event-${index}`;
  }, []);

  return (
    <View style={styles.container}>
      <HomeHeader />
      <SearchActionRow
        searchPlaceholder="Search events..."
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
              icon="Calendar_Icon"
              title={searchText ? "No Events Found" : "No Events Available"}
              description={
                searchText
                  ? `No events match "${searchText}". Try a different search term.`
                  : "There are no events to display at the moment."
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
        title="Filter Events by Date"
        placeholder="Select a date to show events from that date onwards"
      />
    </View>
  );
};

export default Dashboard;
