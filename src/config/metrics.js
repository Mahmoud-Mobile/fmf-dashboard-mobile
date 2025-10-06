import { Dimensions, Platform } from "react-native";
import { Colors } from "../Global/colors";
import { Fonts } from "../Global/fonts";

const { width, height } = Dimensions.get("window");

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === "ios" ? 54 : 66,
};
export const horizontalMargin = 23;

export const calcWidth = (target) => {
  return metrics.screenWidth * (target / 375);
};

export const calcHeight = (target) => {
  return metrics.screenHeight * (target / 667);
};

export const commonCardStyle = {
  borderRadius: 25,
  shadowColor: "rgba(141, 141, 141, 0.08)",
  borderColor: "#F9F9F9",
  backgroundColor: "#FFF",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 20,
  elevation: 5,
  borderWidth: 1,
};
export const titleText = {
  fontSize: 16,
  color: Colors.dimGray,
  fontFamily: Fonts.FONT_REGULAR,
};

export default metrics;
