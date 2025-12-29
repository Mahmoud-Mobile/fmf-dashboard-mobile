import { StyleSheet } from "react-native";
import { Fonts } from "../../../Global/fonts";
import { Colors } from "../../../Global/colors";
import { commonCardStyle } from "../../../config/metrics";

const styles = StyleSheet.create({
  container: {
    ...commonCardStyle,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 10,
    overflow: "hidden",
    padding: 16,
    marginRight: 8,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  userPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
  },
  userInitial: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
  userName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  userMobile: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
  },
  flightTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginTop: 10,
  },
  flightText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
    marginTop: 2,
    marginBottom: 5,
  },
  detailText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    flex: 1,
    width: "50%",
  },
  detailsColumn: {
    flexDirection: "column",
    gap: 16,
    alignItems: "flex-start",
    flex: 1,
    maxWidth: "60%",
    marginLeft: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    // height: 22,
    position: "absolute",
    top: 0,
    right: 0,
    borderBottomLeftRadius: 8,
    gap: 4,
    paddingVertical: 1,
  },
  statusText: {
    fontSize: 8,
    fontFamily: Fonts.FONT_MEDIUM,
    textTransform: "uppercase",
  },
});

export default styles;
