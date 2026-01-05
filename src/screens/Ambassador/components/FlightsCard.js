import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { commonCardStyle } from "../../../config/metrics";
import CustomPressable from "../../../components/CustomPressable";
import ProgressBar from "./ProgressBar";
import styles from "./CardStyles";

const FlightsCard = ({ flight }) => {
  if (!flight) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-";
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
    if (statusLower === "scheduled") {
      return (
        <View style={[styles.badge, styles.badgeOngoing]}>
          <Text style={styles.badgeText}>Scheduled</Text>
        </View>
      );
    }
    return (
      <View style={[styles.badge, styles.badgePending]}>
        <Text style={styles.badgeTextPending}>{status || "-"}</Text>
      </View>
    );
  };

  const stages = ["Airplane landed", "Luggage Arrived", "Guest Meet"];
  let currentStage;

  if (!flight.isParticipantArrived) {
    currentStage = -1;
  } else if (!flight.isLuggageReceived) {
    currentStage = 1;
  } else if (!flight.isMeetDone) {
    currentStage = 2;
  } else {
    currentStage = 3;
  }

  return (
    <View style={[commonCardStyle, styles.card, styles.marginTop]}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="flight" size={16} color={Colors.Primary} />
        </View>
        <Text style={styles.cardTitle}>Flights</Text>
      </View>

      <View style={styles.flightSection}>
        {flight.arrivalFlightNumber && (
          <Text style={styles.flightNumber}>
            {flight.arrivalFlightNumber.trim()}
          </Text>
        )}

        <View style={styles.flightDetails}>
          <View style={styles.flightDetailRow}>
            <Text style={styles.flightLabel}>Arrival Flight:</Text>
            {getStatusBadge(flight.arrivalFlightStatus)}
          </View>
          <View style={styles.flightInfo}>
            {flight.arrivalDate && (
              <Text style={styles.flightText}>
                Arrival Date & Time: {formatDate(flight.arrivalDate)}
              </Text>
            )}
            <Text style={styles.flightText}>
              Status: {flight.arrivalFlightStatus || "-"}
            </Text>
            <Text style={styles.flightText}>
              Participant Arrived: {flight.isParticipantArrived ? "Yes" : "No"}
            </Text>
            <Text style={styles.flightText}>
              Meet Done: {flight.isMeetDone ? "Yes" : "No"}
            </Text>
            <Text style={styles.flightText}>
              Luggage Received: {flight.isLuggageReceived ? "Yes" : "No"}
            </Text>
          </View>
        </View>

        {flight.returnFlightNumber && (
          <View style={styles.flightDetails}>
            <View style={styles.flightDetailRow}>
              <Text style={styles.flightLabel}>Return Flight:</Text>
              {getStatusBadge(flight.returnFlightStatus)}
            </View>
            <View style={styles.flightInfo}>
              {flight.returnDate && (
                <Text style={styles.flightText}>
                  Return Date & Time: {formatDate(flight.returnDate)}
                </Text>
              )}
              <Text style={styles.flightText}>
                Flight Number: {flight.returnFlightNumber}
              </Text>
              {flight.returnAirportCode && (
                <Text style={styles.flightText}>
                  Airport Code: {flight.returnAirportCode}
                </Text>
              )}
              <Text style={styles.flightText}>
                Status: {flight.returnFlightStatus || "-"}
              </Text>
              <Text style={styles.flightText}>
                Participant Departed:{" "}
                {flight.isParticipantDeparted ? "Yes" : "No"}
              </Text>
            </View>
          </View>
        )}
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
