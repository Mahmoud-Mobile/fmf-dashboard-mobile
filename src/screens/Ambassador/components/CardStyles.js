import { StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: Colors.White,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  marginTop: {
    marginTop: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  cardHeaderWithAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.Primary + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 13,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginLeft: 8,
    letterSpacing: -0.2,
  },
  addButton: {
    backgroundColor: Colors.Primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    shadowColor: Colors.Primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
  // Participant Info Card
  participantContent: {
    flexDirection: "row",
    marginTop: 6,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.Primary + "30",
    shadowColor: Colors.Primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  participantDetails: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
    flexWrap: "wrap",
    paddingVertical: 2,
  },
  label: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
    minWidth: 110,
    lineHeight: 16,
  },
  value: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    flex: 1,
    lineHeight: 16,
  },
  // Flights Card
  flightSection: {
    marginTop: 2,
  },
  flightNumber: {
    fontSize: 12,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 10,
    letterSpacing: -0.1,
  },
  flightDetails: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: Colors.Background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  flightDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  flightLabel: {
    fontSize: 11,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginRight: 6,
  },
  flightInfo: {
    marginTop: 6,
  },
  flightText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
    marginBottom: 4,
    lineHeight: 16,
  },
  // Hotels Card
  hotelSection: {
    marginTop: 2,
  },
  hotelDetailRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    paddingVertical: 2,
  },
  hotelLabel: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
    minWidth: 100,
    lineHeight: 16,
  },
  hotelValue: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    flex: 1,
    lineHeight: 16,
  },
  hotelValueRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  // Trips Card
  tripSection: {
    marginTop: 2,
  },
  tripDetailRow: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
    paddingVertical: 2,
  },
  tripLabel: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
    minWidth: 110,
    lineHeight: 16,
  },
  tripValue: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    flex: 1,
    lineHeight: 16,
  },
  tripValueRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  // Badges
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeOngoing: {
    backgroundColor: Colors.Primary,
  },
  badgePending: {
    backgroundColor: Colors.LightGray,
  },
  badgeText: {
    fontSize: 9,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
    letterSpacing: 0.2,
  },
  badgeTextPending: {
    fontSize: 9,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.DarkGray,
    letterSpacing: 0.2,
  },
  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    marginTop: 14,
    gap: 8,
  },
  button: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    overflow: "hidden",
  },
  outlineButton: {
    flex: 1,
    height: 36,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.Primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  outlineButtonText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Primary,
    letterSpacing: 0.1,
  },
  // Events Check-In Card
  eventsSection: {
    marginTop: 2,
  },
  daySchedule: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: Colors.Background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  dayTitle: {
    fontSize: 11,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  eventItem: {
    marginBottom: 8,
    paddingLeft: 10,
    paddingVertical: 6,
    borderLeftWidth: 2,
    borderLeftColor: Colors.Primary + "40",
  },
  eventName: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    marginBottom: 3,
    lineHeight: 16,
  },
  eventTime: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
    lineHeight: 14,
  },
  // Meetings Card
  meetingsSection: {
    marginTop: 2,
  },
  meetingSectionTitle: {
    fontSize: 11,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 10,
    marginTop: 2,
    letterSpacing: -0.1,
  },
  meetingSectionTitleMargin: {
    marginTop: 14,
  },
  meetingItem: {
    marginBottom: 10,
    paddingLeft: 10,
    paddingVertical: 8,
    backgroundColor: Colors.Background,
    borderRadius: 8,
    borderLeftWidth: 2,
    borderLeftColor: Colors.Primary,
  },
  meetingTime: {
    fontSize: 11,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
    marginBottom: 3,
    lineHeight: 16,
  },
  meetingDescription: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.DarkGray,
    lineHeight: 16,
  },
});

export default styles;
