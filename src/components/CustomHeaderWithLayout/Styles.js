import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 27,
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4",
    paddingBottom: 18,
  },
  title: {
    color: "#020201",
    fontSize: 15,
    fontFamily: Fonts.FONT_MEDIUM,
    paddingVertical: 10,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
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
  printButton: {
    // Same style as toggleButton but can be customized if needed
  },
  printButtonDisabled: {
    opacity: 0.5,
  },
  printButtonText: {
    fontSize: 18,
  },
});

export default styles;
