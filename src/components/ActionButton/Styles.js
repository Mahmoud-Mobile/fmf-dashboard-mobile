import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 30,
  },
  buttonActive: {
    backgroundColor: Colors.Primary,
  },
  buttonInactive: {
    backgroundColor: "#EEF0F4",
    borderWidth: 1,
    borderColor: "#EEF0F4",
  },
  buttonSingle: {
    width: "100%",
  },

  text: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    marginLeft: 4,
  },
  textActive: {
    color: Colors.White,
  },
  textInactive: {
    color: Colors.Black,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
