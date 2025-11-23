import { StyleSheet } from "react-native";
import { Fonts } from "../../../Global/fonts";
import { Colors } from "../../../Global/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    gap: 10,
  },
  passengerDetails: {
    flex: 1,
    gap: 4,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 12,
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
});

export default styles;
