import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { horizontalMargin } from "../../config/metrics";
import { commonCardStyle } from "../../config/metrics";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: horizontalMargin,
    paddingTop: 20,
    paddingBottom: 40,
  },
  card: {
    ...commonCardStyle,
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.DarkGray,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.LightGray,
    marginBottom: 16,
  },
  areaItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  areaItemLast: {
    borderBottomWidth: 0,
  },
  areaContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationIcon: {
    marginRight: 8,
  },
  areaName: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
  },
  areaNameSelected: {
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Primary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: Colors.LightGray,
    backgroundColor: Colors.White,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
});
