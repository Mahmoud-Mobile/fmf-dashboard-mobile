import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    flex: 1,
  },
  buttonSingle: {
    width: "100%",
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    height: 50,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    fontSize: 12,
    fontFamily: Fonts.FONT_Semi,
    color: "#FFFFFF",
  },
  buttonGroup: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  buttonSingleContainer: {
    marginTop: 16,
    alignItems: "center",
  },
});

export default styles;
