import { Alert } from "react-native";
import {
  exportToExcel,
  formatDateTime,
  formatStamp,
} from "../../../config/exportToExcel";

export const exportHotelsToExcel = async (filteredHotels, setIsPrinting) => {
  if (filteredHotels.length === 0) {
    Alert.alert(
      "No Data",
      "There are no hotels to export. Please adjust your filters or wait for data to load.",
      [{ text: "OK", style: "default" }]
    );
    return;
  }

  setIsPrinting(true);
  try {
    const excelRows = filteredHotels.map((hotel) => {
      return {
        "Hotel ID": hotel.accommodation?.hotel?.id || " ",
        "Hotel Name": hotel.accommodation?.hotel?.name || " ",
        "Room Number": hotel.accommodation?.room?.roomNumber || " ",
        "Check In Date": formatDateTime(hotel.accommodation?.checkInDate),
        "Check Out Date": formatDateTime(hotel.accommodation?.checkOutDate),
        Status: hotel.accommodation?.status || " ",
        "Checked In": hotel.accommodation?.isCheckedIn ? "Yes" : "No",
        "Checked Out": hotel.accommodation?.isCheckedOut ? "Yes" : "No",
      };
    });

    const timestamp = formatStamp(new Date());
    const fileName = `hotels_export_${timestamp}.xlsx`;

    await exportToExcel({
      rows: excelRows,
      fileName,
      sheetName: "Hotels",
    });

    Alert.alert(
      "Export Successful",
      `Successfully exported ${excelRows.length} hotel(s) to Excel.`,
      [{ text: "OK", style: "default" }]
    );
  } catch (error) {
    Alert.alert(
      "Export Failed",
      `Failed to export hotels: ${error.message || "Unknown error"}`,
      [{ text: "OK", style: "default" }]
    );
  } finally {
    setIsPrinting(false);
  }
};
