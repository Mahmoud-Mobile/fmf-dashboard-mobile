import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  labelText: {
    color: "#374151",
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 14,
    textAlign: "left",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#1F2937",
    textAlign: "left",
  },
  errorInput: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  iconContainer: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});
export default styles;
