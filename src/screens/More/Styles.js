import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { horizontalMargin } from "../../config/metrics";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  backgroundImage: {
    width: "100%",
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
    color: Colors.White,
    fontSize: 18,
    textAlign: "left",
    fontFamily: Fonts.FONT_BOLD,
  },
  mobileText: {
    color: Colors.White,
    fontSize: 13,
    textAlign: "left",
    fontFamily: Fonts.FONT_MEDIUM,
    opacity: 0.7,
    paddingTop: 10,
  },
  positionText: {
    color: Colors.White,
    fontSize: 14,
    textAlign: "left",
    fontFamily: Fonts.FONT_MEDIUM,
    opacity: 0.9,
    paddingTop: 5,
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
