import React, { useMemo } from "react";
import { View, Text, Image } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import styles from "./Styles";

const ParticipantInfoCard = ({ participant, fields = [] }) => {
  const getParticipantName = (participant) => {
    if (!participant) return "Participant";
    const firstName = participant.firstName || "";
    const lastName = participant.lastName || "";
    return `${firstName} ${lastName}`.trim() || "Participant";
  };

  const participantName = getParticipantName(participant);
  const participantInitials = useMemo(() => {
    const firstName = participant?.firstName || "";
    const lastName = participant?.lastName || "";
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    if (firstInitial && lastInitial) return `${firstInitial}${lastInitial}`;
    if (participantName) return participantName.charAt(0).toUpperCase();
    return "";
  }, [participant, participantName]);

  if (!participant) {
    return null;
  }

  const renderIcon = (iconName, iconType = "MaterialIcons") => {
    const IconComponent = iconType === "Ionicons" ? Ionicons : MaterialIcons;
    return <IconComponent name={iconName} size={18} color={Colors.Primary} />;
  };

  return (
    <View style={styles.modernParticipantCard}>
      <View style={styles.participantHeader}>
        {participant.profilePicture ? (
          <Image
            source={{ uri: participant.profilePicture }}
            style={styles.modernParticipantPhoto}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.modernParticipantIconCircle}>
            <Text style={styles.modernParticipantInitial}>
              {participantInitials}
            </Text>
          </View>
        )}
        <View style={styles.participantHeaderInfo}>
          <Text style={styles.modernParticipantName}>{participantName}</Text>
        </View>
      </View>
      <View style={styles.modernParticipantTypeBadge}>
        {(participant.dynamicParticipantType?.name ||
          participant.participantType?.name) && (
          <Text style={styles.modernParticipantTypeText}>
            {participant.dynamicParticipantType?.name ||
              participant.participantType?.name}
          </Text>
        )}
      </View>
      <View style={styles.participantDetailsGrid}>
        {fields.map((field, index) => {
          if (!field.value) return null;

          return (
            <View key={field.key || index} style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                {renderIcon(field.icon, field.iconType)}
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{field.label}</Text>
                <Text style={styles.detailValue}>{field.value}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ParticipantInfoCard;
