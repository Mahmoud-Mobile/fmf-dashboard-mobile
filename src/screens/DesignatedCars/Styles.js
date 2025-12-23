import { StyleSheet } from "react-native";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginHorizontal: horizontalMargin,
    paddingTop: 8,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
export default styles;
