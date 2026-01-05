import { StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { commonCardStyle } from "../../../config/metrics";

const styles = StyleSheet.create({
  delegationCard: {
    ...commonCardStyle,
    backgroundColor: Colors.White,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    backgroundColor: Colors.Background,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  delegationType: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: Colors.Success + "20",
  },
  statusInactive: {
    backgroundColor: Colors.Error + "20",
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_SEMIBOLD,
  },
  statusTextActive: {
    color: Colors.Success,
  },
  statusTextInactive: {
    color: Colors.Error,
  },
  cardContent: {
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 13,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    flex: 1,
  },
  infoValue: {
    fontSize: 13,
    fontFamily: Fonts.FONT_SEMIBOLD,
    color: Colors.PrimaryText,
    flex: 2,
    textAlign: "right",
  },
});

export default styles;
