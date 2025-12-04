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

