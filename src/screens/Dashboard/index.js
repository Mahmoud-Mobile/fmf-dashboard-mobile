import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  FlatList,
  Alert,
  RefreshControl,
  TouchableOpacity,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { Colors } from "../../Global/colors";
import LoadingModal from "../../components/LoadingModal";
import SearchBar from "../../components/SearchBar";
import DateSearchButton from "../../components/DateSearchButton";
import DateSearchModal from "../../components/DateSearchModal";
import ViewToggle from "../../components/ViewToggle";
import {
  fetchEvents,
  setSelectedEvent,
  fetchEventById,
} from "../../redux/actions/api";
import HomeHeader from "./components/HomeHeader";
import EventCard from "./components";
import EmptyListComponent from "../../components/EmptyListComponent";
import PDFGenerator from "./components/PDFGenerator";
import {
  getGridColumns,
  getDeviceDimensions,
} from "../../constant/deviceUtils";
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
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const { width: screenWidth } = getDeviceDimensions();
  const numColumns = getGridColumns();
  const cardWidth = (screenWidth - 40 - (numColumns - 1) * 10) / numColumns;
  const listCardWidth = screenWidth - 40;

  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Filter by search text
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

    // Filter by date - show all events from selected date onwards
    if (selectedDate) {
      const selectedDateStr = selectedDate.toISOString().split("T")[0];

      filtered = filtered.filter((event) => {
        // Parse event dates correctly - check if they are in JavaScript Date string format
        const startDate = event.startDate
          ? event.startDate.includes("T")
            ? event.startDate.split("T")[0]
            : new Date(event.startDate).toISOString().split("T")[0]
          : null;

        // Show events that start on or after the selected date
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

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.searchRow}>
        <SearchBar
          placeholder="Search events..."
          value={searchText}
          onChangeText={setSearchText}
          onClear={handleSearchClear}
          style={[styles.searchBarInRow, { flex: 1.5 }]}
        />
        <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        <TouchableOpacity
          style={[styles.printButton, isPrinting && styles.printButtonDisabled]}
          onPress={printToFile}
          activeOpacity={0.7}
          disabled={isPrinting}
        >
          <Text style={styles.printButtonText}>{isPrinting ? "⏳" : "📄"}</Text>
        </TouchableOpacity>
        <DateSearchButton
          onPress={() => setShowDateModal(true)}
          selectedDate={selectedDate}
          onClear={() => setSelectedDate(null)}
          title="Show Events From Date"
          style={styles.dateButtonInRow}
        />
      </View>
      {loading ? (
        <LoadingModal visible={loading} />
      ) : (
        <FlatList
          key={viewMode}
          data={filteredEvents}
          renderItem={({ item }) => (
            <EventCard
              item={item}
              onPress={handleEventPress}
              cardWidth={viewMode === "grid" ? cardWidth : listCardWidth}
              isListView={viewMode === "list"}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={viewMode === "grid" ? numColumns : 1}
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
              buttonText={searchText ? "Clear Search" : "Refresh"}
              onRefresh={searchText ? handleSearchClear : onRefresh}
            />
          )}
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
