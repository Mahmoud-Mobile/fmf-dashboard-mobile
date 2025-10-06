import React from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../Global/colors";

const LoadingModal = ({ visible }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator color={Colors.Primary} size="small" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.01)",
  },
  activityIndicatorWrapper: {
    backgroundColor: Colors.WhiteColor,
    borderRadius: 10,
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default LoadingModal;
