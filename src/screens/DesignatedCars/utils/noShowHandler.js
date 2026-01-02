import { Alert } from "react-native";
import { markTripParticipantNoShow } from "../../../webservice/apiConfig";
import { setIconDisabled } from "../../../redux/reducers/uiReducer";
import { sendNotification } from "../../../config/notificationUtils";

export const handleNoShowSubmit = async (
  selectedDesignatedCarForNoShow,
  noShowReason,
  selectedEventId,
  designatedCarsData,
  dispatch,
  fetchDesignatedCarsData,
  setShowNoShowModal,
  setNoShowReason,
  setSelectedDesignatedCarForNoShow
) => {
  if (!selectedDesignatedCarForNoShow) return;

  const { tripId, participantId } = selectedDesignatedCarForNoShow;

  try {
    await markTripParticipantNoShow(selectedEventId, tripId, participantId, {
      noShow: true,
      reason: noShowReason,
    });

    const item = designatedCarsData.find(
      (d) => d.trip?.id === tripId && d.participant?.id === participantId
    );
    const participantName =
      item?.participant?.firstName && item?.participant?.lastName
        ? `${item.participant.firstName} ${item.participant.lastName}`
        : item?.participant?.firstName ||
          item?.participant?.lastName ||
          "Participant";
    const tripType = item?.trip?.tripType || "Trip";

    await sendNotification(
      "Participant No Show",
      `${participantName} marked as no show for ${tripType}${
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
    fetchDesignatedCarsData();
    setShowNoShowModal(false);
    setNoShowReason("");
    setSelectedDesignatedCarForNoShow(null);
  } catch (error) {
    Alert.alert(
      "Mark No Show Failed",
      `Failed to mark as no show: ${error.message || "Unknown error"}`,
      [{ text: "OK", style: "default" }]
    );
  }
};

