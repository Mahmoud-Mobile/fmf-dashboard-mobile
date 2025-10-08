import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    backgroundColor: "#08AB04",
    shadowColor: "#08AB04",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_SEMI,
    color: Colors.White,
    fontWeight: "600",
  },
});
export default styles;
