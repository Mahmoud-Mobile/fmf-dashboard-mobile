import { Alert } from "react-native";
import {
  markTripParticipantNoShow,
  markTripParticipantPickedUp,
} from "../../../webservice/apiConfig";
import { setIconDisabled } from "../../../redux/reducers/uiReducer";
import { sendNotification } from "../../../config/notificationUtils";

export const handleMarkPickedUp = async (
  selectedEventId,
  tripId,
  participantId,
  userName,
  tripData,
  dispatch
) => {
  try {
    await markTripParticipantPickedUp(selectedEventId, tripId, participantId, {
      pickedUp: true,
    });

    const tripType = tripData?.tripType || "Trip";
    const pickupLocation = tripData?.pickupLocation || "";

    await sendNotification(
      "Participant Picked Up",
      `${userName} has been picked up for ${tripType}${
        pickupLocation ? ` from ${pickupLocation}` : ""
      }`,
      {
        type: "trip_picked_up",
        tripId: tripId,
        participantId: participantId,
      }
    );

    dispatch(
      setIconDisabled({
        iconId: `picked-up-${tripId}-${participantId}`,
        disabled: false,
      })
    );

    Alert.alert("Success", "Participant marked as picked up");
    return true;
  } catch (error) {
    Alert.alert(
      "Mark Picked Up Failed",
      `Failed to mark as picked up: ${error.message || "Unknown error"}`
    );
    return false;
  }
};

export const handleMarkNoShow = async (
  selectedEventId,
  tripId,
  participantId,
  noShowReason,
  userName,
  tripData,
  dispatch,
  setShowNoShowModal,
  setNoShowReason
) => {
  try {
    await markTripParticipantNoShow(selectedEventId, tripId, participantId, {
      noShow: true,
      reason: noShowReason,
    });

    const tripType = tripData?.tripType || "Trip";

    await sendNotification(
      "Participant No Show",
      `${userName} marked as no show for ${tripType}${
        noShowReason ? `: ${noShowReason}` : ""
      }`,
      {
        type: "trip_no_show",
        tripId: tripId,
        participantId: participantId,
      }
    );

    dispatch(
      setIconDisabled({
        iconId: `no-show-${tripId}-${participantId}`,
        disabled: false,
      })
    );

    setShowNoShowModal(false);
    setNoShowReason("");
    Alert.alert("Success", "Participant marked as no show");
    return true;
  } catch (error) {
    Alert.alert(
      "Mark No Show Failed",
      `Failed to mark as no show: ${error.message || "Unknown error"}`
    );
    return false;
  }
};

