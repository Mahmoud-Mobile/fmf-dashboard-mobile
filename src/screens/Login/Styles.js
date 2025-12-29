import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { commonCardStyle } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 50,
  },
  logoContainer: {
    ...commonCardStyle,
    width: 100,
    height: 100,
    backgroundColor: "#F8F9FA",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
  },
  welcomeText: {
    color: "#1A1A1A",
    fontSize: 26,
    fontFamily: Fonts.FONT_BOLD,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitleText: {
    color: "#6B7280",
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    textAlign: "center",
    lineHeight: 24,
  },
  formSection: {
    width: "100%",
  },
  titleText: {
    color: "#1A1A1A",
    fontSize: 28,
    fontFamily: Fonts.FONT_BOLD,
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: -0.5,
  },
  inputContainer: {
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  footerText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 20,
  },
});
export default styles;
