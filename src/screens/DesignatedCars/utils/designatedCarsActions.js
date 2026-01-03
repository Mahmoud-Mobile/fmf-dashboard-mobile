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
  const car = item.car || {};
  const participant = item.participant || {};
  const participantCar = item.participantCar || {};
  const carId = car.id || "";
  const participantId = participant.id || "";
  const isPickedUp = participantCar.isPickedUp || false;
  const isNoShow = participantCar.isNoShow || false;
  const isCompleted = car.status === "COMPLETED" || false;

  return [
    {
      icon: "arrow-forward",
      text: "Mark Picked Up",
      swipeTitle: "Swipe to Mark Picked Up",
      isSelected: isPickedUp,
      disabled: isPickedUp || isNoShow || isCompleted,
      iconId: `picked-up-${carId}-${participantId}`,
      onSwipeSuccess: async () => {
        try {
          await markTripParticipantPickedUp(
            selectedEventId,
            carId,
            participantId,
            { pickedUp: true }
          );

          const participantName =
            item?.participant?.firstName && item?.participant?.lastName
              ? `${item.participant.firstName} ${item.participant.lastName}`
              : item?.participant?.firstName ||
                item?.participant?.lastName ||
                "Participant";
          const carType = item?.car?.carType || item?.car?.tripType || "Car";
          const pickupLocation = item?.car?.pickupLocation || "";

          await sendNotification(
            "Participant Picked Up",
            `${participantName} has been picked up for ${carType}${
              pickupLocation ? ` from ${pickupLocation}` : ""
            }`,
            {
              type: "car_picked_up",
              carId: carId,
              participantId: participantId,
            }
          );

          dispatch(
            setIconDisabled({
              iconId: `picked-up-${carId}-${participantId}`,
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
      iconId: `no-show-${carId}-${participantId}`,
      onSwipeSuccess: () => {
        onNoShowPress({ carId, participantId });
      },
      disabledText: "No Show - Done",
    },
  ];
};

