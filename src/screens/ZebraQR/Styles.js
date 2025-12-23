import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  scannerInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: {
    fontSize: 24,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Secondary,
    marginTop: 16,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.gray,
    textAlign: "center",
    lineHeight: 24,
  },
  processingContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.Primary,
    borderRadius: 8,
  },
  processingText: {
    color: Colors.White,
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  manualInputContainer: {
    width: "100%",
    marginTop: 32,
    paddingHorizontal: 20,
  },
  manualInput: {
    width: "100%",
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Secondary,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    textAlign: "left",
    marginBottom: 16,
  },
  submitButton: {
    width: "100%",
    marginTop: 8,
  },
});
