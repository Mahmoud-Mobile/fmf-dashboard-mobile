/**
 * Utility functions for exporting flight data to Excel
 */
import { formatDateTime } from "../../../config/exportToExcel";

/**
 * Prepares flight data for Excel export
 */
export const prepareFlightExportData = (flight, selectedCategory = "all") => {
  const participant = flight.participant || {};
  const firstName = participant.firstName || "";
  const lastName = participant.lastName || "";
  const passengerName = `${firstName} ${lastName}`.trim() || "-";

  let airlineName = "-";
  let flightNumber = "-";
  let status = "-";
  let airportCode = "-";
  let airportName = "-";
  let date = "-";

  // Use flightType to determine which data to export
  if (flight.flightType === "ARRIVAL") {
    airlineName = flight.arrivalAirlinesName || "-";
    flightNumber = flight.arrivalFlightNumber || "-";
    status = flight.arrivalFlightStatus || "-";
    airportCode = flight.arrivalAirportCode || "-";
    airportName = flight.arrivalAirport || "-";
    date = formatDateTime(flight.arrivalDate);
  } else if (flight.flightType === "DEPARTURE") {
    airlineName = flight.returnAirlinesName || flight.returnAirlineName || "-";
    flightNumber = flight.returnFlightNumber || "-";
    status = flight.returnFlightStatus || "-";
    airportCode = flight.returnAirportCode || "-";
    airportName = flight.returnAirport || "-";
    date = formatDateTime(flight.returnDate);
  } else {
    // Fallback: use selectedCategory for backward compatibility
    if (selectedCategory === "arrival") {
      airlineName = flight.arrivalAirlinesName || "-";
      flightNumber = flight.arrivalFlightNumber || "-";
      status = flight.arrivalFlightStatus || "-";
      airportCode = flight.arrivalAirportCode || "-";
      airportName = flight.arrivalAirport || "-";
      date = formatDateTime(flight.arrivalDate);
    } else if (selectedCategory === "return") {
      airlineName = flight.returnAirlinesName || flight.returnAirlineName || "-";
      flightNumber = flight.returnFlightNumber || "-";
      status = flight.returnFlightStatus || "-";
      airportCode = flight.returnAirportCode || "-";
      airportName = flight.returnAirport || "-";
      date = formatDateTime(flight.returnDate);
    } else {
      airlineName = flight.arrivalAirlinesName || "-";
      flightNumber = flight.arrivalFlightNumber || "-";
      status = flight.arrivalFlightStatus || "-";
      airportCode = flight.arrivalAirportCode || "-";
      airportName = flight.arrivalAirport || "-";
      date = formatDateTime(flight.arrivalDate);
    }
  }

  return {
    "Passenger Name": passengerName,
    "Airline Name": airlineName,
    "Flight Number": flightNumber,
    Status: status,
    "Airport Code": airportCode,
    "Airport Name": airportName,
    Date: date,
  };
};

