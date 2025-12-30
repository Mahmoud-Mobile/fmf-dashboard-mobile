import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Colors } from "../../../../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const CheckInDeclineModal = forwardRef(
  (
    {
      message = "The visitor has been notified that their entry was not approved.",
      onClose,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
      },
      close: () => {
        setVisible(false);
      },
    }));

    const handleClose = () => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    };

    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.6}
            >
              <MaterialIcons
                name="close"
                size={20}
                color={Colors.PrimaryText}
              />
            </TouchableOpacity>

            <View style={styles.contentContainer}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="cancel" size={64} color={Colors.Error} />
              </View>

              <Text style={styles.title}>Check-In Declined</Text>

              <Text style={styles.messageText}>{message}</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
);

CheckInDeclineModal.displayName = "CheckInDeclineModal";

export default CheckInDeclineModal;
