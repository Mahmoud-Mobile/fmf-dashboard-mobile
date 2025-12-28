import { StyleSheet } from "react-native";
import { Colors } from "../../../../../Global/colors";
import { Fonts } from "../../../../../Global/fonts";
import {
  horizontalMargin,
  commonCardStyle,
} from "../../../../../config/metrics";

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
  recentCheckInsContainer: {
    ...commonCardStyle,
    backgroundColor: Colors.White,
    borderRadius: 12,
    marginHorizontal: horizontalMargin,
    overflow: "hidden",
  },
  checkInItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalMargin,
    paddingVertical: 16,
  },
  checkInItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  checkInLeft: {
    flex: 1,
  },
  checkInName: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  checkInLocation: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  checkInRight: {
    alignItems: "flex-end",
  },
  checkInTime: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  checkInCompanions: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Primary,
  },
});
