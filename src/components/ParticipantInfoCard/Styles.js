import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";

const styles = StyleSheet.create({
  modernParticipantCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  participantHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modernParticipantPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.Primary,
  },
  modernParticipantIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    borderWidth: 2,
    borderColor: "#E3F2FD",
    backgroundColor: Colors.Primary,
  },
  modernParticipantInitial: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.White,
  },
  participantHeaderInfo: {},
  modernParticipantName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
  },
  modernParticipantTypeBadge: {
    position: "absolute",
    right: 0,
    top: 0,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 20,
    paddingVertical: 6,
  },

  modernParticipantTypeText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Primary,
  },
  participantDetailsGrid: {
    gap: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: Colors.Primary,
  },
  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  detailValue: {
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
  },
});

export default styles;
