import { StyleSheet } from "react-native";
import { Colors } from "../../../../Global/colors";
import { Fonts } from "../../../../Global/fonts";

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
  },
  vendorLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  vendorCenter: {
    alignItems: "flex-start",
    marginHorizontal: 16,
  },
  vendorRight: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
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
  boothContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  boothText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    marginLeft: 4,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    marginLeft: 4,
  },
  visitButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.LightGray,
    borderWidth: 0,
  },
  visitButtonText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  purchaseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.Primary,
  },
  purchaseButtonText: {
    fontSize: 12,
    color: Colors.White,
    fontFamily: Fonts.FONT_REGULAR,
  },
  productContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productLeft: {
    flex: 1,
    marginRight: 8,
  },
  productName: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  productDiscount: {
    fontSize: 12,
    color: Colors.SecondaryText,
    fontFamily: Fonts.FONT_REGULAR,
  },
  productMiddle: {
    flex: 1,
    marginRight: 8,
    alignItems: "flex-start",
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.SecondaryText,
    marginBottom: 4,
  },
  strikethrough: {
    textDecorationLine: "line-through",
  },
  finalPrice: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  productRight: {
    // flex: 1,
    // alignItems: "flex-end",
  },
  recordedPurchase: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "right",
    marginTop: 4,
  },
});
