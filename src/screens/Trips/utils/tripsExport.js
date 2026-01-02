import { Alert } from "react-native";
import {
  exportToExcel,
  formatDateTime,
  formatStamp,
} from "../../../config/exportToExcel";

export const exportTripsToExcel = async (filteredTrips, setIsPrinting) => {
  if (filteredTrips.length === 0) {
    Alert.alert(
      "No Data",
      "There are no trips to export. Please adjust your filters or wait for data to load.",
      [{ text: "OK", style: "default" }]
    );
    return;
  }

  setIsPrinting(true);
  try {
    const excelRows = filteredTrips.map((item) => {
      const participant = item.participant || {};
      const trip = item.trip || {};
      const participantTrip = item.participantTrip || {};

      const userName =
        [participant?.firstName, participant?.lastName]
          .filter(Boolean)
          .join(" ") || "N/A";
      const userMobile = participant?.phone || "N/A";
      const userEmail = participant?.email || "N/A";

      return {
        "Trip ID": trip.id || "N/A",
        "Participant Name": userName,
        "Participant Mobile": userMobile,
        "Participant Email": userEmail,
        "Pickup Location": trip.pickupLocation || "N/A",
        "Drop-off Location": trip.dropoffLocation || "N/A",
        "Scheduled Pickup": formatDateTime(trip.scheduledPickup),
        "Trip Type": trip.tripType || "N/A",
        Status: trip.status || "N/A",
        "Picked Up": participantTrip.isPickedUp ? "Yes" : "No",
        "No Show": participantTrip.isNoShow ? "Yes" : "No",
      };
    });

    const timestamp = formatStamp(new Date());
    const fileName = `trips_export_${timestamp}.xlsx`;

    await exportToExcel({
      rows: excelRows,
      fileName,
      sheetName: "Trips",
    });

    Alert.alert(
      "Export Successful",
      `Successfully exported ${excelRows.length} trip(s) to Excel.`,
      [{ text: "OK", style: "default" }]
    );
  } catch (error) {
    console.error("Error exporting trips to Excel:", error);
    Alert.alert(
      "Export Failed",
      `Failed to export trips: ${error.message || "Unknown error"}`,
      [{ text: "OK", style: "default" }]
    );
  } finally {
    setIsPrinting(false);
  }
};
