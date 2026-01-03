import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { horizontalMargin } from "../../config/metrics";

export const styles = StyleSheet.create({
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
  noAccessContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalMargin * 2,
  },
  noAccessText: {
    fontSize: 16,
    color: Colors.DarkGray,
    textAlign: "center",
  },
});
