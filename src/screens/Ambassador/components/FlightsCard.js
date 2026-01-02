import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { commonCardStyle } from "../../../config/metrics";
import CustomPressable from "../../../components/CustomPressable";
import ProgressBar from "./ProgressBar";
import styles from "./CardStyles";

const FlightsCard = () => {
  const stages = ["Airplane landed", "Luggage Arrived", "Guest Meet"];
  const currentStage = 1; // 0-indexed, so 1 means second stage is current

  return (
    <View style={[commonCardStyle, styles.card, styles.marginTop]}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="flight" size={16} color={Colors.Primary} />
        </View>
        <Text style={styles.cardTitle}>Flights</Text>
      </View>

      <View style={styles.flightSection}>
        <Text style={styles.flightNumber}>SA124, Saudi Arabian Airlines</Text>

        <View style={styles.flightDetails}>
          <View style={styles.flightDetailRow}>
            <Text style={styles.flightLabel}>Arrival Flight:</Text>
          </View>
          <View style={styles.flightInfo}>
            <Text style={styles.flightText}>Terminal: King Khalid Intl</Text>
            <Text style={styles.flightText}>
              Arrival Date & Time: Jan 10, 2026 - 4:00 PM
            </Text>
            <Text style={styles.flightText}>
              Flight Route: Dubai (DXB) → Riyadh (RUH)
            </Text>
            <Text style={styles.flightText}>Class: Economy</Text>
          </View>
        </View>

        <View style={styles.flightDetails}>
          <View style={styles.flightDetailRow}>
            <Text style={styles.flightLabel}>Departure Flight:</Text>
            <View style={[styles.badge, styles.badgeOngoing]}>
              <Text style={styles.badgeText}>Ongoing</Text>
            </View>
          </View>
          <View style={styles.flightInfo}>
            <Text style={styles.flightText}>Terminal: Terminal 5</Text>
            <Text style={styles.flightText}>
              Departure Date & Time: Jan 16, 2026 - 4:00 PM
            </Text>
            <Text style={styles.flightText}>
              Flight Route: Riyadh (RUH) → Dubai (DXB)
            </Text>
            <Text style={styles.flightText}>Ministry</Text>
          </View>
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
          title="Change Departure"
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default FlightsCard;
