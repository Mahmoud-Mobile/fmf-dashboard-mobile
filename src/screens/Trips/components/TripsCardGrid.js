import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

const TripCard = ({ item }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return moment(date).format("MMM DD, YYYY HH:mm");
      }
      return "N/A";
    } catch (error) {
      return "N/A";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "SCHEDULED":
        return Colors.Warning;
      case "IN_PROGRESS":
        return Colors.Primary;
      case "COMPLETED":
        return Colors.Success;
      case "CANCELLED":
        return Colors.Error;
      default:
        return Colors.Gray;
    }
  };

  const getTripTypeColor = (tripType) => {
    return tripType === "PICKUP" ? Colors.Primary : Colors.Success;
  };

  return (
    <View style={styles.tripItem}>
      <View style={styles.tripHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.tripTitle}>{item?.title || "Trip"}</Text>
          <View
            style={[
              styles.tripTypeBadge,
              { backgroundColor: getTripTypeColor(item?.tripType) },
            ]}
          >
            <Text style={styles.tripTypeText}>{item?.tripType || "N/A"}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item?.status) },
          ]}
        >
          <Text style={styles.statusText}>{item?.status || "N/A"}</Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <View style={styles.locationIcon}>
            <Text style={styles.locationIconText}>📍</Text>
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Pickup</Text>
            <Text style={styles.locationText}>
              {item?.pickupLocation || "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <View style={styles.locationIcon}>
            <Text style={styles.locationIconText}>🎯</Text>
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Dropoff</Text>
            <Text style={styles.locationText}>
              {item?.dropoffLocation || "N/A"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tripDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Scheduled Pickup:</Text>
          <Text style={styles.detailValue}>
            {formatDate(item?.scheduledPickup)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Passengers:</Text>
          <Text style={styles.detailValue}>
            {item?.currentPassengers || 0} / {item?.maxPassengers || 0}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tripItem: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  tripTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_SEMIBOLD,
    color: Colors.Black,
    marginRight: 8,
  },
  tripTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tripTypeText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_SEMIBOLD,
    color: Colors.White,
    textTransform: "uppercase",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
    textTransform: "uppercase",
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  locationIcon: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  locationIconText: {
    fontSize: 20,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  locationText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Black,
  },
  tripDetails: {
    borderTopWidth: 1,
    borderTopColor: Colors.LightGray,
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
  },
  detailValue: {
    fontSize: 13,
    fontFamily: Fonts.FONT_SEMIBOLD,
    color: Colors.Black,
  },
});

export default TripCard;
