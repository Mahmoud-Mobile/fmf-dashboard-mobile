import { StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "rgba(222, 222, 222, 1)",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 16,
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginBottom: 10,
    marginRight: 10,
  },
  flexWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  leftColumn: {
    minWidth: "48%",
    gap: 8,
  },
  rightColumn: {
    minWidth: "48%",
    gap: 8,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "80%",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginLeft: 8,
  },

  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "rgba(41, 101, 184, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    backgroundColor: "#BEDBFF",
    position: "absolute",
    top: 0,
    right: 0,
  },
  statusText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#1447E6",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  detailText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },

  metaLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
  },
  metaLabelBold: {
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  metaValue: {
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  activeText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#008236",
  },
});

export default styles;
