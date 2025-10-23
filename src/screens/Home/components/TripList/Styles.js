import { StyleSheet } from "react-native";
import { Colors } from "../../../../Global/colors";
import { Fonts } from "../../../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    marginHorizontal: 5,
    marginVertical: 5,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.TextPrimary || Colors.DarkGray,
  },
  countBadge: {
    backgroundColor: Colors.Primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: "center",
  },
  countText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.White,
  },
  tableContainer: {
    backgroundColor: Colors.White,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: Colors.Background,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  headerCarContainer: {
    flex: 0.6,
    paddingLeft: 10,
  },
  headerDriverContainer: {
    flex: 0.4,
    paddingLeft: 10,
  },
  headerText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_SEMIBOLD,
    color: Colors.DarkGray,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  listContainer: {
    paddingBottom: 10,
  },
  tripRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    alignItems: "center",
  },
  carNameContainer: {
    flex: 0.6,
    paddingLeft: 10,
  },
  carName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
    lineHeight: 20,
  },
  driverContainer: {
    flex: 0.4,
    paddingLeft: 10,
  },
  driver: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
    lineHeight: 20,
  },
});

export default styles;
