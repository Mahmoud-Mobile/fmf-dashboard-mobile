import moment from "moment";

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const nativeDate = new Date(dateString);
    if (!isNaN(nativeDate.getTime())) {
      return moment(nativeDate).format("MMM DD, YYYY HH:mm");
    }
    return "-";
  } catch (error) {
    return "-";
  }
};

export const getParticipantName = (participant) => {
  if (!participant) return "Participant";
  const firstName = participant.firstName || "";
  const lastName = participant.lastName || "";
  return `${firstName} ${lastName}`.trim() || "Participant";
};

