import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { commonCardStyle } from "../../../config/metrics";
import styles from "./CardStyles";

const EventsCheckInCard = () => {
  const dailySchedules = [
    {
      day: "Day 1, 13 Jan",
      events: [{ name: "Welcome", time: "6:00 PM - 8:00 PM" }],
    },
  ];

  return (
    <View style={[commonCardStyle, styles.card, styles.marginTop]}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="event" size={16} color={Colors.Primary} />
        </View>
        <Text style={styles.cardTitle}>Events Check-In</Text>
      </View>

      <View style={styles.eventsSection}>
        {dailySchedules.map((schedule, dayIndex) => (
          <View key={dayIndex} style={styles.daySchedule}>
            <Text style={styles.dayTitle}>{schedule.day}</Text>
            {schedule.events.map((event, eventIndex) => (
              <View key={eventIndex} style={styles.eventItem}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default EventsCheckInCard;
