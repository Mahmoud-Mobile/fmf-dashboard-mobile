import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Colors } from "../../../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const CheckInSuccessModal = forwardRef(
  ({ visitorName, location, dateTime, onClose }, ref) => {
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
                <MaterialIcons
                  name="check-circle"
                  size={64}
                  color={Colors.Success}
                />
              </View>

              <Text style={styles.title}>Checked-In Successful!</Text>

              {visitorName && (
                <Text style={styles.visitorName}>{visitorName}</Text>
              )}

              {location && (
                <Text style={styles.detailText}>Location: {location}</Text>
              )}

              {dateTime && (
                <Text style={styles.detailText}>Date & Time: {dateTime}</Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
);

CheckInSuccessModal.displayName = "CheckInSuccessModal";

export default CheckInSuccessModal;
