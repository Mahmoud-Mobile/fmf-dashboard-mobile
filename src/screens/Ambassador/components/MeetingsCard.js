import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { commonCardStyle } from "../../../config/metrics";
import styles from "./CardStyles";

const MeetingsCard = () => {
  const todayMeetings = [];

  return (
    <View style={[commonCardStyle, styles.card, styles.marginTop]}>
      <View style={styles.cardHeaderWithAction}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="event" size={16} color={Colors.Primary} />
          </View>
          <Text style={styles.cardTitle}>Meetings</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Meeting</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.meetingsSection}>
        <Text style={styles.meetingSectionTitle}>Today's Meetings</Text>
        {todayMeetings.map((meeting, index) => (
          <View key={index} style={styles.meetingItem}>
            <Text style={styles.meetingTime}>{meeting.time}</Text>
            <Text style={styles.meetingDescription}>{meeting.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MeetingsCard;
