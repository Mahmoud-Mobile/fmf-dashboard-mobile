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
  scrollViewContent: {
    paddingBottom: 20,
  },
  content: {
    marginHorizontal: horizontalMargin,
    marginTop: 20,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 16,
  },
  visibilityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.White,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionRow: {
    // Additional styles if needed
  },
  tabRow: {
    // Additional styles if needed
  },
  visibilityLabel: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  categoryGroup: {
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
    marginBottom: 8,
    marginTop: 8,
  },
  actionButtonRow: {
    marginLeft: 12,
  },
  resetContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: Colors.Error,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
});

export default styles;

