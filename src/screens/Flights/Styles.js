import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
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
  listFooter: {
    padding: 20,
    alignItems: "center",
    marginBottom: 100,
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
  },
});

export default styles;
