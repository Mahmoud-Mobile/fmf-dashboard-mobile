import { Alert } from "react-native";
import { markTripParticipantPickedUp } from "../../../webservice/apiConfig";
import { setIconDisabled } from "../../../redux/reducers/uiReducer";
import { sendNotification } from "../../../config/notificationUtils";

export const createDesignatedCarsActionButtons = (
  item,
  selectedEventId,
  fetchDesignatedCarsData,
  onNoShowPress,
  dispatch
) => {
  const trip = item.trip || {};
  const participant = item.participant || {};
  const participantTrip = item.participantTrip || {};
  const tripId = trip.id || "";
  const participantId = participant.id || "";

  const isPickedUp = participantTrip.isPickedUp || false;
  const isNoShow = participantTrip.isNoShow || false;
  const isCompleted = trip.status === "COMPLETED" || false;

  return [
    {
      icon: "arrow-forward",
      text: "Mark Picked Up",
      swipeTitle: "Swipe to Mark Picked Up",
      isSelected: isPickedUp,
      disabled: isPickedUp || isNoShow || isCompleted,
      iconId: `picked-up-${tripId}-${participantId}`,
      onSwipeSuccess: async () => {
        try {
          await markTripParticipantPickedUp(
            selectedEventId,
            tripId,
            participantId,
            { pickedUp: true }
          );

          const participantName =
            item?.participant?.firstName && item?.participant?.lastName
              ? `${item.participant.firstName} ${item.participant.lastName}`
              : item?.participant?.firstName ||
                item?.participant?.lastName ||
                "Participant";
          const tripType = item?.trip?.tripType || "Trip";
          const pickupLocation = item?.trip?.pickupLocation || "";

          await sendNotification(
            "Participant Picked Up",
            `${participantName} has been picked up for ${tripType}${
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
          fetchDesignatedCarsData();
        } catch (error) {
          Alert.alert(
            "Mark Picked Up Failed",
            `Failed to mark as picked up: ${error.message || "Unknown error"}`,
            [{ text: "OK", style: "default" }]
          );
        }
      },
      disabledText: "Picked Up - Done",
    },
    {
      icon: "arrow-forward",
      text: "Mark No Show",
      swipeTitle: "Swipe to Mark No Show",
      isSelected: isNoShow,
      disabled: isNoShow || isPickedUp || isCompleted,
      iconId: `no-show-${tripId}-${participantId}`,
      onSwipeSuccess: () => {
        onNoShowPress({ tripId, participantId });
      },
      disabledText: "No Show - Done",
    },
  ];
};

