import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

export const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: Colors.LightGray,
    width: 60,
    height: 4,
    marginTop: 8,
  },
  modalContentContainer: {
    // flex: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalHeaderContainer: {
    alignItems: "center",
    marginBottom: 14,
    marginTop: 8,
    position: "relative",
  },
  modalCloseButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    textAlign: "center",
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  labelText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    backgroundColor: Colors.White,
    minHeight: 48,
  },
  readOnlyInput: {
    backgroundColor: Colors.LightGray,
    color: Colors.SecondaryText,
  },
  textAreaInput: {
    minHeight: 100,
    paddingTop: 12,
  },
  summaryContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  summaryValueBold: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: "#2E7D32",
  },
  savedText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#2E7D32",
    marginTop: 4,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.LightGray,
    marginBottom: 120,
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  modalCancelButton: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  modalRecordButton: {
    backgroundColor: Colors.Primary,
  },
  modalCancelButtonText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.SecondaryText,
  },
  modalRecordButtonText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
});
