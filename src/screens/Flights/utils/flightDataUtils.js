export const extractParticipantData = (participant = {}) => {
  const firstName = participant.firstName || "";
  const lastName = participant.lastName || "";
  const userName = `${firstName} ${lastName}`.trim() || "-";
  const userMobile = participant.phone || "-";
  const userPhoto = participant.profilePicture || participant.photo || null;
  const participantType = participant?.participantType?.name || null;

  return {
    userName,
    userMobile,
    userPhoto,
    firstName,
    lastName,
    participantType,
  };
};

export const prepareFlightCardData = (flight, selectedCategory = "all") => {
  let flightData = {};
  let date = null;
  let time = null;

  const passengerData = extractParticipantData(flight.participant);

  if (flight.flightType === "ARRIVAL") {
    flightData = {
      airlineName: flight.arrivalAirlinesName,
      flightNumber: flight.arrivalFlightNumber,
      status: flight.arrivalFlightStatus,
      airportCode: flight.arrivalAirportCode,
      airportName: flight.arrivalAirport,
      ...passengerData,
    };

    date = flight.arrivalDate;
    time = flight.arrivalTime;
  } else if (flight.flightType === "DEPARTURE") {
    flightData = {
      airlineName: flight.returnAirlinesName || flight.returnAirlineName || "-",
      flightNumber: flight.returnFlightNumber,
      status: flight.returnFlightStatus,
      airportCode: flight.returnAirportCode || "-",
      airportName: flight.returnAirport || "-",
      ...passengerData,
    };

    date = flight.returnDate;
    time = flight.returnTime;
  } else {
    if (selectedCategory === "arrival") {
      flightData = {
        airlineName: flight.arrivalAirlinesName,
        flightNumber: flight.arrivalFlightNumber,
        status: flight.arrivalFlightStatus,
        airportCode: flight.arrivalAirportCode,
        airportName: flight.arrivalAirport,
        ...passengerData,
      };

      date = flight.arrivalDate;
      time = flight.arrivalTime;
    } else if (selectedCategory === "return") {
      flightData = {
        airlineName:
          flight.returnAirlinesName || flight.returnAirlineName || "-",
        flightNumber: flight.returnFlightNumber,
        status: flight.returnFlightStatus,
        airportCode: flight.returnAirportCode || "-",
        airportName: flight.returnAirport || "-",
        ...passengerData,
      };

      date = flight.returnDate;
      time = flight.returnTime;
    } else {
      flightData = {
        airlineName: flight.arrivalAirlinesName,
        flightNumber: flight.arrivalFlightNumber,
        status: flight.arrivalFlightStatus,
        airportCode: flight.arrivalAirportCode,
        airportName: flight.arrivalAirport,
        ...passengerData,
      };

      date = flight.arrivalDate;
      time = flight.arrivalTime;
    }
  }

  return {
    ...flightData,
    date,
    time,
    returnDate: flight.returnDate || null,
    returnTime: flight.returnTime || null,
  };
};

export const filterFlightsBySearch = (flights, searchText) => {
  if (!searchText.trim()) return flights;

  const searchLower = searchText.toLowerCase();

  return flights.filter((flight) => {
    const flightNumber = (
      flight.arrivalFlightNumber ||
      flight.returnFlightNumber ||
      ""
    ).toLowerCase();
    const airportCode = (
      flight.arrivalAirportCode ||
      flight.returnAirportCode ||
      ""
    ).toLowerCase();
    const airportName = (
      flight.arrivalAirport ||
      flight.returnAirport ||
      ""
    ).toLowerCase();
    const flightType = (flight.flightType || "").toLowerCase();
    const status = (
      flight.arrivalFlightStatus ||
      flight.returnFlightStatus ||
      ""
    ).toLowerCase();

    const participant = flight.participant || {};
    const firstName = (participant.firstName || "").toLowerCase();
    const lastName = (participant.lastName || "").toLowerCase();
    const userName = `${firstName} ${lastName}`.trim().toLowerCase();

    return (
      flightNumber.includes(searchLower) ||
      airportCode.includes(searchLower) ||
      airportName.includes(searchLower) ||
      flightType.includes(searchLower) ||
      status.includes(searchLower) ||
      userName.includes(searchLower) ||
      firstName.includes(searchLower) ||
      lastName.includes(searchLower) ||
      participant?.arrivalAirportCode?.includes(searchLower)
    );
  });
};

export const filterFlightsByDate = (flights, selectedDate, moment) => {
  if (!selectedDate) return flights;

  const selectedMoment = moment(selectedDate);
  const selectedDateStr = selectedMoment.isValid()
    ? selectedMoment.format("YYYY-MM-DD")
    : null;

  if (!selectedDateStr) return flights;

  return flights.filter((flight) => {
    const arrivalDate = flight.arrivalDate
      ? flight.arrivalDate.split("T")[0]
      : null;
    const returnDate = flight.returnDate
      ? flight.returnDate.split("T")[0]
      : null;

    return (
      (arrivalDate && arrivalDate >= selectedDateStr) ||
      (returnDate && returnDate >= selectedDateStr)
    );
  });
};

export const filterFlightsByType = (flights, selectedFlightType) => {
  if (!selectedFlightType || !flights || flights.length === 0) {
    return flights || [];
  }

  return flights.filter((flight) => {
    return flight.flightType === selectedFlightType;
  });
};
