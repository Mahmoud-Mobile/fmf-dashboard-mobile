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
    flexBasis: "48%",
    minWidth: "48%",
    maxWidth: "100%",
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#FAFAFB",
    borderRadius: 12,
    padding: 12,
    marginTop: 5,
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
    // flex: 2,
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
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 10,
    marginTop: 8,
  },
  participantPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  participantIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  participantInitial: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginBottom: 6,
  },
  participantMobile: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Primary,
    marginBottom: 4,
  },
  participantTypeContainer: {
    borderWidth: 1,
    borderColor: Colors.Primary,
    paddingVertical: 3,
    borderRadius: 5,
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  participantType: {
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.SecondaryText,
  },
  documentsContainer: {
    marginBottom: 16,
  },
  pdfButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowColor: Colors.Primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  pdfButtonText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
    marginLeft: 8,
  },
});

export default styles;
