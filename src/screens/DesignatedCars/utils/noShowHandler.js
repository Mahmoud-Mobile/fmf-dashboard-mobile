import { Alert } from "react-native";
import { markTripParticipantNoShow } from "../../../webservice/apiConfig";
import { setIconDisabled } from "../../../redux/reducers/uiReducer";
import { sendNotification } from "../../../config/notificationUtils";

export const handleNoShowSubmit = async (
  selectedCarForNoShow,
  noShowReason,
  selectedEventId,
  designatedCarsData,
  dispatch,
  fetchDesignatedCarsData,
  setShowNoShowModal,
  setNoShowReason,
  setSelectedCarForNoShow
) => {
  if (!selectedCarForNoShow) return;

  const { carId, participantId } = selectedCarForNoShow;

  try {
    await markTripParticipantNoShow(selectedEventId, carId, participantId, {
      noShow: true,
      reason: noShowReason,
    });

    const item = designatedCarsData.find(
      (d) => d.car?.id === carId && d.participant?.id === participantId
    );
    const participantName =
      item?.participant?.firstName && item?.participant?.lastName
        ? `${item.participant.firstName} ${item.participant.lastName}`
        : item?.participant?.firstName ||
          item?.participant?.lastName ||
          "Participant";
    const carType = item?.car?.carType || item?.car?.tripType || "Car";

    await sendNotification(
      "Participant No Show",
      `${participantName} marked as no show for ${carType}${
        noShowReason ? `: ${noShowReason}` : ""
      }`,
      {
        type: "car_no_show",
        carId: carId,
        participantId: participantId,
      }
    );

    dispatch(
      setIconDisabled({
        iconId: `no-show-${carId}-${participantId}`,
        disabled: false,
      })
    );
    fetchDesignatedCarsData();
    setShowNoShowModal(false);
    setNoShowReason("");
    setSelectedCarForNoShow(null);
  } catch (error) {
    Alert.alert(
      "Mark No Show Failed",
      `Failed to mark as no show: ${error.message || "Unknown error"}`,
      [{ text: "OK", style: "default" }]
    );
  }
};

