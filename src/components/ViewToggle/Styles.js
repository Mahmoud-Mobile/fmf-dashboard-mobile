import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#EEF0F4",
    borderRadius: 8,
  },
  toggleButton: {
    borderRadius: 8,
    width: 50,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: Colors.White,
  },
});

export default styles;
