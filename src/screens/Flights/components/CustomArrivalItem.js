import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import moment from "moment";
import { Fonts } from "../../../Global/fonts";
import { Colors } from "../../../Global/colors";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

const CustomArrivalItem = ({ flight, onPress }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      // Use native Date first to avoid moment warnings
      const nativeDate = new Date(dateString);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("MMM DD, YYYY");
      }
      return "N/A";
    } catch (error) {
      console.warn("Date formatting error:", error, "for date:", dateString);
      return "N/A";
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      // Use native Date first to avoid moment warnings
      const nativeDate = new Date(dateString);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("HH:mm");
      }
      return "N/A";
    } catch (error) {
      console.warn("Time formatting error:", error, "for date:", dateString);
      return "N/A";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SCHEDULED":
        return Colors.Primary;
      case "DELAYED":
        return "#FF9500";
      case "CANCELLED":
        return "#FF3B30";
      case "ARRIVED":
        return "#34C759";
      default:
        return Colors.Primary;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress(flight)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.flightInfo}>
          <Text style={styles.airlineName}>
            {flight.arrivalAirlinesName || "N/A"}
          </Text>
          <Text style={styles.flightNumber}>{flight.arrivalFlightNumber}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(flight.arrivalFlightStatus) },
            ]}
          >
            <Text style={styles.statusText}>{flight.arrivalFlightStatus}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.routeInfo}>
          <View style={styles.airportInfo}>
            <Text style={styles.airportCode}>{flight.arrivalAirportCode}</Text>
            <Text style={styles.airportName}>{flight.arrivalAirport}</Text>
            <Text style={styles.cityCountry}>
              {flight.arrivalCity}, {flight.arrivalCountry}
            </Text>
          </View>
        </View>

        <View style={styles.timeInfo}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Arrival Time</Text>
            <Text style={styles.timeValue}>
              {formatTime(flight.arrivalDate)}
            </Text>
            <Text style={styles.dateValue}>
              {formatDate(flight.arrivalDate)}
            </Text>
          </View>

          {flight.estimatedArrivalTime && (
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Estimated</Text>
              <Text style={styles.timeValue}>
                {formatTime(flight.estimatedArrivalTime)}
              </Text>
              <Text style={styles.dateValue}>
                {formatDate(flight.estimatedArrivalTime)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.additionalInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Seat:</Text>
            <Text style={styles.infoValue}>{flight.seatNumber || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Booking:</Text>
            <Text style={styles.infoValue}>
              {flight.bookingReference || "N/A"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: isTablet ? 8 : 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    flex: isTablet ? 1 : undefined,
    maxWidth: isTablet ? "48%" : "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  flightInfo: {
    flex: 1,
  },
  airlineName: {
    fontSize: 16,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.Primary,
    marginBottom: 4,
  },
  flightNumber: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  content: {
    padding: 16,
  },
  routeInfo: {
    marginBottom: 16,
  },
  airportInfo: {
    alignItems: "center",
  },
  airportCode: {
    fontSize: 24,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
    marginBottom: 4,
  },
  airportName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#374151",
    textAlign: "center",
    marginBottom: 2,
  },
  cityCountry: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
    textAlign: "center",
  },
  timeInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  timeContainer: {
    alignItems: "center",
  },
  timeLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: "#374151",
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
  },
  additionalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#6B7280",
    marginRight: 4,
  },
  infoValue: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#374151",
  },
});

export default CustomArrivalItem;
