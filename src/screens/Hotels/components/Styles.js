import { StyleSheet } from "react-native";
import { Fonts } from "../../../Global/fonts";
import { Colors } from "../../../Global/colors";
import { commonCardStyle } from "../../../config/metrics";

const styles = StyleSheet.create({
  container: {
    ...commonCardStyle,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 10,
    overflow: "hidden",
    padding: 16,
    marginRight: 8,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 16,
    marginTop: 10,
  },
  leftColumn: {
    flex: 1,
    gap: 12,
  },
  rightColumn: {
    flex: 1,
    gap: 10,
    alignItems: "flex-end",
  },
  passengerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  passengerDetails: {
    flex: 1,
    gap: 2,
  },
  userPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
  },
  userInitial: {
    fontSize: 18,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
  userName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    fontWeight: "600",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  userMobile: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    marginTop: 4,
  },
  locationLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  locationText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: "100%",
  },
  detailText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    flex: 1,
    flexWrap: "wrap",
  },
  statusButtonsContainer: {
    flexDirection: "column",
    gap: 8,
    width: "100%",
    marginTop: 8,
    alignItems: "flex-end",
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 140,
    gap: 6,
  },
  statusButtonCompleted: {
    backgroundColor: "#2965B8",
  },
  statusButtonIncomplete: {
    backgroundColor: "#E5E7EB",
  },
  statusButtonText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
  },
  statusButtonTextCompleted: {
    color: Colors.White,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 22,
    position: "absolute",
    top: 0,
    right: 0,
    borderBottomLeftRadius: 8,
    gap: 4,
    color: Colors.Primary,
    backgroundColor: "#E3F2FD",
  },
  statusText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    textTransform: "uppercase",
    color: Colors.Primary,
  },
});

export default styles;
