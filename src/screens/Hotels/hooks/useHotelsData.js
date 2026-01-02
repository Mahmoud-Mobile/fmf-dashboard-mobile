import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccommodationParticipants } from "../../../redux/actions/api";

export const useHotelsData = () => {
  const dispatch = useDispatch();
  const { selectedEvent, accommodation } = useSelector((state) => state.api);
  const [hotelsData, setHotelsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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

  const fetchHotelsData = useCallback(() => {
    if (selectedEvent?.id) {
      dispatch(
        fetchAccommodationParticipants(selectedEvent.id, {
          page: 1,
          limit: 1000,
        })
      );
    }
  }, [selectedEvent?.id, dispatch]);

  useEffect(() => {
    if (selectedEvent?.id) {
      fetchHotelsData();
    }
  }, [selectedEvent?.id, fetchHotelsData]);

  const onRefresh = useCallback(() => {
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
  }, [selectedEvent?.id, dispatch]);

  return {
    hotelsData,
    refreshing,
    fetchHotelsData,
    onRefresh,
    selectedEvent,
  };
};
