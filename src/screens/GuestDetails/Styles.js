import { StyleSheet, Dimensions } from "react-native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#6B7280",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: "#1A1A1A",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },

  // Guest Profile Section
  guestProfileSection: {
    backgroundColor: "#F8F9FA",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
    fontFamily: Fonts.FONT_BOLD,
    color: "#1976D2",
  },
  guestInfo: {
    flex: 1,
  },
  guestName: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  guestId: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
  },

  // Action Buttons Section
  actionButtonsSection: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  actionButtonsTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: "#1A1A1A",
    marginBottom: 16,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  actionButtonCompleted: {
    backgroundColor: "#F0F9FF",
    borderColor: "#BFDBFE",
  },
  actionButtonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#374151",
    flex: 1,
    textAlign: "center",
  },
  actionButtonCompletedText: {
    color: "#1E40AF",
  },
  actionButtonCheck: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },

  // Details Section
  detailsSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  detailsTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: "#1A1A1A",
    marginBottom: 16,
  },
  detailGroup: {
    marginBottom: 24,
  },
  detailGroupTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: "#6B7280",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#6B7280",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#1A1A1A",
    flex: 2,
    textAlign: "right",
  },
  detailValueHighlight: {
    color: "#1976D2",
    fontFamily: Fonts.FONT_SEMI_BOLD,
  },

  // Ambassador Section
  ambassadorRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  ambassadorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  ambassadorInfo: {
    flex: 1,
  },
  ambassadorName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#1A1A1A",
  },
  ambassadorNumber: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
  },

  // Special Requests
  specialRequestsContainer: {
    backgroundColor: "#FEF3C7",
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    marginTop: 8,
  },
  specialRequestsText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#92400E",
    lineHeight: 20,
  },

  // Date Formatting
  dateValue: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#1A1A1A",
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#9CA3AF",
    textAlign: "center",
  },
});

export default styles;
