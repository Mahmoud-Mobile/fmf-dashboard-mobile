import { StyleSheet } from "react-native";

import { Colors } from "../../Global/colors";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: horizontalMargin,
    backgroundColor: Colors.Background,
    marginTop: 10,
    marginBottom: 15,
    gap: 8,
  },
  searchBar: {
    flex: 1,
  },
  printButton: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 45,
  },
  printButtonDisabled: {
    backgroundColor: Colors.LightGray,
    opacity: 0.6,
  },
});

export default styles;
