import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  fabButton: {
    position: "absolute",
    right: horizontalMargin,
    bottom: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  panelContainer: {
    position: "absolute",
    right: horizontalMargin,
    bottom: 88,
    width: 220,
    borderRadius: 12,
    backgroundColor: Colors.White,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 9,
  },
  panelLabel: {
    fontFamily: Fonts.FONT_Semi,
    fontSize: 14,
    color: Colors.PrimaryText,
    marginBottom: 12,
  },
  panelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  panelRowLabel: {
    flex: 1,
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 13,
    color: Colors.PrimaryText,
    marginRight: 12,
  },
});

export default styles;

