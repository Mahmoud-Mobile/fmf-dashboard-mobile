import { StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

export const styles = StyleSheet.create({
  productCard: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: Colors.White,
  },
  vendorHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  vendorHeaderSmall: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  vendorLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 150,
    flexShrink: 1,
  },
  vendorLeftSmall: {
    flex: 1,
    minWidth: "100%",
    marginBottom: 8,
  },
  vendorCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flexShrink: 0,
  },
  vendorCenterSmall: {
    width: "100%",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  vendorStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 8,
    width: "100%",
  },
  vendorRight: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    flexShrink: 0,
  },
  vendorRightSmall: {
    width: "100%",
    justifyContent: "flex-start",
    marginTop: 0,
    flexWrap: "wrap",
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
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  vendorNameSmall: {
    fontSize: 14,
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
    flexShrink: 1,
  },
  boothTextSmall: {
    fontSize: 10,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    marginLeft: 4,
  },
  statTextSmall: {
    fontSize: 10,
  },
  visitButton: {
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.LightGray,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  visitButtonSmall: {
    paddingVertical: 6,
  },
  visitButtonText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  visitButtonTextSmall: {
    fontSize: 10,
  },
  purchaseButton: {
    width: 100,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
  },
  purchaseButtonSmall: {
    paddingVertical: 6,
  },
  purchaseButtonText: {
    fontSize: 12,
    color: Colors.White,
    fontFamily: Fonts.FONT_REGULAR,
  },
  purchaseButtonTextSmall: {
    fontSize: 11,
  },
  productContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productContentSmall: {
    flexDirection: "column",
    gap: 8,
  },
  productLeft: {
    flex: 1,
    marginRight: 8,
    minWidth: 0,
  },
  productLeftSmall: {
    flex: 0,
    marginRight: 0,
    width: "100%",
  },
  productName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  productNameSmall: {
    fontSize: 12,
  },
  productDiscount: {
    fontSize: 10,
    color: Colors.SecondaryText,
    fontFamily: Fonts.FONT_REGULAR,
  },
  productDiscountSmall: {
    fontSize: 10,
  },
  productMiddle: {
    flex: 1,
    marginRight: 8,
    alignItems: "flex-start",
  },
  productMiddleSmall: {
    flex: 0,
    marginRight: 0,
    width: "100%",
  },
  originalPrice: {
    fontSize: 10,
    color: Colors.SecondaryText,
    marginBottom: 4,
  },
  originalPriceSmall: {
    fontSize: 10,
  },
  strikethrough: {
    textDecorationLine: "line-through",
  },
  finalPrice: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  finalPriceSmall: {
    fontSize: 10,
  },
  productRight: {
    // flex: 1,
    // alignItems: "flex-end",
  },
  productRightSmall: {
    width: "100%",
    alignItems: "flex-start",
  },
  recordedPurchase: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "right",
    marginTop: 4,
  },
  recordedPurchaseSmall: {
    fontSize: 10,
    textAlign: "left",
    marginTop: 0,
  },
});
