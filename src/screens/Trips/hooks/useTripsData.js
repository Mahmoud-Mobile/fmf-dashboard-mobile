import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTripsParticipants } from "../../../redux/actions/api";
import { setIconDisabled } from "../../../redux/reducers/uiReducer";

export const useTripsData = (selectedCategory) => {
  const dispatch = useDispatch();
  const { selectedEvent, tripsParticipants, loading } = useSelector(
    (state) => state.api
  );
  const [tripsData, setTripsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (
      tripsParticipants &&
      tripsParticipants.participants &&
      tripsParticipants.participants.length > 0
    ) {
      // Flatten the nested structure: each participant can have multiple trips
      const transformedData = [];
      tripsParticipants.participants.forEach((participantItem) => {
        const participant = participantItem.participant || {};
        const trips = participantItem.trips || [];
        const hasMultipleTrips = trips.length > 1;

        // Create a separate entry for each trip, but include all trips info
        trips.forEach((tripItem) => {
          const trip = tripItem.trip || {};
          const vehicle = tripItem.vehicle || {};
          const driver = tripItem.driver || null;
          const driverShift = tripItem.driverShift || null;
          const participantTrip = tripItem.participantTrip || {};

          transformedData.push({
            participant,
            trip,
            vehicle,
            driver,
            driverShift,
            participantTrip,
            id: trip.id || "",
            hasMultipleTrips,
            allTrips: trips, // Store all trips for this participant
          });
        });
      });

      setTripsData(transformedData);

      transformedData.forEach((item) => {
        const trip = item.trip || {};
        const participant = item.participant || {};
        const participantTrip = item.participantTrip || {};
        const tripId = trip.id || "";
        const participantId = participant.id || "";

        if (!participantTrip.isPickedUp) {
          dispatch(
            setIconDisabled({
              iconId: `picked-up-${tripId}-${participantId}`,
              disabled: false,
            })
          );
        }

        if (!participantTrip.isNoShow) {
          dispatch(
            setIconDisabled({
              iconId: `no-show-${tripId}-${participantId}`,
              disabled: false,
            })
          );
        }
      });
    } else {
      setTripsData([]);
    }
  }, [tripsParticipants, dispatch]);

  const fetchTripsData = useCallback(() => {
    if (selectedEvent?.id) {
      const params = {
        page: 1,
        limit: 1000,
        ...(selectedCategory !== "all" && { tripType: selectedCategory }),
      };
      dispatch(fetchTripsParticipants(selectedEvent.id, params));
    }
  }, [selectedEvent?.id, dispatch, selectedCategory]);

  useEffect(() => {
    if (selectedEvent?.id) {
      fetchTripsData();
    }
  }, [selectedEvent?.id, selectedCategory, fetchTripsData]);

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (selectedEvent?.id) {
      const params = {
        page: 1,
        limit: 1000,
        ...(selectedCategory !== "all" && { tripType: selectedCategory }),
      };
      dispatch(fetchTripsParticipants(selectedEvent.id, params)).finally(() => {
        setRefreshing(false);
      });
    }
  }, [selectedEvent?.id, dispatch, selectedCategory]);

  return {
    tripsData,
    refreshing,
    fetchTripsData,
    onRefresh,
    selectedEvent,
    loading,
  };
};
