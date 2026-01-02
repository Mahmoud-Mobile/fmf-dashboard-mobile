import { Alert } from "react-native";
import {
  markAccommodationCheckedIn,
  markAccommodationCheckedOut,
} from "../../../webservice/apiConfig";
import { sendNotification } from "../../../config/notificationUtils";

export const handleCheckIn = async (
  selectedEventId,
  hotelId,
  participantName,
  hotelName,
  roomNumber
) => {
  try {
    await markAccommodationCheckedIn(selectedEventId, hotelId, {
      checkedIn: true,
    });

    await sendNotification(
      "Guest Checked In",
      `${participantName} has checked in at ${hotelName}${
        roomNumber ? ` (Room ${roomNumber})` : ""
      }`,
      {
        type: "hotel_checked_in",
        accommodationId: hotelId,
      }
    );

    Alert.alert(
      "Check In Successful",
      "Guest has been checked in successfully!",
      [{ text: "OK", style: "default" }]
    );
    return true;
  } catch (error) {
    Alert.alert(
      "Check In Failed",
      `Failed to check in: ${error.message || "Unknown error"}`,
      [{ text: "OK", style: "default" }]
    );
    return false;
  }
};

export const handleCheckOut = async (
  selectedEventId,
  hotelId,
  participantName,
  hotelName,
  roomNumber
) => {
  try {
    await markAccommodationCheckedOut(selectedEventId, hotelId, {
      checkedOut: true,
    });

    await sendNotification(
      "Guest Checked Out",
      `${participantName} has checked out from ${hotelName}${
        roomNumber ? ` (Room ${roomNumber})` : ""
      }`,
      {
        type: "hotel_checked_out",
        accommodationId: hotelId,
      }
    );

    Alert.alert(
      "Check Out Successful",
      "Guest has been checked out successfully!",
      [{ text: "OK", style: "default" }]
    );
    return true;
  } catch (error) {
    Alert.alert(
      "Check Out Failed",
      `Failed to check out: ${error.message || "Unknown error"}`,
      [{ text: "OK", style: "default" }]
    );
    return false;
  }
};
