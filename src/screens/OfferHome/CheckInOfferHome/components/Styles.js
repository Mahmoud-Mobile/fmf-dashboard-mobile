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
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vendorLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: "45%",
    marginBottom: 8,
  },
  vendorCenter: {
    alignItems: "flex-start",
    marginHorizontal: 8,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  vendorRight: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 4,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.LightGray,
    borderWidth: 0,
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
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
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
  },
  purchaseButtonText: {
    fontSize: 12,
    color: Colors.White,
    fontFamily: Fonts.FONT_REGULAR,
  },
  productContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productLeft: {
    flex: 1,
    minWidth: "45%",
    marginRight: 8,
    marginBottom: 8,
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
    minWidth: "45%",
    marginRight: 8,
    alignItems: "flex-start",
    marginBottom: 8,
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
    width: "100%",
    marginTop: 4,
  },
  recordedPurchase: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "right",
    marginTop: 4,
  },
});
