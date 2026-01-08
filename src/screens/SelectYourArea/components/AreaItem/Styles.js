import { StyleSheet } from "react-native";
import { Colors } from "../../../../Global/colors";
import { Fonts } from "../../../../Global/fonts";

export const styles = StyleSheet.create({
  areaItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    backgroundColor: Colors.White,
  },
  areaItemLast: {
    borderBottomWidth: 0,
  },
  areaContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(41, 101, 184, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    minWidth: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 8,
  },
  areaName: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.DarkGray,
    flex: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  statusBadgeActive: {
    backgroundColor: "#E8F5E9",
  },
  statusBadgeInactive: {
    backgroundColor: "#F5F5F5",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotActive: {
    backgroundColor: Colors.Success,
  },
  statusDotInactive: {
    backgroundColor: Colors.Gray,
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    letterSpacing: 0.2,
  },
  statusTextActive: {
    color: Colors.Success,
  },
  statusTextInactive: {
    color: Colors.Gray,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
    flex: 1,
  },
  capacityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
  },
  capacityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  capacityText: {
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.DarkGray,
  },
  checkInButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  checkInButtonText: {
    color: Colors.White,
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    letterSpacing: 0.2,
  },
  chevronIcon: {
    marginLeft: 8,
    marginTop: 2,
  },
});

