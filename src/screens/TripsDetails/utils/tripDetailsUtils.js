import moment from "moment";

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const nativeDate = new Date(dateString);
    if (!isNaN(nativeDate.getTime())) {
      return moment(nativeDate).format("MMM DD, YYYY HH:mm");
    }
    return "N/A";
  } catch (error) {
    return "N/A";
  }
};

export const getParticipantName = (participant) => {
  const firstName = participant?.firstName || "";
  const lastName = participant?.lastName || "";
  return [firstName, lastName].filter(Boolean).join(" ") || "N/A";
};
