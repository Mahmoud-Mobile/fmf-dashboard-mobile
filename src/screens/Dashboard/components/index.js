import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../../Global/colors";
import { ImagesWithProps } from "../../../config/images";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import styles from "./Styles";

const EventCard = ({ item, onPress }) => {
  // Format date range
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

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "#4CAF50";
      case "inactive":
        return "#F44336";
      case "pending":
        return "#FF9800";
      case "completed":
        return "#2196F3";
      default:
        return Colors.Gray;
    }
  };

  // Get event level color
  const getEventLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "#F44336";
      case "medium":
        return "#FF9800";
      case "low":
        return "#4CAF50";
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
        {/* Header with title and status */}
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

        {/* Event Details */}
        <View style={styles.eventDetails}>
          {/* Location */}
          {item.location && (
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={16} color={Colors.Gray} />
              <Text style={styles.detailText}>{item.location}</Text>
            </View>
          )}

          {/* Date Range */}
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color={Colors.Gray} />
            <Text style={styles.detailText}>{formatDateRange()}</Text>
          </View>

          {/* Max Attendees */}
          {item.maxAttendees && (
            <View style={styles.detailRow}>
              <Ionicons name="people-outline" size={16} color={Colors.Gray} />
              <Text style={styles.detailText}>
                Max {item.maxAttendees} attendees
              </Text>
            </View>
          )}
        </View>

        {/* Footer with Event Type, Level, and Active Status */}
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
                <Text
                  style={[
                    styles.levelValue,
                    { color: getEventLevelColor(item.eventLevel) },
                  ]}
                >
                  {item.eventLevel}
                </Text>
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
