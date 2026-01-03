import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";
import { commonCardStyle } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    ...commonCardStyle,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 16,
  },
  cardContent: {
    padding: 20,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 16,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  flexOne: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  column: {
    flex: 0,
    flexBasis: "49%",
    minWidth: "49%",
    maxWidth: "100%",
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#FAFAFB",
    borderRadius: 12,
    padding: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Primary,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  statusScheduled: {
    color: "#10B981",
    fontFamily: Fonts.FONT_REGULAR,
  },
  statusYes: {
    color: "#10B981",
    fontFamily: Fonts.FONT_REGULAR,
  },
  statusNo: {
    color: "#EF4444",
    fontFamily: Fonts.FONT_REGULAR,
  },
  carCard: {
    ...commonCardStyle,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 16,
    padding: 20,
  },
  carTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Primary,
    marginBottom: 16,
    fontWeight: "600",
  },
  carDetails: {
    marginBottom: 16,
  },
  carActions: {
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonSecondary: {
    backgroundColor: Colors.Red || "#EF4444",
  },
  actionButtonDisabled: {
    backgroundColor: Colors.Gray || "#E5E7EB",
    opacity: 0.6,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
    fontWeight: "600",
  },
});

export default styles;

