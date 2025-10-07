import { StyleSheet, Dimensions } from "react-native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: Fonts.FONT_BOLD,
    color: "#1F2937",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  listFooter: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  flightsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  flightCardContainer: {
    width: isTablet ? "48%" : "100%",
    marginBottom: 16,
  },
  tabletCardContainer: {
    width: "48%",
  },
});

export default styles;
