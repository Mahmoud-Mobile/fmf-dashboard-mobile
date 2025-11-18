import { StyleSheet } from "react-native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  safeAreaContainer: {
    paddingHorizontal: horizontalMargin,
    paddingTop: 5,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: Colors.Primary,
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    padding: 8,
  },
  eventSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e4681",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  eventContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  eventDetails: {
    gap: 6,
    flex: 1,
  },
  eventName: {
    fontSize: 15,
    fontFamily: Fonts.FONT_REGULAR,
    color: "white",
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  eventDetailText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#E3E3E3",
  },

  noEventSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  noEventText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_Semi,
    color: "rgba(255, 255, 255, 0.8)",
  },
  noEventSubtext: {
    fontSize: 13,
    fontFamily: Fonts.FONT_REGULAR,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
});

export default styles;
