import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { horizontalMargin } from "../../config/metrics";
import { commonCardStyle } from "../../config/metrics";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  listContainer: {
    paddingHorizontal: horizontalMargin,
    paddingVertical: 16,
  },
  exhibitorCard: {
    ...commonCardStyle,
    marginBottom: 12,
    padding: 16,
  },
  exhibitorContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exhibitorLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  exhibitorLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  exhibitorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.White,
  },
  exhibitorInfo: {
    flex: 1,
  },
  exhibitorName: {
    fontSize: 16,
    fontFamily: Fonts.FONT_SEMIBOLD,
    color: Colors.Text,
    marginBottom: 6,
  },
  boothContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  boothText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    flex: 1,
  },
});

