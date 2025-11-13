import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { Colors } from "../Global/colors";

const LoadingModal = ({ visible }) => {
  return (
    <Spinner
      visible={visible}
      textContent={""}
      textStyle={{ color: Colors.White }}
      overlayColor="rgba(0, 0, 0, 0.05)"
      color={Colors.Primary}
      size="small"
    />
  );
};

export default LoadingModal;
