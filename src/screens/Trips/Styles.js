import { StyleSheet } from "react-native";
import { horizontalMargin } from "../../config/metrics";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginHorizontal: horizontalMargin,
    paddingTop: 8,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1000,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  floatingButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 28,
    minWidth: 160,
  },
  floatingButtonText: {
    color: Colors.White,
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    marginLeft: 8,
  },
});
export default styles;
