import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    marginBottom: 12,
  },
  required: {
    color: Colors.PrimaryText,
  },
  ratingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  ratingButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.PrimaryText,
    backgroundColor: "transparent",
    minWidth: 80,
    alignItems: "center",
  },
  ratingButtonSelected: {
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  ratingButtonText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
  },
  ratingButtonTextSelected: {
    color: Colors.White,
  },
  textInputContainer: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.PrimaryText,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 100,
    color: Colors.PrimaryText,
  },
  textInput: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    textAlignVertical: "top",
    minHeight: 80,
  },
  submitContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
  submitButton: {},
});

export default styles;
