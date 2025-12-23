import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  handleIndicator: {
    backgroundColor: Colors.LightGray,
    width: 60,
    height: 4,
    marginTop: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    borderRadius: 16,
    backgroundColor: Colors.LightGray,
  },
  errorHeaderContainer: {
    alignItems: "center",
  },
  errorTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Error,
    marginTop: 8,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    flex: 1,
  },
  timerContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.Error,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  timerText: {
    fontSize: 64,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.White,
  },
  errorMessage: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  buttonsContainer: {
    gap: 10,
    paddingBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tryAgainButton: {
    backgroundColor: Colors.gray,
  },
  manualRegisterButton: {
    backgroundColor: Colors.Primary,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.White,
  },
});

export default styles;
