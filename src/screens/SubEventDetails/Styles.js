import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
  },
  heroContent: {
    padding: 20,
  },
  heroHeader: {
    marginBottom: 12,
  },
  heroTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  heroTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    flex: 1,
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    lineHeight: 20,
    marginTop: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  statusBadgeText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: Colors.PrimaryText,
  },
  badgeDraft: {
    backgroundColor: "#F3F4F6",
  },
  badgeActive: {
    backgroundColor: "#D1FAE5",
  },
  badgeCompleted: {
    backgroundColor: "#DBEAFE",
  },
  badgeCancelled: {
    backgroundColor: "#FEE2E2",
  },
  card: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginLeft: 10,
  },
  cardBody: {
    padding: 20,
  },
  infoGrid: {
    flexDirection: "column",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 13,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    marginHorizontal: -6,
  },
  statCard: {
    flex: 1,
    minWidth: "47%",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 6,
    marginBottom: 12,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statIconTotal: {
    backgroundColor: Colors.Primary,
  },
  statIconAccepted: {
    backgroundColor: Colors.Success,
  },
  statIconDeclined: {
    backgroundColor: Colors.Error,
  },
  statIconPending: {
    backgroundColor: Colors.Warning,
  },
  statNumber: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statAcceptedText: {
    color: Colors.Success,
  },
  statDeclinedText: {
    color: Colors.Error,
  },
  statPendingText: {
    color: Colors.Warning,
  },
  additionalStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.LightGray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    marginBottom: 20,
  },
  additionalStatItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  additionalStatLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    marginRight: 4,
  },
  additionalStatValue: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  participantTypeSection: {
    marginTop: 8,
  },
  participantTypeTitle: {
    fontSize: 13,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginBottom: 12,
  },
  participantTypeList: {
    flexDirection: "column",
  },
  participantTypeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 6,
    marginBottom: 10,
  },
  participantTypeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Primary,
    marginRight: 10,
  },
  participantTypeName: {
    flex: 1,
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  participantTypeCount: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Primary,
  },
  tableContainer: {
    marginTop: 0,
  },
  rsvpBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  rsvpBadgeText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: Colors.PrimaryText,
  },
  statusAccepted: {
    backgroundColor: "#D1FAE5",
  },
  statusDeclined: {
    backgroundColor: "#FEE2E2",
  },
  statusPending: {
    backgroundColor: "#FEF3C7",
  },
});

export default styles;
