import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { Fonts } from "../../../Global/fonts";
import { Colors } from "../../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";

const CustomMinistryItem = ({ flight, onPress, isTablet = false }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
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

  return (
    <TouchableOpacity
      style={[styles.container, { width: isTablet ? "48%" : "100%" }]}
      onPress={() => onPress && onPress(flight)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.flightInfo}>
            <Text style={styles.airlineName}>
              {flight.arrivalAirlinesName || flight.returnAirlineName || "N/A"}
            </Text>
            <Text style={styles.flightNumber}>
              {flight.arrivalFlightNumber || flight.returnFlightNumber}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>MINISTRY</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.routeInfo}>
          <View style={styles.airportInfo}>
            <Text style={styles.airportCode}>
              {flight.arrivalAirportCode || flight.returnAirportCode}
            </Text>
            <Text style={styles.airportName}>
              {flight.arrivalAirport || flight.returnAirport}
            </Text>
            <Text style={styles.cityCountry}>
              {flight.arrivalCity || flight.returnCity},{" "}
              {flight.arrivalCountry || flight.returnCountry}
            </Text>
          </View>
        </View>

        <View style={styles.timeInfo}>
          {flight.arrivalDate && (
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Arrival</Text>
              <Text style={styles.timeValue}>
                {formatTime(flight.arrivalDate)}
              </Text>
              <Text style={styles.dateValue}>
                {formatDate(flight.arrivalDate)}
              </Text>
            </View>
          )}

          {flight.returnDate && (
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Return</Text>
              <Text style={styles.timeValue}>
                {formatTime(flight.returnDate)}
              </Text>
              <Text style={styles.dateValue}>
                {formatDate(flight.returnDate)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.additionalInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Flight Type:</Text>
            <Text style={styles.infoValue}>{flight.flightType || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Class:</Text>
            <Text style={styles.infoValue}>{flight.flightClass || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <Text style={styles.userInfoTitle}>Passenger Info</Text>
          <View style={styles.userInfoContainer}>
            <View style={styles.userPhotoContainer}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                }}
                style={styles.userPhoto}
                resizeMode="cover"
              />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Mahmoud</Text>
              <Text style={styles.userMobile}>+96659116100</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.modernButton}
            onPress={() => {
              Alert.alert(
                "Plane Landed",
                `Flight ${
                  flight.arrivalFlightNumber || flight.returnFlightNumber
                } has landed successfully!`,
                [{ text: "OK", style: "default" }]
              );
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#10B981", "#059669"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <View style={styles.buttonContent}>
                <MaterialIcons name="flight-land" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Plane Landed</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modernButton}
            onPress={() => {
              Alert.alert(
                "Logged Arrived",
                `Passenger arrival has been logged for flight ${
                  flight.arrivalFlightNumber || flight.returnFlightNumber
                }!`,
                [{ text: "OK", style: "default" }]
              );
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#F59E0B", "#D97706"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <View style={styles.buttonContent}>
                <MaterialIcons name="check-circle" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Logged Arrived</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modernButton}
            onPress={() => {
              Alert.alert(
                "Guest Granted",
                `Guest access has been granted for flight ${
                  flight.arrivalFlightNumber || flight.returnFlightNumber
                }!`,
                [{ text: "OK", style: "default" }]
              );
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#880CB9", "#368BBA"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <View style={styles.buttonContent}>
                <MaterialIcons name="verified-user" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Guest Granted</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
    marginVertical: 12,
    marginHorizontal: 6,
  },
  headerGradient: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },
  flightInfo: {
    flex: 1,
  },
  airlineName: {
    fontSize: 18,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#FFFFFF",
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  flightNumber: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "rgba(255, 255, 255, 0.9)",
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#FAFBFC",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  routeInfo: {
    marginBottom: 16,
  },
  airportInfo: {
    alignItems: "center",
  },
  airportCode: {
    fontSize: 32,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
    marginBottom: 8,
    textShadowColor: "rgba(136, 12, 185, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  airportName: {
    fontSize: 15,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#2D3748",
    textAlign: "center",
    marginBottom: 3,
  },
  cityCountry: {
    fontSize: 13,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#718096",
    textAlign: "center",
  },
  timeInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(136, 12, 185, 0.08)",
  },
  timeContainer: {
    alignItems: "center",
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#667eea",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  timeValue: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: "#2D3748",
    marginBottom: 3,
  },
  dateValue: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#718096",
  },
  additionalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#667eea",
    marginRight: 6,
  },
  infoValue: {
    fontSize: 13,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#2D3748",
  },
  specialServices: {
    marginTop: 12,
  },
  serviceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  serviceText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#2D3748",
  },
  userInfoSection: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfoTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#667eea",
    marginBottom: 12,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPhotoContainer: {
    marginRight: 12,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#667eea",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#2D3748",
    marginBottom: 4,
    textAlign: "right",
  },
  userMobile: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#718096",
    textAlign: "right",
  },
  buttonsContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  modernButton: {
    flex: 1,
    borderRadius: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    height: 50,
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  buttonContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 4,
  },
});

export default CustomMinistryItem;
