import { StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: Colors.White,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  eventCardContent: {
    padding: 20,
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  eventInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
    lineHeight: 24,
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 60,
    alignItems: "center",
  },
  statusText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.White,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  eventDescription: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
    lineHeight: 20,
  },
  eventDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailText: {
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
    marginLeft: 8,
    flex: 1,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
  },
  footerLeft: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
    marginRight: 4,
  },
  typeValue: {
    fontSize: 12,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.Primary,
    textTransform: "uppercase",
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
    marginRight: 4,
  },
  levelValue: {
    fontSize: 12,
    fontFamily: Fonts.FONT_Semi,
    textTransform: "uppercase",
  },
  footerRight: {
    alignItems: "flex-end",
  },
  activeIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center",
  },
  activeText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.White,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

export default styles;
