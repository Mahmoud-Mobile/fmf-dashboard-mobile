import { Alert } from "react-native";
import {
  exportToExcel,
  formatDateTime,
  formatStamp,
} from "../../../config/exportToExcel";

export const exportDesignatedCarsToExcel = async (
  filteredDesignatedCars,
  setIsPrinting
) => {
  if (filteredDesignatedCars.length === 0) {
    Alert.alert(
      "No Data",
      "There are no designated cars to export. Please adjust your filters or wait for data to load.",
      [{ text: "OK", style: "default" }]
    );
    return;
  }

  setIsPrinting(true);
  try {
    const excelRows = filteredDesignatedCars.map((item) => {
      const participant = item.participant || {};
      const car = item.car || {};
      const participantCar = item.participantCar || {};

      const userName =
        [participant?.firstName, participant?.lastName]
          .filter(Boolean)
          .join(" ") || "N/A";
      const userMobile = participant?.phone || "N/A";
      const userEmail = participant?.email || "N/A";

      return {
        "Car ID": car.id || "N/A",
        "Participant Name": userName,
        "Participant Mobile": userMobile,
        "Participant Email": userEmail,
        "Pickup Location": car.pickupLocation || "N/A",
        "Drop-off Location": car.dropoffLocation || "N/A",
        "Scheduled Pickup": formatDateTime(car.scheduledPickup),
        "Car Type": car.carType || car.tripType || "N/A",
        Status: car.status || "N/A",
        "Picked Up": participantCar.isPickedUp ? "Yes" : "No",
        "No Show": participantCar.isNoShow ? "Yes" : "No",
      };
    });

    const timestamp = formatStamp(new Date());
    const fileName = `designated_cars_export_${timestamp}.xlsx`;

    await exportToExcel({
      rows: excelRows,
      fileName,
      sheetName: "Designated Cars",
    });

    Alert.alert(
      "Export Successful",
      `Successfully exported ${excelRows.length} designated car(s) to Excel.`,
      [{ text: "OK", style: "default" }]
    );
  } catch (error) {
    console.error("Error exporting designated cars to Excel:", error);
    Alert.alert(
      "Export Failed",
      `Failed to export designated cars: ${error.message || "Unknown error"}`,
      [{ text: "OK", style: "default" }]
    );
  } finally {
    setIsPrinting(false);
  }
};

