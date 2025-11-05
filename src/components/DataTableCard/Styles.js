import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  container: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F3F3F5",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F4",
  },

  headerColumn: {
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.Primary,
    textTransform: "uppercase",
  },
  headerTextBold: {
    fontFamily: Fonts.FONT_BOLD,
  },
  dataRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    alignItems: "center",
    minHeight: 40,
  },
  dataColumn: {
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 40,
  },

  dataText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  dataTextBold: {
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    fontSize: 13,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
});

export default styles;
