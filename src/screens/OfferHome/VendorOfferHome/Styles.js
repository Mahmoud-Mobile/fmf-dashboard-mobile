import { StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { horizontalMargin } from "../../../config/metrics";
import { commonCardStyle } from "../../../config/metrics";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productsList: {
    paddingHorizontal: horizontalMargin,
  },
  vendorCard: {
    ...commonCardStyle,
    padding: 12,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.LightGray,
    marginVertical: 16,
  },
});
