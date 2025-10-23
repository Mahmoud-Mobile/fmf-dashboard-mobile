import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  scrollView: {
    flex: 1,
  },
  eventInfoContainer: {
    backgroundColor: Colors.Primary,
    margin: horizontalMargin,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  eventInfoTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
    marginBottom: 4,
  },
  eventInfoText: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.White,
    marginBottom: 2,
  },
  eventInfoSubtext: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.White,
    opacity: 0.9,
  },

  //
  content: {
    padding: 15,
  },
  sectionTitle: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  sectionTitleText: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.DarkGray,
    textAlign: "left",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  mobileContainer: {
    flexDirection: "column",
    marginBottom: 15,
  },
  mobileCardWrapper: {
    marginBottom: 10,
    width: "100%",
  },
  tabletCardWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  gridItem: {
    width: "48%",
    marginBottom: 10,
  },
  gridItemTablet: {
    width: "33.3%",
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.TextPrimary,
    marginBottom: 15,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Black,
    lineHeight: 24,
    textAlign: "center",
  },
});
export default styles;
