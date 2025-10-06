import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  container: {},
  titleText: {
    color: Colors.Secondary,
    fontSize: 24,
    paddingTop: 40,
    textAlign: "left",
    fontFamily: Fonts.FONT_BOLD,
  },
  descText: {
    marginTop: 10,
    color: Colors.dimGray,
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 14,
    textAlign: "left",
  },
  cell: {
    width: 70,
    height: 53,
    lineHeight: "50%",
    fontSize: 20,
    fontFamily: Fonts.FONT_MEDIUM,
    borderWidth: 1,
    borderColor: Colors.Primary,
    textAlign: "center",
    marginHorizontal: 8,
    borderRadius: 12,
  },
  focusCell: {},
  circleStyleBase: {
    marginTop: 40,
  },
});
export default styles;
