import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 36,
    backgroundColor: "#08AB04",
    shadowColor: "#08AB04",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_SEMI,
    color: Colors.White,
    fontWeight: "600",
  },
});
export default styles;
