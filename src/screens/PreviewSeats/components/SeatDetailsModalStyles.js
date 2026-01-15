import { StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

export const modalStyles = StyleSheet.create({
  // Header Styles
  headerContainer: {
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerLabel: {
    fontSize: 10,
    color: Colors.gray,
    marginBottom: 2,
    fontFamily: Fonts.FONT_Semi,
  },
  headerTitle: {
    fontSize: 10,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_Semi,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.White,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Guest Information Styles
  guestSection: {
    marginBottom: 12,
  },
  guestSectionTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 10,
  },
  guestCard: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  participantHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray + "50",
  },
  participantIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.Primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  participantName: {
    fontSize: 12,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 2,
  },

  // Contact Information Styles
  contactSection: {
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.gray,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.LightGray + "30",
    borderRadius: 6,
  },
  contactText: {
    fontSize: 12,
    color: Colors.PrimaryText,
    flex: 1,
  },

  // Additional Information Styles
  additionalInfoSection: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray + "30",
  },
  infoLabel: {
    fontSize: 11,
    color: Colors.gray,
    fontFamily: Fonts.FONT_Semi,
  },
  infoValue: {
    fontSize: 11,
    color: Colors.PrimaryText,
    fontFamily: Fonts.FONT_Semi,
    flex: 1,
    textAlign: "right",
  },

  // Assignment Details Styles
  assignmentSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.LightGray + "50",
  },
  checkedInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.Success + "10",
    borderRadius: 6,
  },
  checkedInLabel: {
    fontSize: 10,
    color: Colors.gray,
    marginBottom: 2,
  },
  checkedInValue: {
    fontSize: 11,
    color: Colors.PrimaryText,
    fontFamily: Fonts.FONT_Semi,
  },

  // Empty State Styles
  emptyStateContainer: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyStateIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.LightGray + "40",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: Fonts.FONT_Semi,
    textAlign: "center",
  },

  // Footer Styles
  footerContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.LightGray + "30",
  },
  closeButtonContainer: {
    backgroundColor: Colors.Primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: Colors.Primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  closeButtonText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.White,
  },
});
