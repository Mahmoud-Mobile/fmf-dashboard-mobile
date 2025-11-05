import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  listContainer: {
    marginHorizontal: horizontalMargin,
    paddingBottom: 50,
  },
  columnWrapper: {
    marginBottom: 8,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: horizontalMargin,
    backgroundColor: Colors.Background,
    marginTop: 10,
    marginBottom: 15,
    gap: 8,
  },
  searchBarInRow: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  printButton: {
    backgroundColor: "#2F87C8",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40,
    minHeight: 40,
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
    fontSize: 16,
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
