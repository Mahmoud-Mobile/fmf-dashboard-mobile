import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { horizontalMargin } from "../../config/metrics";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WhiteColor,
  },
  backgroundImage: {
    width: "100%",
    backgroundColor: Colors.Primary,
    height: 200,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  headerView: {
    flexDirection: "row",
    marginHorizontal: horizontalMargin,
    marginTop: 60,
    alignItems: "center",
  },
  imageView: {
    width: 65,
    height: 65,
    borderRadius: 33,
  },
  nameText: {
    color: Colors.WhiteColor,
    fontSize: 18,
    textAlign: "left",
    fontFamily: Fonts.FONT_BOLD,
  },
  mobileText: {
    color: Colors.WhiteColor,
    fontSize: 13,
    textAlign: "left",
    fontFamily: Fonts.FONT_MEDIUM,
    opacity: 0.7,
    paddingTop: 10,
  },
  borderList: {
    marginHorizontal: horizontalMargin,
    backgroundColor: "#FAFAFA",
    borderRadius: 23,
    paddingTop: 10,
    bottom: 40,
    flex: 1,
  },
});
export default styles;
