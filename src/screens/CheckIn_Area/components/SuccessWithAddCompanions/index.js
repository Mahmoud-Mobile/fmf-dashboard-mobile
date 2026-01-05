import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from "react-native";
import { Colors } from "../../../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const SuccessWithAddCompanions = forwardRef(
  ({ visitorInfo = null, onCompleteCheckIn, onClose }, ref) => {
    const [visible, setVisible] = useState(false);
    const [companionsCount, setCompanionsCount] = useState(0);

    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
        setCompanionsCount(0);
      },
      close: () => {
        setVisible(false);
      },
    }));

    const handleClose = () => {
      setVisible(false);
      setCompanionsCount(0);
      if (onClose) {
        onClose();
      }
    };

    const handleIncrement = () => {
      setCompanionsCount((prev) => prev + 1);
    };

    const handleDecrement = () => {
      setCompanionsCount((prev) => Math.max(0, prev - 1));
    };

    const handleCompleteCheckIn = () => {
      if (onCompleteCheckIn) {
        onCompleteCheckIn(companionsCount);
      }
      handleClose();
    };

    const totalEntering = 1 + companionsCount; // Visitor + companions

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

            {visitorInfo && (
              <View style={styles.contentContainer}>
                <View style={styles.visitorInfoSection}>
                  <View style={styles.profileImageContainer}>
                    {visitorInfo.image ? (
                      <Image
                        source={{ uri: visitorInfo.image }}
                        style={styles.profileImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.profileImagePlaceholder}>
                        <MaterialIcons
                          name="person"
                          size={40}
                          color={Colors.gray}
                        />
                      </View>
                    )}
                  </View>

                  <Text style={styles.visitorName}>
                    {visitorInfo.name || "Visitor Name"}
                  </Text>

                  <View style={styles.detailsContainer}>
                    {visitorInfo.email && (
                      <Text style={styles.detailText}>
                        Email: {visitorInfo.email}
                      </Text>
                    )}
                    {visitorInfo.mobile && (
                      <Text style={styles.detailText}>
                        Mobile Number: {visitorInfo.mobile}
                      </Text>
                    )}
                    {visitorInfo.position && (
                      <Text style={styles.detailText}>
                        Position: {visitorInfo.position}
                      </Text>
                    )}
                    {visitorInfo.qrCode && (
                      <Text style={styles.detailText}>
                        QR Code: {visitorInfo.qrCode}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Separator Line */}
                <View style={styles.separator} />

                {/* Add Companions Section */}
                <View style={styles.companionsSection}>
                  <View style={styles.companionsHeader}>
                    <MaterialIcons
                      name="group"
                      size={20}
                      color={Colors.PrimaryText}
                    />
                    <Text style={styles.companionsTitle}>Add Companions</Text>
                  </View>

                  <View style={styles.companionsCounter}>
                    <TouchableOpacity
                      style={styles.counterButton}
                      onPress={handleDecrement}
                      activeOpacity={0.6}
                      disabled={companionsCount === 0}
                    >
                      <MaterialIcons
                        name="remove"
                        size={20}
                        color={
                          companionsCount === 0
                            ? Colors.LightGray
                            : Colors.PrimaryText
                        }
                      />
                    </TouchableOpacity>

                    <TextInput
                      style={styles.counterInput}
                      value={companionsCount.toString()}
                      editable={false}
                      keyboardType="numeric"
                    />

                    <TouchableOpacity
                      style={styles.counterButton}
                      onPress={handleIncrement}
                      activeOpacity={0.6}
                    >
                      <MaterialIcons
                        name="add"
                        size={20}
                        color={Colors.PrimaryText}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Total Entering */}
                <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>
                    Total entering: {totalEntering}{" "}
                    {totalEntering === 1 ? "person" : "persons"}
                  </Text>
                </View>

                {/* Complete Check-In Button */}
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={handleCompleteCheckIn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.completeButtonText}>
                    Complete Check-In
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }
);

SuccessWithAddCompanions.displayName = "SuccessWithAddCompanions";

export default SuccessWithAddCompanions;
