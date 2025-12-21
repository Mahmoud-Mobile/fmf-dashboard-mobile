import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: horizontalMargin,
    paddingTop: 32,
    paddingBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${Colors.Primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "center",
    lineHeight: 22,
  },
  card: {
    backgroundColor: Colors.White,
    borderRadius: 16,
    marginHorizontal: horizontalMargin,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    minHeight: 72,
  },
  questionContainerExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  questionContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.Primary}10`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  question: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    flex: 1,
  },
  chevronContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.Primary}08`,
    justifyContent: "center",
    alignItems: "center",
  },
  chevronContainerExpanded: {
    backgroundColor: `${Colors.Primary}15`,
  },
  answerContainer: {
    padding: 20,
    paddingTop: 16,
  },
  answerLine: {
    width: 3,
    height: "100%",
    backgroundColor: Colors.Primary,
    position: "absolute",
    left: 20,
    top: 16,
    bottom: 16,
    borderRadius: 2,
  },
  answer: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    lineHeight: 22,
    paddingLeft: 16,
  },
});

export default styles;
