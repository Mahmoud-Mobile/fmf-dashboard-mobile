import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../Global/fonts";
import { Colors } from "../../Global/colors";
import moment from "moment";

const FlightDetails = ({ route }) => {
  const { flight } = route.params;
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const nativeDate = new Date(dateString);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("MMM DD, YYYY HH:mm");
      }
      return "N/A";
    } catch (error) {
      console.warn("Date formatting error:", error);
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
      console.warn("Time formatting error:", error);
      return "N/A";
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={{ top: "additive" }}>
      <CustomHeader
        title="Flight Details"
        onLeftButtonPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Flight Information Card */}
        <View style={styles.card}>
          <LinearGradient
            colors={["#880CB9", "#368BBA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <Text style={styles.cardTitle}>Flight Information</Text>
            <Text style={styles.flightNumber}>
              {flight.arrivalFlightNumber}
            </Text>
            <Text style={styles.airline}>{flight.arrivalAirlinesName}</Text>
          </LinearGradient>

          <View style={styles.cardContent}>
            {/* Participant Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                👤 Participant Information
              </Text>
              <View style={styles.participantContainer}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                  }}
                  style={styles.participantPhoto}
                  resizeMode="cover"
                />
                <View style={styles.participantInfo}>
                  <Text style={styles.participantName}>Ahmed Al-Rashid</Text>
                  <Text style={styles.participantMobile}>+966 50 123 4567</Text>
                </View>
              </View>
            </View>

            {/* Arrival Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🛬 Arrival Details</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Airport:</Text>
                <Text style={styles.value}>{flight.arrivalAirport}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Code:</Text>
                <Text style={styles.value}>{flight.arrivalAirportCode}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>City:</Text>
                <Text style={styles.value}>
                  {flight.arrivalCity}, {flight.arrivalCountry}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Scheduled:</Text>
                <Text style={styles.value}>
                  {formatDate(flight.arrivalDate)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Status:</Text>
                <Text style={[styles.value, styles.statusScheduled]}>
                  {flight.arrivalFlightStatus}
                </Text>
              </View>
              {flight.estimatedArrivalTime && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Estimated:</Text>
                  <Text style={styles.value}>
                    {formatDate(flight.estimatedArrivalTime)}
                  </Text>
                </View>
              )}
            </View>

            {/* Return Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🛫 Return Details</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Airport:</Text>
                <Text style={styles.value}>{flight.returnAirport}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Code:</Text>
                <Text style={styles.value}>{flight.returnAirportCode}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>City:</Text>
                <Text style={styles.value}>
                  {flight.returnCity}, {flight.returnCountry}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Scheduled:</Text>
                <Text style={styles.value}>
                  {formatDate(flight.returnDate)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Status:</Text>
                <Text style={[styles.value, styles.statusScheduled]}>
                  {flight.returnFlightStatus}
                </Text>
              </View>
              {flight.estimatedDepartureTime && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Estimated:</Text>
                  <Text style={styles.value}>
                    {formatDate(flight.estimatedDepartureTime)}
                  </Text>
                </View>
              )}
            </View>

            {/* Booking Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📋 Booking Details</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Seat:</Text>
                <Text style={styles.value}>{flight.seatNumber}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Class:</Text>
                <Text style={styles.value}>{flight.flightClass}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Type:</Text>
                <Text style={styles.value}>{flight.flightType}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Booking Ref:</Text>
                <Text style={styles.value}>{flight.bookingReference}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Ticket No:</Text>
                <Text style={styles.value}>{flight.ticketNumber}</Text>
              </View>
            </View>

            {/* Status Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📊 Status</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Luggage Received:</Text>
                <Text
                  style={[
                    styles.value,
                    flight.isLuggageReceived
                      ? styles.statusYes
                      : styles.statusNo,
                  ]}
                >
                  {flight.isLuggageReceived ? "Yes" : "No"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Meet Done:</Text>
                <Text
                  style={[
                    styles.value,
                    flight.isMeetDone ? styles.statusYes : styles.statusNo,
                  ]}
                >
                  {flight.isMeetDone ? "Yes" : "No"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Participant Arrived:</Text>
                <Text
                  style={[
                    styles.value,
                    flight.isParticipantArrived
                      ? styles.statusYes
                      : styles.statusNo,
                  ]}
                >
                  {flight.isParticipantArrived ? "Yes" : "No"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Participant Departed:</Text>
                <Text
                  style={[
                    styles.value,
                    flight.isParticipantDeparted
                      ? styles.statusYes
                      : styles.statusNo,
                  ]}
                >
                  {flight.isParticipantDeparted ? "Yes" : "No"}
                </Text>
              </View>
            </View>

            {/* Special Requirements */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>♿ Special Requirements</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Wheelchair:</Text>
                <Text
                  style={[
                    styles.value,
                    flight.wheelchairRequired
                      ? styles.statusYes
                      : styles.statusNo,
                  ]}
                >
                  {flight.wheelchairRequired ? "Required" : "Not Required"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Mobility Assistance:</Text>
                <Text
                  style={[
                    styles.value,
                    flight.mobilityAssistance
                      ? styles.statusYes
                      : styles.statusNo,
                  ]}
                >
                  {flight.mobilityAssistance ? "Required" : "Not Required"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Visa Required:</Text>
                <Text
                  style={[
                    styles.value,
                    flight.visaRequired ? styles.statusYes : styles.statusNo,
                  ]}
                >
                  {flight.visaRequired ? "Required" : "Not Required"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Visa Status:</Text>
                <Text style={styles.value}>{flight.visaStatus}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 16,
  },
  headerGradient: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  flightNumber: {
    fontSize: 24,
    fontFamily: Fonts.FONT_BOLD,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  airline: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: "rgba(255, 255, 255, 0.9)",
  },
  cardContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.Primary,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#666666",
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#333333",
    flex: 2,
    textAlign: "right",
  },
  statusScheduled: {
    color: "#10B981",
    fontWeight: "600",
  },
  statusYes: {
    color: "#10B981",
    fontWeight: "600",
  },
  statusNo: {
    color: "#EF4444",
    fontWeight: "600",
  },
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  participantPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.Primary,
    marginRight: 16,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 18,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#2D3748",
    marginBottom: 6,
  },
  participantMobile: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Primary,
    marginBottom: 4,
  },
});

export default FlightDetails;
