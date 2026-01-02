import { Alert } from "react-native";
import {
  markAccommodationCheckedIn,
  markAccommodationCheckedOut,
} from "../../../webservice/apiConfig";
import { sendNotification } from "../../../config/notificationUtils";

export const createHotelsActionButtons = (
  hotel,
  selectedEventId,
  fetchHotelsData
) => {
  const hotelId = hotel.accommodation?.id || "";
  const isCheckedIn = hotel.accommodation?.isCheckedIn || false;
  const isCheckedOut = hotel.accommodation?.isCheckedOut || false;

  if (!hotelId) {
    return [];
  }

  const isCheckedInDisabled = isCheckedIn === true;
  const isCheckedOutDisabled = isCheckedOut === true;

  const handleCheckIn = async () => {
    try {
      await markAccommodationCheckedIn(selectedEventId, hotelId, {
        checkedIn: true,
      });
      await sendNotification("Guest Checked In", "Checked in successfully", {
        type: "hotel_checked_in",
      });

      Alert.alert(
        "Check In Successful",
        "Guest has been checked in successfully!",
        [{ text: "OK", style: "default" }]
      );
      fetchHotelsData();
    } catch (error) {
      Alert.alert(
        "Check In Failed",
        `Failed to check in: ${error.message || " "}`,
        [{ text: "OK", style: "default" }]
      );
    }
  };

  const handleCheckOut = async () => {
    try {
      await markAccommodationCheckedOut(selectedEventId, hotelId, {
        checkedOut: true,
      });

      await sendNotification("Guest Checked Out", "Checked out successfully", {
        type: "hotel_checked_out",
      });

      Alert.alert(
        "Check Out Successful",
        "Guest has been checked out successfully!",
        [{ text: "OK", style: "default" }]
      );
      fetchHotelsData();
    } catch (error) {
      Alert.alert(
        "Check Out Failed",
        `Failed to check out: ${error.message || " "}`,
        [{ text: "OK", style: "default" }]
      );
    }
  };

  return [
    {
      icon: "check-circle",
      text: "Check In",
      isSelected: !isCheckedInDisabled,
      disabled: isCheckedInDisabled,
      iconId: `check-in-${hotelId}`,
      onPress: handleCheckIn,
    },
    {
      icon: "exit-to-app",
      text: "Check Out",
      isSelected: !isCheckedOutDisabled,
      disabled: isCheckedOutDisabled,
      iconId: `check-out-${hotelId}`,
      onPress: handleCheckOut,
    },
  ];
};
