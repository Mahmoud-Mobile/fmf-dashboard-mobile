import { StyleSheet } from "react-native";
import { Fonts } from "../../../Global/fonts";

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 30,
  },
  labelText: {
    color: "#374151",
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 14,
    textAlign: "left",
    marginBottom: 8,
  },
  dropdown: {
    height: 56,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
  },
  dropdownError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#828282",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#1F2937",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
  },
});

export default styles;
