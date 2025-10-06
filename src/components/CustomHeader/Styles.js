import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 27,
    borderBottomWidth: 1,
    paddingBottom: 18,
  },
  centerView: {
    paddingHorizontal: 27,
    borderBottomWidth: 1,
    paddingBottom: 18,
  },
  title: {
    color: "#020201",
    fontSize: 15,
    textAlign: "center",
    fontFamily: Fonts.FONT_MEDIUM,
    paddingVertical: 10,
  },

  button: {
    width: 40,
    paddingVertical: 10,
    height: 40,
  },
  leftButton: {
    width: 40,
    height: 40,
    backgroundColor: "#F1F1F1",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    transform: [{ scaleX: 1 }], // Fixed to LTR only
  },
});
export default styles;
