import { StyleSheet } from "react-native";
import { Colors } from "../../../../Global/colors";
import { Fonts } from "../../../../Global/fonts";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderRadius: 24,
    width: "90%",
    maxWidth: 420,
    padding: 28,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.LightGray,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: 12,
  },
  iconContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  iconBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  profileImageContainer: {
    marginBottom: 20,
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.LightGray,
  },
  profileImageBorder: {
    position: "absolute",
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 2,
    borderColor: Colors.Success,
    top: -4,
    left: -4,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LightGray,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    minHeight: 48,
  },
  infoIcon: {
    marginRight: 12,
  },
  visitorName: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    flex: 1,
    textAlign: "left",
  },
  detailText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    flex: 1,
    textAlign: "left",
    lineHeight: 20,
  },
});

export default styles;
