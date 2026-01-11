import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    minHeight: 48,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  optionContainer: {
    flexDirection: "row",
    gap: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    backgroundColor: Colors.White,
    alignItems: "center",
    justifyContent: "center",
  },
  optionButtonSelected: {
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  optionButtonText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
  },
  optionButtonTextSelected: {
    color: Colors.White,
  },
  dateButton: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    justifyContent: "center",
  },
  dateButtonText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  submitContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  submitButton: {
    width: "100%",
  },
});

export default styles;
