import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Secondary,
  },
  closeButton: {
    padding: 8,
  },
  eventInfo: {
    padding: 16,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eventTitleSection: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Secondary,
    marginBottom: 4,
  },
  eventSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.gray,
  },
  eventDetailsSection: {
    alignItems: "flex-end",
  },
  eventDate: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Secondary,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Secondary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  legend: {
    marginBottom: 24,
    alignItems: "center",
  },
  legendGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  legendText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.gray,
  },
  legendGridCounts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 12,
    paddingHorizontal: 20,
  },
  occupiedX: {
    color: Colors.gray,
    fontSize: 12,
    fontFamily: Fonts.FONT_BOLD,
  },
  seatingPlan: {
    marginBottom: 24,
  },
  seatingTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Secondary,
    marginBottom: 16,
    textAlign: "center",
  },
  mainSeatingArea: {
    backgroundColor: Colors.borderColor,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  frontRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    gap: 8,
  },
  seatingRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
    gap: 4,
  },
  seat: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  occupiedSeat: {
    backgroundColor: Colors.gray,
  },
  tableArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  tableGroup: {
    alignItems: "center",
  },
  table: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  tableText: {
    color: Colors.White,
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
  },
  tableChairs: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: 80,
    gap: 4,
  },
  tableChair: {
    margin: 2,
  },
});
