import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { horizontalMargin } from "../../config/metrics";
import { commonCardStyle } from "../../config/metrics";
import { Fonts } from "../../Global/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productsList: {
    paddingHorizontal: horizontalMargin,
  },
  vendorCard: {
    ...commonCardStyle,
    padding: 12,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.LightGray,
    marginVertical: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: horizontalMargin,
    marginBottom: 8,
    gap: 8,
  },
  importButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.White,
    borderRadius: 12,
    flex: 1,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.White,
    borderRadius: 12,
    flex: 1,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 12,
    color: Colors.DarkGray,
    fontFamily: Fonts.FONT_REGULAR,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
