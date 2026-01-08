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
    paddingTop: 24,
    paddingBottom: 40,
  },
  card: {
    ...commonCardStyle,
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardHeader: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
    shadowColor: "rgba(222, 222, 222, 0.10)",
    shadowOffset: {
      width: 0,
      height: 5.871,
    },
    shadowOpacity: 1,
    shadowRadius: 13.209,
    elevation: 5,
  },
  cardBody: {
    backgroundColor: Colors.White,
  },
  cardFooter: {
    backgroundColor: Colors.White,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 24,
    paddingHorizontal: 24,
    paddingTop: 0,
    shadowColor: "rgba(222, 222, 222, 0.10)",
    shadowOffset: {
      width: 0,
      height: 5.871,
    },
    shadowOpacity: 1,
    shadowRadius: 13.209,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.DarkGray,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
    marginBottom: 20,
    lineHeight: 22,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.LightGray,
    marginBottom: 8,
  },
});
