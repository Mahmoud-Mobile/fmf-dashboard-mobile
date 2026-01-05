import moment from "moment";

export const formatDateRange = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return "Date TBD";
  }

  const start = startDate ? moment(startDate) : null;
  const end = endDate ? moment(endDate) : null;

  if (start && end) {
    if (start.isSame(end, "day")) {
      return start.format("DD MMMM, YYYY");
    }

    if (start.year() !== end.year()) {
      return `${start.format("DD MMMM, YYYY")} - ${end.format(
        "DD MMMM, YYYY"
      )}`;
    }

    return `${start.format("DD MMMM")} - ${end.format("DD MMMM, YYYY")}`;
  }

  if (start) {
    return start.format("DD MMMM, YYYY");
  }

  return end.format("DD MMMM, YYYY");
};

export const formatDateTime = (dateString, timeString) => {
  if (!dateString) return "-";
  try {
    const nativeDate = new Date(dateString);
    if (!isNaN(nativeDate.getTime())) {
      const formattedDate = moment(nativeDate).format("MMM DD, YYYY");

      let formattedTime = "";
      if (timeString) {
        const [hours, minutes] = timeString.split(":");
        if (hours && minutes) {
          formattedTime = `${hours.padStart(2, "0")}:${minutes}`;
        } else {
          formattedTime = timeString;
        }
      } else {
        formattedTime = moment(nativeDate).format("HH:mm");
      }

      return `${formattedDate} - ${formattedTime}`;
    }
    return "-";
  } catch (error) {
    return "-";
  }
};
