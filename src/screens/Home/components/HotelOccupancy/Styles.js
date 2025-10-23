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
  headerHotelContainer: {
    flex: 0.7,
    paddingLeft: 10,
  },
  headerCountContainer: {
    flex: 0.3,
    alignItems: "center",
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
  hotelRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    alignItems: "center",
  },
  hotelNameContainer: {
    flex: 0.7,
    paddingLeft: 10,
  },
  hotelName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
    lineHeight: 20,
  },
  countContainer: {
    flex: 0.3,
    alignItems: "center",
  },
  count: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
    backgroundColor: Colors.Background,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: "center",
  },
});

export default styles;
