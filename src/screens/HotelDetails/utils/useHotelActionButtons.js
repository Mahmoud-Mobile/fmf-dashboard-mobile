import { useMemo } from "react";
import { useSelector } from "react-redux";
import { handleCheckIn, handleCheckOut } from "./hotelDetailsActions";
import { getParticipantName } from "./hotelDetailsUtils";

export const useHotelActionButtons = (hotel, selectedEvent, navigation) => {
  const actionButtonVisibility =
    useSelector((state) => state.ui?.actionButtonVisibility) || {};

  const hotelId = hotel.accommodation?.id || "";
  const isCheckedIn = hotel.accommodation?.isCheckedIn || false;
  const isCheckedOut = hotel.accommodation?.isCheckedOut || false;

  const participantName = getParticipantName(hotel.participant);
  const hotelName = hotel.accommodation?.hotel?.name || "Hotel";
  const roomNumber = hotel.accommodation?.room?.roomNumber || "";

  const actionButtons = useMemo(() => {
    if (!hotelId) {
      return [];
    }

    return [
      {
        icon: "check-circle",
        text: "Check In",
        isSelected: isCheckedIn,
        disabled: isCheckedIn,
        iconId: `check-in-${hotelId}`,
        onPress: async () => {
          const success = await handleCheckIn(
            selectedEvent?.id,
            hotelId,
            participantName,
            hotelName,
            roomNumber
          );
          if (success && navigation) {
            navigation.goBack();
          }
        },
      },
      {
        icon: "exit-to-app",
        text: "Check Out",
        isSelected: isCheckedOut,
        disabled: isCheckedOut,
        iconId: `check-out-${hotelId}`,
        onPress: async () => {
          const success = await handleCheckOut(
            selectedEvent?.id,
            hotelId,
            participantName,
            hotelName,
            roomNumber
          );
          if (success && navigation) {
            navigation.goBack();
          }
        },
      },
    ];
  }, [
    hotelId,
    isCheckedIn,
    isCheckedOut,
    selectedEvent?.id,
    participantName,
    hotelName,
    roomNumber,
    navigation,
  ]);

  const filteredActionButtons = useMemo(() => {
    if (!actionButtons || !Array.isArray(actionButtons)) return [];
    return actionButtons.filter((button) => {
      if (!button || !button.text) return true;
      const storedValue = actionButtonVisibility[button.text];
      const isVisible =
        storedValue === undefined
          ? true
          : typeof storedValue === "string"
          ? storedValue === "true"
          : Boolean(storedValue);
      return isVisible;
    });
  }, [actionButtons, actionButtonVisibility]);

  return filteredActionButtons;
};
