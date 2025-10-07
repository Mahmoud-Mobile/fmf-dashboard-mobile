import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WhiteColor,
  },
  scrollView: {
    flex: 1,
  },
  eventInfoContainer: {
    backgroundColor: Colors.Primary,
    margin: horizontalMargin,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  eventInfoTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
    marginBottom: 4,
  },
  eventInfoText: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.White,
    marginBottom: 2,
  },
  eventInfoSubtext: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.White,
    opacity: 0.9,
  },
});
export default styles;
