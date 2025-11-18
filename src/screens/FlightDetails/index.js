import React, { useMemo } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";
import moment from "moment";
import { ActionButton } from "../../components/ActionButton";

const FlightDetails = ({ route }) => {
  const { flight, selectedCategory } = route.params;
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
      console.log("Date formatting error:", error);
      return "N/A";
    }
  };

  const actionButtons = useMemo(() => {
    const isDisabled =
      flight.isLuggageReceived === true ||
      flight.isParticipantArrived === true ||
      flight.isParticipantDeparted === true;

    const isSelected = !isDisabled;

    if (selectedCategory === "return") {
      return [
        {
          icon: "flight-takeoff",
          text: "Plane Taken Off",
          iconSize: 24,
          isSelected: isSelected,
          disabled: isDisabled,
          onPress: () => {
            Alert.alert(
              "Plane Taken Off",
              `Flight ${flight.returnFlightNumber} has taken off successfully!`,
              [{ text: "OK", style: "default" }]
            );
          },
        },
      ];
    } else {
      return [
        {
          icon: "flight-land",
          text: "Plane Landed",
          isSelected: isSelected,
          disabled: isDisabled,
          onPress: () => {
            Alert.alert(
              "Plane Landed",
              `Flight ${flight.arrivalFlightNumber} has landed successfully!`,
              [{ text: "OK", style: "default" }]
            );
          },
        },
        {
          icon: "check-circle",
          text: "Logged Arrived",
          isSelected: isSelected,
          disabled: isDisabled,
          onPress: () => {
            Alert.alert(
              "Logged Arrived",
              `Passenger arrival has been logged for flight ${flight.arrivalFlightNumber}!`,
              [{ text: "OK", style: "default" }]
            );
          },
        },
        {
          icon: "verified-user",
          text: "Guest Granted",
          isSelected: isSelected,
          disabled: isDisabled,
          onPress: () => {
            Alert.alert(
              "Guest Granted",
              `Guest access has been granted for flight ${flight.arrivalFlightNumber}!`,
              [{ text: "OK", style: "default" }]
            );
          },
        },
      ];
    }
  }, [flight, selectedCategory]);

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel={route.params?.selectedCategoryName}
        title={flight.arrivalFlightNumber}
        subtitle={flight.arrivalAirlinesName}
        onLeftButtonPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.topRow}>
              <View style={[styles.flexOne, { paddingRight: 12 }]}>
                <Text style={styles.sectionTitle}>Participant Information</Text>
                <View style={styles.participantContainer}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                    }}
                    style={styles.participantPhoto}
                    resizeMode="cover"
                  />
                  <View style={styles.participantInfo}>
                    <Text style={styles.participantName}>Ahmed Mohamed</Text>
                    <Text style={styles.participantMobile}>
                      +966 11 111 1111
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.flexOne, { paddingLeft: 12 }]}>
                {actionButtons && actionButtons.length > 0 && (
                  <View style={{ flexDirection: "column", gap: 8 }}>
                    {actionButtons.length === 1 ? (
                      <ActionButton
                        {...actionButtons[0]}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      actionButtons.map((btn, idx) => (
                        <ActionButton
                          key={idx}
                          {...btn}
                          style={{ width: "100%" }}
                        />
                      ))
                    )}
                  </View>
                )}
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8 }]}>
                <Text style={styles.sectionTitle}> Arrival Details</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Airport:</Text>
                  <Text style={styles.value}>{flight.arrivalAirport}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Flight Code:</Text>
                  <Text style={styles.value}>{flight.arrivalAirportCode}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Flight Route:</Text>
                  <Text style={styles.value}>
                    {flight.flightRoute || "N/A"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>City:</Text>
                  <Text style={styles.value}>
                    {flight.arrivalCity}, {flight.arrivalCountry}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Date & Time:</Text>
                  <Text style={styles.value}>
                    {formatDate(flight.arrivalDate)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Status:</Text>
                  <Text style={[styles.value, styles.statusYes]}>
                    {flight.arrivalFlightStatus}
                  </Text>
                </View>
              </View>

              <View style={[styles.column, { marginLeft: 8 }]}>
                <Text style={styles.sectionTitle}> Booking Details</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Seat:</Text>
                  <Text style={styles.value}>{flight.seatNumber || "N/A"}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Class:</Text>
                  <Text style={styles.value}>
                    {flight.flightClass || "N/A"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Type:</Text>
                  <Text style={styles.value}>
                    {flight.flightType || "Arrival"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Booking Ref:</Text>
                  <Text style={styles.value}>
                    {flight.bookingReference || "N/A"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Ticket No:</Text>
                  <Text style={styles.value}>
                    {flight.ticketNumber || "N/A"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8 }]}>
                <Text style={styles.sectionTitle}> Return Details</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Airport:</Text>
                  <Text style={styles.value}>{flight.returnAirport}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Flight Code:</Text>
                  <Text style={styles.value}>{flight.returnAirportCode}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Flight Route:</Text>
                  <Text style={styles.value}>
                    {flight.returnRoute || "Riyadh (RUH) → Dubai (DXB)"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>City:</Text>
                  <Text style={styles.value}>
                    {flight.returnCity}, {flight.returnCountry}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Date & Time:</Text>
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
              </View>

              <View style={[styles.column, { marginLeft: 8 }]}>
                <Text style={styles.sectionTitle}> Status</Text>
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
                  <Text style={styles.label}>Guest Meet:</Text>
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
                  <Text style={styles.label}>Guest Arrived:</Text>
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
                  <Text style={styles.label}>Guest Departed:</Text>
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
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}> Special Request</Text>
              <Text style={styles.value}>
                {flight.specialRequest &&
                flight.specialRequest.trim().length > 0
                  ? flight.specialRequest
                  : "No special requests"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FlightDetails;
