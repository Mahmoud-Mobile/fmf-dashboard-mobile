import { StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.White,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(17, 24, 39, 0.06)",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
    padding: 16,
    overflow: "hidden",
    marginBottom: 16,
    marginRight: 4,
  },
  flexWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 4,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventTitle: {
    fontSize: 16,
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
  },
  statusText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#1447E6",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
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
