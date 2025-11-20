import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";

const styles = StyleSheet.create({
  swipeContainer: {
    width: "100%",
  },
  disabledText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Primary,
    marginBottom: 8,
  },
  buttonGroup: {},
});

export default styles;
