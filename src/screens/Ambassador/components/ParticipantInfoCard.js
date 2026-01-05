import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { commonCardStyle } from "../../../config/metrics";
import styles from "./CardStyles";

const ParticipantInfoCard = ({ participant }) => {
  if (!participant) {
    return null;
  }

  const fullName = `${participant.firstName || ""} ${participant.lastName || ""}`.trim() || "N/A";
  const displayName = participant.prefix ? `${participant.prefix} ${fullName}` : fullName;

  return (
    <View style={[commonCardStyle, styles.card]}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="person" size={16} color={Colors.Primary} />
        </View>
        <Text style={styles.cardTitle}>Participant Information</Text>
      </View>
      <View style={styles.participantContent}>
        <View style={styles.avatarContainer}>
          {participant.profilePicture ? (
            <Image
              source={{ uri: participant.profilePicture }}
              style={styles.avatarImage}
            />
          ) : (
            <LinearGradient
              colors={[Colors.Primary + "20", Colors.Primary + "10"]}
              style={styles.avatarPlaceholder}
            >
              <Ionicons name="person" size={24} color={Colors.Primary} />
            </LinearGradient>
          )}
        </View>
        <View style={styles.participantDetails}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{displayName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mobile Number:</Text>
            <Text style={styles.value}>{participant.phone || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{participant.email || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Organization:</Text>
            <Text style={styles.value}>
              {participant.organization?.name || participant.company || "N/A"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Position:</Text>
            <Text style={styles.value}>{participant.position || "N/A"}</Text>
          </View>
          {participant.participantCode && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Participant Code:</Text>
              <Text style={styles.value}>{participant.participantCode}</Text>
            </View>
          )}
          {participant.nationality && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nationality:</Text>
              <Text style={styles.value}>{participant.nationality.name || "N/A"}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ParticipantInfoCard;

