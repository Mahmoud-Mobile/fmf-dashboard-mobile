import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 12,
    paddingHorizontal: horizontalMargin,
    paddingTop: 24,
  },
  lastUpdated: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    marginBottom: 20,
    paddingHorizontal: horizontalMargin,
    fontStyle: "italic",
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: horizontalMargin,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: horizontalMargin,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    lineHeight: 24,
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    marginTop: 16,
    marginBottom: 8,
  },
  bulletContainer: {
    marginLeft: 8,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 4,
  },
  contactInfo: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    lineHeight: 24,
    marginBottom: 8,
  },
});

export default styles;

