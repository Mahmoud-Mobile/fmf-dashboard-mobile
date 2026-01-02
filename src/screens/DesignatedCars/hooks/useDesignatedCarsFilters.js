import { useMemo } from "react";
import moment from "moment";

export const useDesignatedCarsFilters = (
  designatedCarsData,
  searchText,
  selectedDate
) => {
  const filteredDesignatedCars = useMemo(() => {
    let filtered = designatedCarsData;

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item?.participant?.firstName?.toLowerCase().includes(searchLower) ||
          item?.participant?.lastName?.toLowerCase().includes(searchLower) ||
          item?.participant?.email?.toLowerCase().includes(searchLower) ||
          item?.participant?.phone?.toLowerCase().includes(searchLower) ||
          item?.trip?.pickupLocation?.toLowerCase().includes(searchLower) ||
          item?.trip?.dropoffLocation?.toLowerCase().includes(searchLower) ||
          item?.trip?.tripType?.toLowerCase().includes(searchLower) ||
          item?.trip?.status?.toLowerCase().includes(searchLower)
      );
    }

    if (selectedDate) {
      const selectedMoment = moment(new Date(selectedDate)).startOf("day");
      if (!selectedMoment.isValid()) {
        return filtered;
      }

      filtered = filtered.filter((item) => {
        const scheduledPickup = item?.trip?.scheduledPickup;
        if (scheduledPickup) {
          const tripMoment = moment(new Date(scheduledPickup)).startOf("day");
          if (tripMoment.isValid()) {
            return tripMoment.isSameOrAfter(selectedMoment);
          }
        }
        return false;
      });
    }

    return filtered;
  }, [designatedCarsData, searchText, selectedDate]);

  return filteredDesignatedCars;
};

