import { StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.White,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(17, 24, 39, 0.06)",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
    padding: 18,
    overflow: "hidden",
  },
  listCard: {
    width: "100%",
  },
  gridCard: {
    width: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(41, 101, 184, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    gap: 6,
  },
  eventTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
  },
  eventDescription: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  statusBadge: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: "flex-start",
    backgroundColor: "#BEDBFF",
  },
  statusText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_Semi,
    textTransform: "capitalize",
    color: "#1447E6",
  },
  detailSection: {
    marginTop: 18,
    gap: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(17, 24, 39, 0.08)",
    marginVertical: 20,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 18,
  },
  footerMeta: {
    flex: 1,
    gap: 10,
  },
  attendeeText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.PrimaryText,
  },
  footerMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  metaLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
  },
  metaLabelBold: {
    fontFamily: Fonts.FONT_Semi,
    color: Colors.SecondaryText,
  },
  metaValue: {
    fontFamily: Fonts.FONT_Semi,
    color: Colors.PrimaryText,
  },
  activeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0FDF4",
  },
  activeText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_Semi,
    color: "#008236",
  },
});

export default styles;
