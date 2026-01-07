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
  importButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: horizontalMargin,
    marginBottom: 8,
    backgroundColor: Colors.White,
    borderRadius: 12,
    width: "40%",
    alignSelf: "flex-end",
  },
  importButtonText: {
    marginLeft: 8,
    fontSize: 12,
    color: Colors.DarkGray,
    fontFamily: Fonts.FONT_REGULAR,
  },
});
