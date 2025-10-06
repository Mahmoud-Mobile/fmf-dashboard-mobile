import { StyleSheet, Dimensions } from "react-native";
import { Fonts } from "../../Global/fonts";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 280, // Fixed minimum height for consistency
    flex: 1, // Equal width in rows
  },

  // Header Section
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16, // Increased margin for better spacing
  },
  guestImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16, // Added margin for consistency with avatar
  },
  avatarText: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: "#1976D2",
  },
  guestInfo: {
    flex: 1,
  },
  guestName: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: "#1A1A1A",
    marginBottom: 4,
    lineHeight: 20,
  },
  position: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#6B7280",
    lineHeight: 16,
  },
  ambassadorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ambassadorImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  ambassadorText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#2563EB",
    lineHeight: 14,
    flex: 1,
  },

  // Status Section
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#6B7280",
    textTransform: "capitalize",
  },

  // Content Section
  cardBody: {
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    paddingVertical: 2,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#9CA3AF",
    flex: 1,
  },
  infoValue: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#374151",
    textAlign: "right",
    flex: 1.5,
  },
  flightNumber: {
    fontSize: 12,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#1976D2",
  },
  airlineText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#6B7280",
  },
  dateText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
  },
  guestType: {
    fontSize: 11,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#059669",
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    textAlign: "center",
  },

  // Special Requests
  specialRequestsContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  specialRequestsLabel: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  specialRequestsText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
    lineHeight: 14,
  },

  // Organization Badge
  organizationBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  organizationText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#92400E",
    textTransform: "uppercase",
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#9CA3AF",
    textAlign: "center",
  },
});

export default styles;
