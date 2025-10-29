import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  button: {},
  buttonSingle: {
    width: "100%",
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    height: 40,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    fontSize: 10,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#FFFFFF",
  },
  buttonGroup: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});

export default styles;
