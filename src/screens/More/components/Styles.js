import { StyleSheet } from "react-native";
import { Fonts } from "../../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#EDEDED",
    marginHorizontal: 15,
  },
  flexView: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  borderIconView: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderColor: "#0202021A",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 14,
    marginHorizontal: 14,
  },
});
export default styles;
