import { StyleSheet } from "react-native";
import { Colors } from "../../../../Global/colors";
import { Fonts } from "../../../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.FONT_SEMIBOLD,
    color: Colors.TextPrimary,
    flex: 1,
  },
  countBadge: {
    backgroundColor: Colors.Primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 40,
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
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 3,
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
    flex: 1,
  },
  legendValue: {
    fontSize: 12,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.DarkGray,
  },
});

export default styles;
