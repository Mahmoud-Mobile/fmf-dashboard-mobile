import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { commonCardStyle } from "../../../config/metrics";
import CustomPressable from "../../../components/CustomPressable";
import ProgressBar from "./ProgressBar";
import styles from "./CardStyles";
import { useNavigation } from "@react-navigation/native";
const TripsCard = () => {
  const navigation = useNavigation();
  const stages = ["Vehicle Ready", "Guest Picked up", "Trip Completed"];
  const currentStage = 1; // 0-indexed, so 1 means second stage is current

  return (
    <View style={[commonCardStyle, styles.card, styles.marginTop]}>
      <View style={styles.cardHeaderWithAction}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="directions-car"
              size={16}
              color={Colors.Primary}
            />
          </View>
          <Text style={styles.cardTitle}>Trips</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Trip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tripSection}>
        <View style={styles.tripDetailRow}>
          <Text style={styles.tripLabel}>Pickup Location:</Text>
          <Text style={styles.tripValue}>
            King Abdulaziz International Airport
          </Text>
        </View>
        <View style={styles.tripDetailRow}>
          <Text style={styles.tripLabel}>Drop-off Location:</Text>
          <Text style={styles.tripValue}>
            Marriott Hotel, King Abdullah Road
          </Text>
        </View>
        <View style={styles.tripDetailRow}>
          <Text style={styles.tripLabel}>Trip Date & Time:</Text>
          <Text style={styles.tripValue}>Jan 10, 2026, 4:00 PM</Text>
        </View>
        <View style={styles.tripDetailRow}>
          <Text style={styles.tripLabel}>Driver Name:</Text>
          <View style={styles.tripValueRow}>
            <Text style={styles.tripValue}>Salah Ahmed</Text>
            <View style={[styles.badge, styles.badgeOngoing]}>
              <Text style={styles.badgeText}>Ongoing</Text>
            </View>
          </View>
        </View>
        <View style={styles.tripDetailRow}>
          <Text style={styles.tripLabel}>Car Model:</Text>
          <Text style={styles.tripValue}>BMW X7</Text>
        </View>
        <View style={styles.tripDetailRow}>
          <Text style={styles.tripLabel}>Plate Number:</Text>
          <Text style={styles.tripValue}>AB852</Text>
        </View>
      </View>

      <ProgressBar stages={stages} currentStage={currentStage} />

      <View style={styles.actionButtons}>
        <Pressable
          onPress={() => {
            navigation.navigate("Chat");
          }}
          style={({ pressed }) => [
            styles.outlineButton,
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.outlineButtonText}>Request Support</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TripsCard;
