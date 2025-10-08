import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Secondary,
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
});
