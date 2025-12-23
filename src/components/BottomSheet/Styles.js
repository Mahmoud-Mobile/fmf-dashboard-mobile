import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";

const styles = StyleSheet.create({
  bottomSheetBackground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: "#A7A7A7",
    width: 80,
    height: 3,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: Colors.PrimaryText,
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    color: Colors.PrimaryText,
    fontSize: 14,
  },
});

export default styles;
