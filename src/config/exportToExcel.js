import * as FileSystem from "expo-file-system/legacy";
import { shareAsync } from "expo-sharing";
import XLSX from "xlsx";

export async function exportToExcel({ rows, fileName, sheetName = "Sheet1" }) {
  if (!Array.isArray(rows)) {
    throw new Error("exportToExcel: 'rows' must be an array");
  }
  if (!fileName || typeof fileName !== "string") {
    throw new Error("exportToExcel: 'fileName' must be a non-empty string");
  }

  // Build workbook from rows
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Write to base64 and persist to file
  const excelBase64 = XLSX.write(workbook, {
    type: "base64",
    bookType: "xlsx",
  });

  const fileUri = `${FileSystem.documentDirectory}${fileName}`;

  await FileSystem.writeAsStringAsync(fileUri, excelBase64, {
    encoding: "base64",
  });

  // Share the file
  await shareAsync(fileUri, {
    UTI: "org.openxmlformats.spreadsheetml.sheet",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return { fileUri, rowCount: rows.length };
}

const pad2 = (num) => String(num).padStart(2, "0");

export const formatDateTime = (value) => {
  if (!value) return "N/A";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "N/A";
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());
  return `${y}-${m}-${day} ${hh}:${mm}`;
};

export const formatStamp = (d) => {
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());
  const ss = pad2(d.getSeconds());
  return `${y}-${m}-${day}_${hh}-${mm}-${ss}`;
};
