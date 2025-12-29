import { Platform, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerView: {
    width: "85%",
    height: Dimensions.get("window").height * 0.6,
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoContainer: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  blurContainer: {
    width: "50%",
    height: "60%",
    backgroundColor: "rgb(61, 133, 83, 0.6)",
    position: "absolute",
    top: 0,
    right: 0,
  },
  borderContainer: {
    width: "25%",
    height: "20%",
    backgroundColor: "#fff",
    position: "absolute",
    top: "60%",
    right: 0,
    paddingRight: 5,

    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  year2026Container: {
    marginTop: 80,
    alignSelf: "center",
    marginLeft: 40,
  },
  titleContainer: {
    transform: [{ rotate: "-90deg" }],
    position: "absolute",
    bottom: "40%",
    left: Platform.OS === "ios" ? (Platform.isPad ? "25%" : "15%") : "10%",
  },
  titleText: {
    ...Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    textTransform: "capitalize",
    opacity: 0.1,
    width: "70%",
  },
  borderContainer2: {
    width: "55%",
    height: "50%",
    backgroundColor: "#fff",
    position: "absolute",
    top: "30%",
    left: "20%",
  },
  userAvatarImage: {
    width: "90%",
    height: "55%",
    borderWidth: 0.5,
    borderColor: "rgb(61, 133, 83, 0.1)",
    marginTop: "5%",
    marginLeft: "5%",
    borderRadius: 2,
    overflow: "hidden",
  },
  qrCode: {
    marginTop: 15,
    alignSelf: "center",
  },
  userInfoContainer: {
    marginTop: 15,
    marginLeft: "5%",
  },
  userNameText: {
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  positionText: {
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  countryText: {
    fontFamily: Fonts.FONT_REGULAR,
    color: "#24B5BD",
    marginTop: 8,
    // opacity: 0.8,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "6%",
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    textAlign: "center",
  },
});
