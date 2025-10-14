import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { getGridColumns } from "../../../constant";

const EventCard = ({ event, onCheckIn, onPreview }) => {
  const numColumns = getGridColumns();
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 32 - numColumns * 8) / numColumns; // 32 for padding, 8 for margins
  return (
    <View style={[styles.eventCard, { width: cardWidth }]}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventSubtitle}>{event.subtitle}</Text>

      <View style={styles.eventInfo}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialIcons
              name="location-on"
              size={16}
              color={Colors.Primary}
            />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="event" size={16} color={Colors.Primary} />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.previewButton}
          onPress={() => onPreview(event.id)}
        >
          <Text style={styles.previewButtonText}>Preview</Text>
        </Pressable>

        <Pressable
          style={[
            styles.checkInButton,
            event.isCheckedIn && styles.checkedInButton,
          ]}
          onPress={() => onCheckIn(event.id)}
        >
          <Text
            style={[
              styles.checkInButtonText,
              event.isCheckedIn && styles.checkedInButtonText,
            ]}
          >
            {event.isCheckedIn ? "Checked In" : "Check-In"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    padding: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    shadowColor: Colors.Secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Secondary,
    marginBottom: 4,
  },
  eventSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.gray,
    marginBottom: 12,
  },
  eventInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.gray,
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  previewButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.Primary,
    backgroundColor: Colors.White,
    alignItems: "center",
  },
  previewButtonText: {
    color: Colors.Primary,
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
  },
  checkInButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: Colors.Primary,
    alignItems: "center",
  },
  checkedInButton: {
    backgroundColor: Colors.Primary,
  },
  checkInButtonText: {
    color: Colors.White,
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
  },
  checkedInButtonText: {
    color: Colors.White,
  },
});

export default EventCard;
