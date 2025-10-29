import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  listContainer: {
    padding: horizontalMargin,
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: Colors.White,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  eventCardContent: {
    padding: 24,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
    flex: 1,
    marginRight: 16,
    lineHeight: 28,
  },
  eventStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.Gray,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  eventDescription: {
    fontSize: 15,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
    lineHeight: 22,
    marginBottom: 20,
  },
  eventDetails: {
    marginBottom: 20,
    gap: 12,
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  eventDetailText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
    marginLeft: 12,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  eventFooterLeft: {
    flex: 1,
  },
  guestCount: {
    fontSize: 15,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.Primary,
  },
  eventTypeText: {
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  arrowContainer: {
    backgroundColor: Colors.Primary,
    borderRadius: 12,
    padding: 12,
    transform: [{ rotate: "90deg" }],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.Gray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.LightGray,
    textAlign: "center",
    marginBottom: 24,
  },
  refreshButton: {
    backgroundColor: Colors.Primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  refreshButtonText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.Background,
    marginTop: 10,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.Background,
    marginTop: 10,
  },
  searchBarInRow: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  printButton: {
    backgroundColor: "#2F87C8",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 44,
    minHeight: 44,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  printButtonText: {
    fontSize: 18,
    color: Colors.White,
  },
  printButtonDisabled: {
    backgroundColor: Colors.LightGray,
    opacity: 0.6,
  },
  dateButtonInRow: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

export default styles;
