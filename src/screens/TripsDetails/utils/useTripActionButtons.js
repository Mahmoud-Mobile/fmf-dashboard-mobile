import { useMemo } from "react";
import { useSelector } from "react-redux";
import { handleMarkPickedUp } from "./tripDetailsActions";
import { getParticipantName } from "./tripDetailsUtils";

export const useTripActionButtons = (
  tripData,
  participant,
  selectedEvent,
  dispatch,
  setShowNoShowModal,
  setNoShowReason,
  navigation,
  participantTrip = {}
) => {
  const actionButtonVisibility =
    useSelector((state) => state.ui?.actionButtonVisibility) || {};

  const tripId = tripData?.id || "";
  const participantId = participant?.id || "";
  const userName = getParticipantName(participant);

  // Use participantTrip for isPickedUp and isNoShow, fallback to tripData for backwards compatibility
  const isPickedUp = participantTrip?.isPickedUp ?? tripData?.isPickedUp ?? false;
  const isNoShow = participantTrip?.isNoShow ?? tripData?.isNoShow ?? false;
  const isCompleted = tripData?.status === "COMPLETED" || false;

  const actionButtons = useMemo(() => {
    return [
      {
        icon: "person",
        text: "Mark Picked Up",
        isSelected: isPickedUp,
        disabled: isPickedUp || isNoShow || isCompleted,
        iconId: `picked-up-${tripId}-${participantId}`,
        onPress: async () => {
          const success = await handleMarkPickedUp(
            selectedEvent?.id,
            tripId,
            participantId,
            userName,
            tripData,
            dispatch
          );
          if (success && navigation) {
            navigation.goBack();
          }
        },
      },
      {
        icon: "cancel",
        text: "Mark No Show",
        isSelected: isNoShow,
        disabled: isNoShow || isPickedUp || isCompleted,
        iconId: `no-show-${tripId}-${participantId}`,
        onPress: () => {
          setNoShowReason("");
          setShowNoShowModal(true);
        },
      },
    ];
  }, [
    tripId,
    participantId,
    isPickedUp,
    isNoShow,
    isCompleted,
    selectedEvent?.id,
    userName,
    tripData,
    dispatch,
    setShowNoShowModal,
    setNoShowReason,
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
