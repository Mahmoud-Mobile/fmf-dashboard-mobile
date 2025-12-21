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
  scrollContent: {
    paddingBottom: 24,
  },
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: horizontalMargin,
    paddingTop: 32,
    paddingBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${Colors.Primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 8,
    textAlign: "center",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "center",
    lineHeight: 22,
  },
  descriptionContainer: {
    paddingHorizontal: horizontalMargin,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    lineHeight: 24,
  },
  featuresSection: {
    paddingHorizontal: horizontalMargin,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.Primary}10`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    lineHeight: 20,
  },
  infoSection: {
    paddingHorizontal: horizontalMargin,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    lineHeight: 24,
  },
});

export default styles;
