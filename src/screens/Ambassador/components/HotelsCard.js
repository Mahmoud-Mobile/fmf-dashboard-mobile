import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { commonCardStyle } from "../../../config/metrics";
import CustomPressable from "../../../components/CustomPressable";
import ProgressBar from "./ProgressBar";
import styles from "./CardStyles";

const HotelsCard = () => {
  const stages = ["Room Prepared", "Guest Arrived", "Room Occupied"];
  const currentStage = 1; // 0-indexed, so 1 means second stage is current

  return (
    <View style={[commonCardStyle, styles.card, styles.marginTop]}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="hotel" size={16} color={Colors.Primary} />
        </View>
        <Text style={styles.cardTitle}>Hotels</Text>
      </View>

      <View style={styles.hotelSection}>
        <View style={styles.hotelDetailRow}>
          <Text style={styles.hotelLabel}>Hotel Name:</Text>
          <Text style={styles.hotelValue}>Marriott Hotel</Text>
        </View>
        <View style={styles.hotelDetailRow}>
          <Text style={styles.hotelLabel}>Arrival Date:</Text>
          <Text style={styles.hotelValue}>Jan 10, 2026 - 4:00 PM</Text>
        </View>
        <View style={styles.hotelDetailRow}>
          <Text style={styles.hotelLabel}>Room Number:</Text>
          <View style={styles.hotelValueRow}>
            <Text style={styles.hotelValue}>207</Text>
            <View style={[styles.badge, styles.badgePending]}>
              <Text style={styles.badgeTextPending}>Pending</Text>
            </View>
          </View>
        </View>
        <View style={styles.hotelDetailRow}>
          <Text style={styles.hotelLabel}>Check-out:</Text>
          <Text style={styles.hotelValue}>Jan 18, 2026 - 4:00 PM</Text>
        </View>
      </View>

      <ProgressBar stages={stages} currentStage={currentStage} />

      <View style={styles.actionButtons}>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            styles.outlineButton,
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.outlineButtonText}>Request Support</Text>
        </Pressable>
        <CustomPressable
          onPress={() => {}}
          title="Change Hotel"
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default HotelsCard;

