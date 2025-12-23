import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    backgroundColor: Colors.Black,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: Colors.White,
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    marginTop: 16,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  processingText: {
    color: Colors.White,
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    marginTop: 16,
  },
  scanArea: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  scanFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: Colors.Primary,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  scanText: {
    color: Colors.White,
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    marginTop: 16,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
