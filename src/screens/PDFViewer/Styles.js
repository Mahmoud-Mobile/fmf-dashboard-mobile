import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  webView: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.White,
    zIndex: 1,
  },
});

export default styles;

