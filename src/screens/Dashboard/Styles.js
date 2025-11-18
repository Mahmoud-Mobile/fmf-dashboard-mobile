import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 140,
  },
  content: {
    marginHorizontal: horizontalMargin,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginTop: 30,
  },
  chartCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  responsiveGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
  },
  timeText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Primary,
    marginTop: 2,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_Semi,
  },
  countBadgeText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
  },
  statusOnTime: {
    color: Colors.Success,
  },
  statusDelayed: {
    color: Colors.Warning,
  },
  statusCancelled: {
    color: Colors.Error,
  },
  statusDefault: {
    color: Colors.DarkGray,
  },
  occupancyText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
  },
  tripDateText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
  },
  tripTimeText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Primary,
    marginTop: 2,
  },
  tripStatusText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_Semi,
    marginTop: 4,
  },
  tripStatusConfirmed: {
    color: Colors.Success,
  },
  tripStatusPending: {
    color: Colors.Warning,
  },
  visibleBtn: {
    backgroundColor: Colors.Primary,
    paddingVertical: 10,
    borderRadius: 8,
    width: 200,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  visibleContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  visibleText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
  // bottom sheet
  bottomSheetContent: {
    gap: 10,
  },
  bottomSheetTitle: {
    color: Colors.PrimaryText,
    fontFamily: Fonts.FONT_BOLD,
    marginBottom: 8,
  },
  visibilityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionRow: {
    paddingVertical: 5,
  },
  tabRow: {
    paddingVertical: 5,
  },
  visibilityLabel: {
    color: Colors.PrimaryText,
    fontFamily: Fonts.FONT_REGULAR,
  },
});

export default styles;
