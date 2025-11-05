import { StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    marginRight: 10,
  },
  eventCardContent: {
    padding: 10,
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  iconContainer: {
    backgroundColor: "rgba(136, 12, 185, 0.08)",
    borderRadius: 8,
    padding: 6,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 28,
    minHeight: 28,
  },
  eventInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
    gap: 6,
  },
  eventTitle: {
    fontSize: 13,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
    lineHeight: 16,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 50,
    alignItems: "center",
  },
  statusText: {
    fontSize: 8,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.White,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  eventDescription: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
    lineHeight: 14,
  },
  eventDetails: {
    marginBottom: 8,
    gap: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
  },
  detailText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
    marginLeft: 6,
    flex: 1,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
    gap: 8,
  },
  footerLeft: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeLabel: {
    fontSize: 9,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
    marginRight: 2,
  },
  typeValue: {
    fontSize: 9,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.Primary,
    textTransform: "uppercase",
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelLabel: {
    fontSize: 9,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
    marginRight: 3,
  },
  levelValue: {
    fontSize: 9,
    fontFamily: Fonts.FONT_Semi,
    textTransform: "uppercase",
    color: Colors.Primary,
  },
  footerRight: {
    alignItems: "flex-end",
  },
  activeIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignItems: "center",
  },
  activeText: {
    fontSize: 8,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
    textTransform: "uppercase",
  },
  eventCardListView: {
    marginRight: 0,
  },
});

export default styles;
