import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    width: 100,
    height: 100,
    backgroundColor: "#F8F9FA",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 60,
    height: 60,
  },
  welcomeText: {
    color: "#1A1A1A",
    fontSize: 32,
    fontFamily: Fonts.FONT_BOLD,
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.5,
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
  // Legacy styles for backward compatibility
  loginBorder: {
    backgroundColor: Colors.WhiteColor,
    marginTop: 300,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  descText: {
    color: "#6B6B6B",
    fontSize: 19,
    paddingTop: 10,
    marginBottom: 30,
    textAlign: "left",
    fontFamily: Fonts.FONT_REGULAR,
  },
  forgetText: {
    paddingTop: 20,
    color: "#636363",
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 12,
  },
  registerView: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: "15%",
  },
  registerBtn: {
    paddingHorizontal: 5,
  },
  registerText: {
    color: Colors.Secondary,
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    paddingTop: 28,
  },
  signUpText: {
    color: Colors.Secondary,
    fontSize: 14,
    paddingTop: 28,
    fontFamily: Fonts.FONT_BOLD,
  },
});
export default styles;
