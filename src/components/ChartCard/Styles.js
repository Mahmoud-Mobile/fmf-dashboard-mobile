import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: 16,
    padding: 12,
    marginTop: 12,
  },
  title: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  chartContainer: {
    marginTop: 10,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  gridItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  countBadge: {
    marginTop: 10,
  },
});

export default styles;
