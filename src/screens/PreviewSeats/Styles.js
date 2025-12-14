import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  horizontalScrollContent: {
    minWidth: "100%",
  },
  verticalScrollContent: {
    minHeight: "100%",
  },
  canvas: {
    position: "relative",
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: Colors.gray,
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 14,
  },
  errorText: {
    color: Colors.Error,
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
