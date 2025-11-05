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
});

export default styles;
