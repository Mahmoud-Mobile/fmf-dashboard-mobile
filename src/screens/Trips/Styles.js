import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginHorizontal: horizontalMargin,
  },
  emptyContainer: {
    flexGrow: 1,
  },
});
export default styles;
