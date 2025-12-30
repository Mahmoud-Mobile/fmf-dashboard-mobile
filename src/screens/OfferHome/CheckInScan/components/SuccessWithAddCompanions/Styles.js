import { StyleSheet } from "react-native";
import { Colors } from "../../../../../Global/colors";
import { Fonts } from "../../../../../Global/fonts";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderRadius: 16,
    width: "90%",
    maxWidth: 400,
    padding: 24,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  contentContainer: {
    paddingTop: 8,
  },
  visitorInfoSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileImageContainer: {
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.LightGray,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.LightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  visitorName: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 12,
    textAlign: "center",
  },
  detailsContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  detailText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    marginBottom: 8,
    textAlign: "left",
  },
  separator: {
    height: 1,
    backgroundColor: Colors.LightGray,
    marginVertical: 20,
  },
  companionsSection: {
    marginBottom: 16,
  },
  companionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  companionsTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.PrimaryText,
  },
  companionsCounter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.LightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  counterInput: {
    width: 60,
    height: 40,
    textAlign: "center",
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
  },
  totalContainer: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.PrimaryText,
  },
  completeButton: {
    backgroundColor: Colors.Primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.White,
  },
});

export default styles;

