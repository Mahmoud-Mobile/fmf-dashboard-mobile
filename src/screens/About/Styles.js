import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: horizontalMargin,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 20,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    lineHeight: 24,
  },
});

export default styles;

