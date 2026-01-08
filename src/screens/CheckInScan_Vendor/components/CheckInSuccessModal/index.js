import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { Colors } from "../../../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import styles from "./Styles";

const CheckInSuccessModal = forwardRef(
  ({ visitorName, location, dateTime, onClose, profilePicture }, ref) => {
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

    const formatDateTime = (dateTime) => {
      if (!dateTime) return "";
      const date = moment(dateTime);
      if (date.isValid()) {
        return date.format("DD MMM YYYY, hh:mm A");
      }
      return dateTime;
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
                size={24}
                color={Colors.SecondaryText}
              />
            </TouchableOpacity>

            <View style={styles.contentContainer}>
              {profilePicture && (
                <View style={styles.profileImageContainer}>
                  <Image
                    source={{ uri: profilePicture }}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                  <View style={styles.profileImageBorder} />
                </View>
              )}

              <Text style={styles.title}>Checked-In Successful!</Text>

              {visitorName && (
                <View style={styles.infoCard}>
                  <MaterialIcons
                    name="person"
                    size={18}
                    color={Colors.PrimaryText}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.visitorName}>{visitorName}</Text>
                </View>
              )}

              {location && (
                <View style={styles.infoCard}>
                  <MaterialIcons
                    name="location-on"
                    size={18}
                    color={Colors.PrimaryText}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.detailText}>{location}</Text>
                </View>
              )}

              {dateTime && (
                <View style={styles.infoCard}>
                  <MaterialIcons
                    name="access-time"
                    size={18}
                    color={Colors.PrimaryText}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.detailText}>
                    {formatDateTime(dateTime)}
                  </Text>
                </View>
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
