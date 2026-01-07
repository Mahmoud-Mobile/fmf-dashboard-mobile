import { StyleSheet } from "react-native";
import { Colors } from "../../../../Global/colors";
import { Fonts } from "../../../../Global/fonts";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "rgba(222, 222, 222, 1)",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 16,
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginBottom: 10,
    marginRight: 10,
  },
  flexWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventTitle: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginLeft: 4,
    width: "90%",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "90%",
  },
  detailText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  previewButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#EEF0F4",
    alignItems: "center",
    marginRight: 8,
  },
  previewButtonText: {
    color: Colors.PrimaryText,
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
  },
  checkInButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    marginRight: 8,
  },
  checkInButtonText: {
    color: Colors.White,
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
  },
  checkOutButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#FF6B6B",
    alignItems: "center",
  },
  checkOutButtonText: {
    color: Colors.White,
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
  },
});

export default styles;
