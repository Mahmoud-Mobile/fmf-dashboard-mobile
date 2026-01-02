import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { commonCardStyle } from "../../../config/metrics";
import styles from "./CardStyles";

const ParticipantInfoCard = () => {
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
          <LinearGradient
            colors={[Colors.Primary + "20", Colors.Primary + "10"]}
            style={styles.avatarPlaceholder}
          >
            <Ionicons name="person" size={24} color={Colors.Primary} />
          </LinearGradient>
        </View>
        <View style={styles.participantDetails}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>Ahmed Mohamed</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mobile Number:</Text>
            <Text style={styles.value}>+966 65 090 7242</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>Info@gmail.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Organization Type:</Text>
            <Text style={styles.value}>Private Sector</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Position:</Text>
            <Text style={styles.value}>Chairman</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ParticipantInfoCard;

