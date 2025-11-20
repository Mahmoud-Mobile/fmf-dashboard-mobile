import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomEventHeader from "../../components/CustomEventHeader";
import SearchActionRow from "../../components/SearchActionRow";
import LoadingModal from "../../components/LoadingModal";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import EmptyListComponent from "../../components/EmptyListComponent";
import DateSearchModal from "../../components/DateSearchModal";
import TripCard from "./components/TripsCardGrid";
import { Colors } from "../../Global/colors";
import { fetchTrips } from "../../redux/actions/api";
import styles from "./Styles";

const Trips = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { trips, loading, selectedEvent } = useSelector((state) => state.api);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const fetchTripsData = useCallback(() => {
    if (selectedEvent?.id) {
      const params = {
        status: "SCHEDULED",
        page: 1,
        limit: 1000,
      };
      dispatch(fetchTrips(selectedEvent.id, params));
    }
  }, [selectedEvent?.id, dispatch]);

  useEffect(() => {
    if (selectedEvent?.id) {
      fetchTripsData();
    }
  }, [selectedEvent?.id, fetchTripsData]);

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTripsData();
  };

  const tripsList = useMemo(() => {
    if (!trips) {
      return [];
    }
    if (trips?.trips && Array.isArray(trips.trips)) {
      return trips.trips;
    }
    if (Array.isArray(trips)) {
      return trips;
    }
    return [];
  }, [trips]);

  const filteredTrips = useMemo(() => {
    let filtered = tripsList;

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (trip) =>
          trip?.title?.toLowerCase().includes(searchLower) ||
          trip?.pickupLocation?.toLowerCase().includes(searchLower) ||
          trip?.dropoffLocation?.toLowerCase().includes(searchLower) ||
          trip?.tripType?.toLowerCase().includes(searchLower) ||
          trip?.status?.toLowerCase().includes(searchLower)
      );
    }

    if (selectedDate) {
      const selectedDateStr = selectedDate.toISOString().split("T")[0];
      filtered = filtered.filter((trip) => {
        if (trip?.scheduledPickup) {
          const tripDate = new Date(trip.scheduledPickup)
            .toISOString()
            .split("T")[0];
          return tripDate >= selectedDateStr;
        }
        return false;
      });
    }

    return filtered;
  }, [tripsList, searchText, selectedDate]);

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
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
    }, 1000);
  };

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
      {loading ? (
        <LoadingModal visible={loading} />
      ) : (
        <FlatList
          data={filteredTrips}
          renderItem={({ item }) => <TripCard item={item} />}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          }
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
        />
      )}

      <FloatingChatIcon />

      <DateSearchModal
        visible={showDateModal}
        onClose={handleDateModalClose}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
        title="Filter Trips by Date"
        placeholder="Select a date to show trips from that date onwards"
      />
    </View>
  );
};

export default Trips;
