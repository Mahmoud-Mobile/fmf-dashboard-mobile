import { StyleSheet } from "react-native";
import { horizontalMargin } from "../../config/metrics";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: horizontalMargin,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedCategory: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderWidth: 1,
    borderColor: Colors.Primary,
  },
  unselectedCategory: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: Colors.Black,
    textAlign: "center",
    fontFamily: Fonts.FONT_REGULAR,
  },
  selectedText: {
    fontSize: 14,
    color: Colors.White,
    textAlign: "center",
    fontFamily: Fonts.FONT_REGULAR,
  },
});

export default styles;
