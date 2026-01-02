import { StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 6,
    paddingVertical: 4,
  },
  stageContainer: {
    alignItems: "center",
    flex: 1,
    minWidth: 60,
  },
  stageCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    marginBottom: 6,
  },
  stageCircleCompleted: {
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  stageCircleCurrent: {
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  stageCircleUpcoming: {
    backgroundColor: Colors.White,
    borderColor: Colors.LightGray,
  },
  stageNumber: {
    fontSize: 8,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Primary,
  },
  stageNumberCurrent: {
    color: Colors.White,
  },
  stageNumberUpcoming: {
    color: Colors.Gray,
  },
  stageLabel: {
    fontSize: 8,
    fontFamily: Fonts.FONT_REGULAR,
    textAlign: "center",
    paddingHorizontal: 2,
  },
  stageLabelCompleted: {
    color: Colors.Primary,
  },
  stageLabelCurrent: {
    color: Colors.Primary,
  },
  stageLabelUpcoming: {
    color: Colors.Gray,
  },
  connector: {
    height: 1.5,
    flex: 1,
    marginHorizontal: 3,
    marginTop: 9,
    minWidth: 15,
  },
  connectorCompleted: {
    backgroundColor: Colors.Primary,
  },
  connectorActive: {
    backgroundColor: Colors.Primary,
  },
  connectorUpcoming: {
    backgroundColor: Colors.LightGray,
  },
});

export default styles;

