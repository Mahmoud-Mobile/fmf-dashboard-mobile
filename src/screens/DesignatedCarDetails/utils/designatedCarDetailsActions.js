import { Alert } from "react-native";
import { markTripParticipantNoShow } from "../../../webservice/apiConfig";
import { markTripParticipantPickedUp } from "../../../webservice/apiConfig";
import { sendNotification } from "../../../config/notificationUtils";

export const handleMarkNoShow = async (
  selectedEventId,
  carId,
  participantId,
  noShowReason,
  userName,
  car,
  dispatch,
  setShowNoShowModal,
  setNoShowReason
) => {
  if (!carId || !participantId) {
    Alert.alert("Error", "Missing car or participant information");
    return false;
  }

  try {
    await markTripParticipantNoShow(selectedEventId, carId, participantId, {
      noShow: true,
      reason: noShowReason,
    });

    const carType = car?.carType || car?.tripType || "Car";

    await sendNotification(
      "Participant No Show",
      `${userName} marked as no show for ${carType}${
        noShowReason ? `: ${noShowReason}` : ""
      }`,
      {
        type: "car_no_show",
        carId: carId,
        participantId: participantId,
      }
    );

    Alert.alert("Success", "Participant marked as no show successfully!", [
      { text: "OK", style: "default" },
    ]);
    setShowNoShowModal(false);
    setNoShowReason("");
    return true;
  } catch (error) {
    Alert.alert(
      "Error",
      "Failed to mark participant as no show. Please try again.",
      [{ text: "OK", style: "default" }]
    );
    return false;
  }
};

export const handleMarkPickedUp = async (
  selectedEventId,
  carId,
  participantId,
  userName,
  car,
  dispatch
) => {
  if (!carId || !participantId) {
    Alert.alert("Error", "Missing car or participant information");
    return false;
  }

  try {
    await markTripParticipantPickedUp(selectedEventId, carId, participantId, {
      pickedUp: true,
    });

    const carType = car?.carType || car?.tripType || "Car";
    const pickupLocation = car?.pickupLocation || "";

    await sendNotification(
      "Participant Picked Up",
      `${userName} has been picked up for ${carType}${
        pickupLocation ? ` from ${pickupLocation}` : ""
      }`,
      {
        type: "car_picked_up",
        carId: carId,
        participantId: participantId,
      }
    );

    Alert.alert("Success", "Participant marked as picked up successfully!", [
      { text: "OK", style: "default" },
    ]);
    return true;
  } catch (error) {
    Alert.alert(
      "Error",
      "Failed to mark participant as picked up. Please try again.",
      [{ text: "OK", style: "default" }]
    );
    return false;
  }
};

