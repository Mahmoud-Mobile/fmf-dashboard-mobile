import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  toggleButton: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 12,
    padding: 10,
    minWidth: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  toggleButtonActive: {
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
});

export default styles;

