import { StyleSheet } from "react-native";
import { Colors } from "../../../../../Global/colors";
import { Fonts } from "../../../../../Global/fonts";
import { horizontalMargin, commonCardStyle } from "../../../../../config/metrics";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 15,
    paddingHorizontal: horizontalMargin,
  },
  purchasesCard: {
    ...commonCardStyle,
    backgroundColor: Colors.White,
    marginHorizontal: horizontalMargin,
    borderRadius: 12,
    overflow: "hidden",
    padding: 12,
  },
  dateFiltersScroll: {
    flexDirection: "row",
    gap: 4,
    marginTop: 12,
    marginBottom: 12,
  },
  dateFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  dateFilterButtonActive: {
    backgroundColor: Colors.Primary,
  },
  dateFilterText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  dateFilterTextActive: {
    color: Colors.White,
    fontFamily: Fonts.FONT_MEDIUM,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.LightGray,
    marginVertical: 16,
  },
  purchasesList: {
    paddingTop: 8,
  },
});

export const customItemStyles = StyleSheet.create({
  productCard: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: Colors.White,
  },
  vendorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  vendorLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  vendorAvatar: {
    width: 34,
    height: 34,
    borderRadius: 16,
    backgroundColor: Colors.LightGray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarImage: {
    width: 34,
    height: 34,
    borderRadius: 16,
  },
  avatarText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  vendorInfo: {},
  vendorName: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  boothContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  boothText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    marginLeft: 4,
  },
  productContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productLeft: {
    flex: 1,
    marginRight: 8,
    minWidth: 0,
  },
  productName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  productDiscount: {
    fontSize: 10,
    color: Colors.SecondaryText,
    fontFamily: Fonts.FONT_REGULAR,
  },
  productMiddle: {
    flex: 1,
    marginRight: 8,
    alignItems: "flex-start",
  },
  originalPrice: {
    fontSize: 10,
    color: Colors.SecondaryText,
    marginBottom: 4,
  },
  strikethrough: {
    textDecorationLine: "line-through",
  },
  finalPrice: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  productRight: {},
  recordedPurchase: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "right",
    marginTop: 4,
  },
});
