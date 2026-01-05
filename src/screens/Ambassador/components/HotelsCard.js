import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { commonCardStyle } from "../../../config/metrics";
import CustomPressable from "../../../components/CustomPressable";
import ProgressBar from "./ProgressBar";
import styles from "./CardStyles";

const HotelsCard = ({ accommodation }) => {
  if (!accommodation) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "booked") {
      return (
        <View style={[styles.badge, styles.badgeOngoing]}>
          <Text style={styles.badgeText}>Booked</Text>
        </View>
      );
    }
    return (
      <View style={[styles.badge, styles.badgePending]}>
        <Text style={styles.badgeTextPending}>{status || "N/A"}</Text>
      </View>
    );
  };

  const stages = ["Room Prepared", "Guest Arrived", "Room Occupied"];
  let currentStage = 0;
  if (accommodation.isCheckedIn) currentStage = 1;
  if (accommodation.isCheckedOut) currentStage = 2;

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
          <Text style={styles.hotelValue}>
            {accommodation.hotelName || "N/A"}
          </Text>
        </View>
        {accommodation.checkInDate && (
          <View style={styles.hotelDetailRow}>
            <Text style={styles.hotelLabel}>Check-in Date:</Text>
            <Text style={styles.hotelValue}>
              {formatDate(accommodation.checkInDate)}
            </Text>
          </View>
        )}
        <View style={styles.hotelDetailRow}>
          <Text style={styles.hotelLabel}>Room Number:</Text>
          <View style={styles.hotelValueRow}>
            <Text style={styles.hotelValue}>
              {accommodation.roomNumber || "N/A"}
            </Text>
            {getStatusBadge(accommodation.status)}
          </View>
        </View>
        {accommodation.checkOutDate && (
          <View style={styles.hotelDetailRow}>
            <Text style={styles.hotelLabel}>Check-out Date:</Text>
            <Text style={styles.hotelValue}>
              {formatDate(accommodation.checkOutDate)}
            </Text>
          </View>
        )}
        <View style={styles.hotelDetailRow}>
          <Text style={styles.hotelLabel}>Status:</Text>
          <Text style={styles.hotelValue}>{accommodation.status || "N/A"}</Text>
        </View>
        <View style={styles.hotelDetailRow}>
          <Text style={styles.hotelLabel}>Checked In:</Text>
          <Text style={styles.hotelValue}>
            {accommodation.isCheckedIn ? "Yes" : "No"}
          </Text>
        </View>
        <View style={styles.hotelDetailRow}>
          <Text style={styles.hotelLabel}>Checked Out:</Text>
          <Text style={styles.hotelValue}>
            {accommodation.isCheckedOut ? "Yes" : "No"}
          </Text>
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

