import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../Global/colors";
import { horizontalMargin } from "../../config/metrics";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row-reverse",
    marginHorizontal: horizontalMargin,
  },
  inputView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: Colors.WhiteColor,
    borderRadius: 10,
    borderBottomWidth: 1.5,
    shadowColor:
      Platform.OS == "ios" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0,0.3)",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 44,
    shadowOpacity: 1,
    elevation: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    textAlign: "right",
  },

  filterBtn: {
    backgroundColor: Colors.WhiteColor,
    alignItems: "center",
    marginRight: 8,
    width: 50,
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.WhiteColor,
    borderRadius: 10,
    shadowColor:
      Platform.OS == "ios" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0,0.3)",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 44,
    shadowOpacity: 1,
    elevation: 4,
  },
});
export default styles;
