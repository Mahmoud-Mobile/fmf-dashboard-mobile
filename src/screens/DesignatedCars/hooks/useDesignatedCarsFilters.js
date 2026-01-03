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
          item?.car?.pickupLocation?.toLowerCase().includes(searchLower) ||
          item?.car?.dropoffLocation?.toLowerCase().includes(searchLower) ||
          item?.car?.carType?.toLowerCase().includes(searchLower) ||
          item?.car?.status?.toLowerCase().includes(searchLower)
      );
    }

    if (selectedDate) {
      const selectedMoment = moment(new Date(selectedDate)).startOf("day");
      if (!selectedMoment.isValid()) {
        return filtered;
      }

      filtered = filtered.filter((item) => {
        const scheduledPickup = item?.car?.scheduledPickup;
        if (scheduledPickup) {
          const carMoment = moment(new Date(scheduledPickup)).startOf("day");
          if (carMoment.isValid()) {
            return carMoment.isSameOrAfter(selectedMoment);
          }
        }
        return false;
      });
    }

    return filtered;
  }, [designatedCarsData, searchText, selectedDate]);

  return filteredDesignatedCars;
};

