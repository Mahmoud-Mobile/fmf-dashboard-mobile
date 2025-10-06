import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../Global/colors";
import { Fonts } from "../Global/fonts";
import { horizontalMargin } from "../config/metrics";
import { AntDesign } from "@expo/vector-icons";

const ValidationModal = ({ visible, icon, color, message, onClose }) => {
  return (
    <Modal
      animationType="fade" // slide fade
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <AntDesign
          name={icon ? icon : "closecircleo"}
          size={30}
          color={color ? color : Colors.Primary}
          style={{ alignSelf: "center", marginTop: 12 }}
        />

        <Text style={styles.modalText}>{message}</Text>

        <TouchableOpacity
          style={[
            styles.backBtn,
            { backgroundColor: color ? color : Colors.Primary },
          ]}
          activeOpacity={0.3}
          onPress={onClose}
        >
          <Text style={styles.backText}>close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WhiteColor,
    paddingHorizontal: horizontalMargin,
    paddingVertical: 5,
    borderRadius: 12,
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  modalText: {
    color: Colors.BlackColor,
    fontSize: 15,
    fontFamily: Fonts.FONT_MEDIUM,
    textAlign: "center",
    marginTop: 10,
  },
  backBtn: {
    marginVertical: 13,
    width: 140,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  backText: {
    color: Colors.WhiteColor,
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    paddingVertical: 10,
  },
});
export default ValidationModal;
