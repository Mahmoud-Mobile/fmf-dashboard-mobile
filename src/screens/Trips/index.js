import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import EmptyListComponent from "../../components/EmptyListComponent";
import TripCard from "./components/TripsCardGrid";
import { Colors } from "../../Global/colors";
import { fetchTrips } from "../../redux/actions/api";
import styles from "./Styles";

const Trips = () => {
  const dispatch = useDispatch();
  const { trips, loading, selectedEvent } = useSelector((state) => state.api);
  const [refreshing, setRefreshing] = useState(false);

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
    // Handle different response structures
    if (trips?.trips && Array.isArray(trips.trips)) {
      return trips.trips;
    }
    if (Array.isArray(trips)) {
      return trips;
    }
    return [];
  }, [trips]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader title="Trips" center={true} />
      <FlatList
        data={tripsList}
        renderItem={({ item }) => <TripCard item={item} />}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        ListEmptyComponent={<EmptyListComponent />}
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
          tripsList.length === 0 ? styles.emptyContainer : styles.listContainer
        }
      />
      <FloatingChatIcon />
    </SafeAreaView>
  );
};

export default Trips;
