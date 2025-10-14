import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../../Global/colors";
import { ImagesWithProps } from "../../../config/images";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import styles from "./Styles";

const EventCard = ({ item, onPress }) => {
  const formatDateRange = () => {
    if (item.startDate && item.endDate) {
      const startDate = moment(item.startDate);
      const endDate = moment(item.endDate);

      if (startDate.isSame(endDate, "day")) {
        return startDate.format("MMM D, YYYY");
      } else {
        return `${startDate.format("MMM D")} - ${endDate.format(
          "MMM D, YYYY"
        )}`;
      }
    }
    return "Date TBD";
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "PUBLISHED":
        return "#4CAF50";
      case "REGISTRATION_OPEN":
        return "#FF9800";
      default:
        return Colors.Gray;
    }
  };

  return (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.eventCardContent}>
        <View style={styles.eventHeader}>
          <View style={styles.iconContainer}>
            <ImagesWithProps
              source="Calendar_Icon"
              color={Colors.Primary}
              size={24}
            />
          </View>
          <View style={styles.eventInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.eventTitle} numberOfLines={2}>
                {item.title || item.name}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) },
                ]}
              >
                <Text style={styles.statusText}>
                  {item.status || "Unknown"}
                </Text>
              </View>
            </View>
            <Text style={styles.eventDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </View>

        <View style={styles.eventDetails}>
          {item.location && (
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={16} color={Colors.Gray} />
              <Text style={styles.detailText}>{item.location}</Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color={Colors.Gray} />
            <Text style={styles.detailText}>{formatDateRange()}</Text>
          </View>

          {/* {item.maxAttendees && (
            <View style={styles.detailRow}>
              <Ionicons name="people-outline" size={16} color={Colors.Gray} />
              <Text style={styles.detailText}>
                Max {item.maxAttendees} attendees
              </Text>
            </View>
          )} */}
        </View>

        <View style={styles.eventFooter}>
          <View style={styles.footerLeft}>
            {item.eventType && (
              <View style={styles.typeContainer}>
                <Text style={styles.typeLabel}>Type:</Text>
                <Text style={styles.typeValue}>{item.eventType}</Text>
              </View>
            )}
            {item.eventLevel && (
              <View style={styles.levelContainer}>
                <Text style={styles.levelLabel}>Level:</Text>
                <Text style={styles.levelValue}>{item.eventLevel}</Text>
              </View>
            )}
          </View>

          <View style={styles.footerRight}>
            <View
              style={[
                styles.activeIndicator,
                {
                  backgroundColor: item.isActive ? "#4CAF50" : "#F44336",
                },
              ]}
            >
              <Text style={styles.activeText}>
                {item.isActive ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
