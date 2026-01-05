import moment from "moment";

export const prepareFlightExportData = (flight, selectedCategory = "all") => {
  const participant = flight.participant || {};
  const firstName = participant.firstName || "";
  const lastName = participant.lastName || "";
  const passengerName = `${firstName} ${lastName}`.trim() || "-";
  const email = participant.email || "-";
  const phone = participant.phone || "-";
  const participantCode = participant.participantCode || "-";
  const participantType = participant?.participantType?.name || "-";
  const nationality = participant?.nationality?.name || "-";
  const nationalityCode = participant?.nationality?.code || "-";

  const formatDateOnly = (date) => {
    if (!date) return "-";
    try {
      const nativeDate = new Date(date);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("MMM DD, YYYY");
      }
      return "-";
    } catch (error) {
      return "-";
    }
  };

  const formatTimeOnly = (date, time) => {
    if (!date && !time) return "-";
    try {
      if (time) {
        const [hours, minutes] = time.split(":");
        if (hours && minutes) {
          return `${hours.padStart(2, "0")}:${minutes}`;
        }
        return time;
      }
      if (date) {
        const nativeDate = new Date(date);
        if (!isNaN(nativeDate.getTime())) {
          return moment(nativeDate).format("HH:mm");
        }
      }
      return "-";
    } catch (error) {
      return "-";
    }
  };

  // Arrival flight data
  const arrivalAirlineName = flight.arrivalAirlinesName || "-";
  const arrivalFlightNumber = flight.arrivalFlightNumber || "-";
  const arrivalAirport = flight.arrivalAirport || "-";
  const arrivalAirportCode = flight.arrivalAirportCode || "-";
  const arrivalCity = flight.arrivalCity || "-";
  const arrivalDate = formatDateOnly(flight.arrivalDate);
  const arrivalTime = formatTimeOnly(flight.arrivalDate, flight.arrivalTime);
  const arrivalStatus = flight.arrivalFlightStatus || "-";

  // Return/Departure flight data
  const returnAirlineName =
    flight.returnAirlinesName || flight.returnAirlineName || "-";
  const returnFlightNumber = flight.returnFlightNumber || "-";
  const returnAirport = flight.returnAirport || "-";
  const returnAirportCode = flight.returnAirportCode || "-";
  const returnCity = flight.returnCity || "-";
  const returnDate = formatDateOnly(flight.returnDate);
  const returnTime = formatTimeOnly(flight.returnDate, flight.returnTime);
  const returnStatus = flight.returnFlightStatus || "-";

  // Flight details
  const flightType = flight.flightType || "-";
  const aircraftType = flight.aircraftType || "-";
  const flightClass = flight.flightClass || "-";
  const ticketNumber = flight.ticketNumber || "-";

  // Status flags
  const isParticipantArrived = flight.isParticipantArrived ? "Yes" : "No";
  const isParticipantDeparted = flight.isParticipantDeparted ? "Yes" : "No";
  const isMeetDone = flight.isMeetDone ? "Yes" : "No";
  const isLuggageReceived = flight.isLuggageReceived ? "Yes" : "No";

  // Special requirements
  const wheelchairRequired = flight.wheelchairRequired ? "Yes" : "No";
  const mobilityAssistance = flight.mobilityAssistance ? "Yes" : "No";
  const visaRequired = flight.visaRequired ? "Yes" : "No";
  const visaStatus = flight.visaStatus || "-";

  return {
    // Participant Information
    "Passenger Name": passengerName,
    "First Name": firstName || "-",
    "Last Name": lastName || "-",
    Email: email,
    Phone: phone,
    "Participant Code": participantCode,
    "Participant Type": participantType,
    Nationality: nationality,
    "Nationality Code": nationalityCode,

    // Arrival Flight Information
    "Arrival Airline": arrivalAirlineName,
    "Arrival Flight Number": arrivalFlightNumber,
    "Arrival Airport": arrivalAirport,
    "Arrival Airport Code": arrivalAirportCode,
    "Arrival City": arrivalCity,
    "Arrival Date": arrivalDate,
    "Arrival Time": arrivalTime,
    "Arrival Status": arrivalStatus,

    // Return/Departure Flight Information
    "Return Airline": returnAirlineName,
    "Return Flight Number": returnFlightNumber,
    "Return Airport": returnAirport,
    "Return Airport Code": returnAirportCode,
    "Return City": returnCity,
    "Return Date": returnDate,
    "Return Time": returnTime,
    "Return Status": returnStatus,

    // Flight Details
    "Flight Type": flightType,
    "Aircraft Type": aircraftType,
    "Flight Class": flightClass,
    "Ticket Number": ticketNumber,

    // Status Flags
    "Participant Arrived": isParticipantArrived,
    "Participant Departed": isParticipantDeparted,
    "Meet Done": isMeetDone,
    "Luggage Received": isLuggageReceived,

    // Special Requirements
    "Wheelchair Required": wheelchairRequired,
    "Mobility Assistance": mobilityAssistance,
    "Visa Required": visaRequired,
    "Visa Status": visaStatus,
  };
};
