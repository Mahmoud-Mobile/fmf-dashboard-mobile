import { StyleSheet } from "react-native";
import { Colors } from "../../../../Global/colors";
import { Fonts } from "../../../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    width: "100%",
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.TextPrimary || Colors.DarkGray,
  },
  countBadge: {
    backgroundColor: Colors.Primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  countText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.White,
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  chartSection: {
    alignItems: "center",
  },
  legendSection: {
    flex: 1,
    paddingLeft: 10,
  },
  chartContainerMobile: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  legendSectionMobile: {
    marginTop: 15,
    width: "100%",
  },
  legendContainer: {},
  firstRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  secondRow: {
    flexDirection: "row",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 3,
    marginHorizontal: 2,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 3,
    width: "48%",
    marginBottom: 8,
  },
  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
  },
  legendValue: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
  },
});

export default styles;
