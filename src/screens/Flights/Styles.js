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
});

export default styles;
