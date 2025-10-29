import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },

  row: {
    justifyContent: "space-between",
    paddingHorizontal: 0,
  },
  listFooter: {
    padding: 20,
    alignItems: "center",
    marginBottom: 100,
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.Background,
    marginTop: 10,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.Background,
    marginTop: 10,
  },
  searchBarInRow: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  printButton: {
    backgroundColor: Colors.Primary,
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 44,
    minHeight: 44,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  printButtonText: {
    fontSize: 18,
    color: Colors.White,
  },
  printButtonDisabled: {
    backgroundColor: Colors.LightGray,
    opacity: 0.6,
  },
  dateButtonInRow: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

export default styles;
