import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { horizontalMargin } from "../../config/metrics";
import { Fonts } from "../../Global/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  listContainer: {
    marginHorizontal: horizontalMargin,
    paddingBottom: 50,
  },
  columnWrapper: {
    marginBottom: 8,
  },
  noAccessContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalMargin * 2,
  },
  noAccessText: {
    fontSize: 16,
    color: Colors.DarkGray,
    textAlign: "center",
  },
  viewAccessResourcesButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    marginHorizontal: horizontalMargin,
    marginBottom: 10,
  },
  viewAccessResourcesText: {
    color: Colors.White,
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
  },
});
