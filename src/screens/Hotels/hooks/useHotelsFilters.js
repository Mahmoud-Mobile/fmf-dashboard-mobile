import { useMemo } from "react";
import moment from "moment";

export const useHotelsFilters = (hotelsData, searchText, selectedDate) => {
  const filteredHotels = useMemo(() => {
    let filtered = hotelsData;

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (hotel) =>
          hotel?.accommodation?.hotelName
            ?.toLowerCase()
            .includes(searchLower) ||
          hotel?.accommodation?.roomNumber
            ?.toLowerCase()
            .includes(searchLower) ||
          hotel?.accommodation?.status?.toLowerCase().includes(searchLower)
      );
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
