import moment from "moment";

export const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const nativeDate = new Date(dateString);
    if (!isNaN(nativeDate.getTime())) {
      return moment(nativeDate).format("MMM DD, YYYY, h:mm A");
    }
    return "";
  } catch (error) {
    return "";
  }
};

export const getParticipantName = (participant) => {
  if (participant?.firstName && participant?.lastName) {
    return `${participant.firstName} ${participant.lastName}`;
  }
  return participant?.firstName || participant?.lastName || "Guest";
};
