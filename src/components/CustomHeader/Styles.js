import { Platform, StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  safeAreaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalMargin,
    paddingTop: 5,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: Colors.Primary,
    paddingBottom: Platform.OS === "ios" ? 15 : 10,
  },
  leftAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  centerOverlay: {},
  titleText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: Fonts.FONT_MEDIUM,
  },
  subtitleText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: Fonts.FONT_LIGHT,
    marginTop: 4,
  },
  button: {
    width: 40,
    paddingVertical: 10,
    height: 40,
  },
});
export default styles;
