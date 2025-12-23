import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { commonCardStyle } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
    color: Colors.SecondaryText,
    marginTop: 12,
    fontFamily: Fonts.FONT_REGULAR,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: Colors.White,
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: Colors.Primary,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 4,
    borderColor: Colors.Primary,
  },
  initialsText: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.White,
    fontFamily: Fonts.FONT_BOLD,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.PrimaryText,
    textAlign: "center",
    fontFamily: Fonts.FONT_BOLD,
  },
  profileRole: {
    fontSize: 16,
    color: Colors.SecondaryText,
    textAlign: "center",
    marginTop: 4,
    fontFamily: Fonts.FONT_REGULAR,
  },
  infoCard: {
    ...commonCardStyle,
    backgroundColor: Colors.White,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.Background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.SecondaryText,
    marginBottom: 4,
    fontFamily: Fonts.FONT_REGULAR,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.PrimaryText,
    fontFamily: Fonts.FONT_REGULAR,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderColor,
    marginVertical: 8,
    marginLeft: 64,
  },
});

export default styles;
