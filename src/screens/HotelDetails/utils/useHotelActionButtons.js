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

    // If both checked in and checked out, hide all buttons
    if (isCheckedIn && isCheckedOut) {
      return [];
    }

    const buttons = [];

    // If not checked in, show only Check In button
    if (!isCheckedIn) {
      buttons.push({
        icon: "check-circle",
        text: "Check In",
        isSelected: true,
        disabled: false,
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
      });
    }

    // If checked in but not checked out, show only Check Out button
    if (isCheckedIn && !isCheckedOut) {
      buttons.push({
        icon: "exit-to-app",
        text: "Check Out",
        isSelected: true,
        disabled: false,
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
      });
    }

    return buttons;
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
