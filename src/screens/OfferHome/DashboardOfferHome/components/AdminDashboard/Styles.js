import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../../../Global/colors";
import { Fonts } from "../../../../../Global/fonts";
import { horizontalMargin, commonCardStyle } from "../../../../../config/metrics";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  performanceSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 15,
    paddingHorizontal: horizontalMargin,
  },
  scrollView: {
    paddingLeft: horizontalMargin,
  },
  cardsContainer: {
    flexDirection: "row",
    paddingRight: horizontalMargin,
    gap: 12,
  },
  card: {
    ...commonCardStyle,
    width: 250,
    backgroundColor: Colors.White,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    flex: 1,
  },
  iconContainer: {
    backgroundColor: "#EFF6FF",
    borderRadius: 6,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cardValue: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 12,
  },
  cardBreakdown: {
    gap: 6,
  },
  breakdownItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  breakdownLabel: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  breakdownValue: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  filtersContainer: {
    paddingHorizontal: horizontalMargin,
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.LightGray,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: Colors.Primary,
  },
  filterButtonText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.DarkGray,
  },
  filterButtonTextActive: {
    color: Colors.White,
  },
  tableContent: {
    minWidth: SCREEN_WIDTH,
  },
  tableContentContainer: {
    backgroundColor: "white",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F3F5",
    paddingVertical: 12,
    paddingHorizontal: horizontalMargin,
  },
  headerColumn: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  headerText: {
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    textAlign: "left",
  },
  headerImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: horizontalMargin,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  dataColumn: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  dataText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "left",
    maxWidth: 100,
  },
  vendorNameColumn: {
    width: 150,
    flexDirection: "row",
    alignItems: "center",
  },
  vendorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.LightGray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    overflow: "hidden",
  },
  vendorAvatarText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.SecondaryText,
  },
  visitsColumn: {
    width: 90,
  },
  purchasesColumn: {
    width: 90,
  },
  salesColumn: {
    width: 100,
  },
  conversionColumn: {
    width: 100,
  },
  statusColumn: {
    width: 100,
  },
  statusBadge: {
    paddingVertical: 4,
    borderRadius: 8,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
});
