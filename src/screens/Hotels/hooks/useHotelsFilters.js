import { useMemo } from "react";
import moment from "moment";

const searchInObject = (obj, searchText) => {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  const searchLower = searchText.toLowerCase();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (
        value === null ||
        value === undefined ||
        typeof value === "function"
      ) {
        continue;
      }

      if (typeof value === "string" || typeof value === "number") {
        if (String(value).toLowerCase().includes(searchLower)) {
          return true;
        }
      } else if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        !(value instanceof Date)
      ) {
        if (searchInObject(value, searchText)) {
          return true;
        }
      } else if (Array.isArray(value)) {
        for (const item of value) {
          if (searchInObject(item, searchText)) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

export const useHotelsFilters = (hotelsData, searchText, selectedDate) => {
  const filteredHotels = useMemo(() => {
    let filtered = hotelsData;

    if (searchText.trim()) {
      filtered = filtered.filter((hotel) => searchInObject(hotel, searchText));
    }

    if (selectedDate) {
      const selectedMoment = moment(new Date(selectedDate)).startOf("day");
      if (!selectedMoment.isValid()) {
        return filtered;
      }

      filtered = filtered.filter((hotel) => {
        const checkInMoment = hotel?.accommodation?.checkInDate
          ? moment(new Date(hotel.accommodation.checkInDate)).startOf("day")
          : null;
        const checkOutMoment = hotel?.accommodation?.checkOutDate
          ? moment(new Date(hotel.accommodation.checkOutDate)).startOf("day")
          : null;

        if (
          checkInMoment &&
          checkInMoment.isValid() &&
          checkOutMoment &&
          checkOutMoment.isValid()
        ) {
          return (
            selectedMoment.isSameOrAfter(checkInMoment) &&
            selectedMoment.isSameOrBefore(checkOutMoment)
          );
        } else if (checkInMoment && checkInMoment.isValid()) {
          return selectedMoment.isSameOrAfter(checkInMoment);
        } else if (checkOutMoment && checkOutMoment.isValid()) {
          return selectedMoment.isSameOrBefore(checkOutMoment);
        }
        return false;
      });
    }

    return filtered;
  }, [hotelsData, searchText, selectedDate]);

  return filteredHotels;
};
