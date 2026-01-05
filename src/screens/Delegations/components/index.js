import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import styles from "./Styles";

const DelegationCard = ({ delegation }) => {
  const navigation = useNavigation();

  const getStatusBadge = (isActive) => {
    return (
      <View
        style={[
          styles.statusBadge,
          isActive ? styles.statusActive : styles.statusInactive,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            isActive ? styles.statusTextActive : styles.statusTextInactive,
          ]}
        >
          {isActive ? "Active" : "Inactive"}
        </Text>
      </View>
    );
  };

  const handlePress = () => {
    navigation.navigate("Ambassador", {
      participantId: delegation.participantId,
      eventId: delegation.eventId,
      userId: delegation.userId,
    });
  };

  return (
    <TouchableOpacity
      style={styles.delegationCard}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={styles.delegationType}>
            {delegation.delegationType || "N/A"}
          </Text>
          {getStatusBadge(delegation.isActive)}
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={Colors.SecondaryText}
        />
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Participant ID:</Text>
          <Text style={styles.infoValue}>
            {delegation.participantId || "N/A"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Event ID:</Text>
          <Text style={styles.infoValue}>{delegation.eventId || "N/A"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DelegationCard;
