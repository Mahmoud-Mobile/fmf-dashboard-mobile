import React, { useEffect, useState, useMemo } from "react";
import { View, FlatList, Alert, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../Global/colors";
import LoadingModal from "../../components/LoadingModal";
import SearchBar from "../../components/SearchBar";
import DateSearchButton from "../../components/DateSearchButton";
import DateSearchModal from "../../components/DateSearchModal";
import {
  fetchEvents,
  setSelectedEvent,
  fetchEventById,
} from "../../redux/actions/api";
import HomeHeader from "./components/HomeHeader";
import EventCard from "./components";
import EmptyListComponent from "../../components/EmptyListComponent";
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

  const { width: screenWidth } = getDeviceDimensions();
  const numColumns = getGridColumns();
  const cardWidth = (screenWidth - 40 - (numColumns - 1) * 10) / numColumns;

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
    dispatch(fetchEvents());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchEvents());
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

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.searchRow}>
        <SearchBar
          placeholder="Search events..."
          value={searchText}
          onChangeText={setSearchText}
          onClear={handleSearchClear}
          style={styles.searchBarInRow}
        />
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
          data={filteredEvents}
          renderItem={({ item }) => (
            <EventCard
              item={item}
              onPress={handleEventPress}
              cardWidth={cardWidth}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
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
