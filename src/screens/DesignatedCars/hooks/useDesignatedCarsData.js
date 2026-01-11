import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDesignatedCars } from "../../../redux/actions/api";
import { setIconDisabled } from "../../../redux/reducers/uiReducer";

export const useDesignatedCarsData = (selectedCategory) => {
  const dispatch = useDispatch();
  const { selectedEvent, designatedCars, loading } = useSelector(
    (state) => state.api
  );
  const [designatedCarsData, setDesignatedCarsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (
      designatedCars &&
      designatedCars.participants &&
      designatedCars.participants.length > 0
    ) {
      const transformedData = [];
      designatedCars.participants.forEach((participantItem) => {
        const participant = participantItem.participant || {};
        const cars = participantItem.trips || [];
        const hasMultipleCars = cars.length > 1;

        cars.forEach((carItem) => {
          const car = carItem.trip || {};
          const vehicle = carItem.vehicle || {};
          const driver = carItem.driver || null;
          const driverShift = carItem.driverShift || null;
          const participantCar = carItem.participantTrip || {};

          transformedData.push({
            participant,
            car,
            vehicle,
            driver,
            driverShift,
            participantCar,
            id: car.id || "",
            hasMultipleCars,
            allCars: cars, // Store all cars for this participant
          });
        });
      });

      setDesignatedCarsData(transformedData);

      transformedData.forEach((item) => {
        const car = item.car || {};
        const participant = item.participant || {};
        const participantCar = item.participantCar || {};
        const carId = car.id || "";
        const participantId = participant.id || "";

        if (!participantCar.isPickedUp) {
          dispatch(
            setIconDisabled({
              iconId: `picked-up-${carId}-${participantId}`,
              disabled: false,
            })
          );
        }

        if (!participantCar.isNoShow) {
          dispatch(
            setIconDisabled({
              iconId: `no-show-${carId}-${participantId}`,
              disabled: false,
            })
          );
        }
      });
    } else {
      setDesignatedCarsData([]);
    }
  }, [designatedCars, dispatch]);

  const fetchDesignatedCarsData = useCallback(() => {
    if (selectedEvent?.id) {
      const params = {
        page: 1,
        limit: 500,
      };
      dispatch(fetchDesignatedCars(selectedEvent.id, params));
    }
  }, [selectedEvent?.id, dispatch, selectedCategory]);

  useEffect(() => {
    if (selectedEvent?.id) {
      fetchDesignatedCarsData();
    }
  }, [selectedEvent?.id, selectedCategory, fetchDesignatedCarsData]);

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
      dispatch(fetchDesignatedCars(selectedEvent.id, params)).finally(() => {
        setRefreshing(false);
      });
    }
  }, [selectedEvent?.id, dispatch, selectedCategory]);

  return {
    designatedCarsData,
    refreshing,
    fetchDesignatedCarsData,
    onRefresh,
    selectedEvent,
    loading,
  };
};
