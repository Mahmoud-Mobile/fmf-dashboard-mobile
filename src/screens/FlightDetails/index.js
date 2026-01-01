import React, { useMemo, useCallback } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";
import moment from "moment";
import { ActionButton, ActionButtonGroup } from "../../components/ActionButton";
import { horizontalMargin } from "../../config/metrics";
import {
  markFlightArrived,
  markFlightDeparted,
  toggleMeetDone,
  toggleLuggageReceived,
} from "../../webservice/apiConfig";
import { sendNotification } from "../../config/notificationUtils";

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
    const flightId = flight.id;
    const participantId = flight.participant?.id;

    // Don't show buttons if flightId or participantId is missing
    if (!flightId || !participantId) {
      return [];
    }

    // Handle DEPARTURE flight type - show only "Participant Departed" button
    if (flight.flightType === "DEPARTURE") {
      // Disable if isParticipantDeparted is true
      const isParticipantDepartedDisabled =
        flight.isParticipantDeparted === true;

      const handleParticipantDeparted = async () => {
        try {
          await markFlightDeparted(flightId, participantId, {
            departed: true,
          });

          // Get participant name for notification
          const participant = flight.participant || {};
          const participantName =
            `${participant.firstName || ""} ${
              participant.lastName || ""
            }`.trim() || "Participant";
          const flightNumber =
            flight.returnFlightNumber || flight.arrivalFlightNumber || "N/A";

          // Send notification
          await sendNotification(
            "Participant Departed",
            `${participantName} has departed on flight ${flightNumber}`,
            {
              type: "flight_departed",
              flightId: flightId,
              participantId: participantId,
            }
          );

          Alert.alert(
            "Success",
            "Participant departed status updated successfully!",
            [
              {
                text: "OK",
                style: "default",
                onPress: () => navigation.goBack(),
              },
            ]
          );
        } catch (error) {
          Alert.alert(
            "Error",
            "Failed to update participant departed status. Please try again.",
            [{ text: "OK", style: "default" }]
          );
        }
      };

      return [
        {
          icon: "flight-takeoff",
          text: "Participant Departed",
          isSelected: !isParticipantDepartedDisabled,
          disabled: isParticipantDepartedDisabled,
          onPress: handleParticipantDeparted,
        },
      ];
    }

    // Handle return category (legacy support)
    if (selectedCategory === "return") {
      // Disable if isParticipantDeparted is true
      const isParticipantDepartedDisabled =
        flight.isParticipantDeparted === true;

      const handleParticipantDeparted = async () => {
        try {
          await markFlightDeparted(flightId, participantId, {
            departed: true,
          });

          // Get participant name for notification
          const participant = flight.participant || {};
          const participantName =
            `${participant.firstName || ""} ${
              participant.lastName || ""
            }`.trim() || "Participant";
          const flightNumber =
            flight.returnFlightNumber || flight.arrivalFlightNumber || "N/A";

          // Send notification
          await sendNotification(
            "Participant Departed",
            `${participantName} has departed on flight ${flightNumber}`,
            {
              type: "flight_departed",
              flightId: flightId,
              participantId: participantId,
            }
          );

          Alert.alert(
            "Success",
            "Participant departed status updated successfully!",
            [
              {
                text: "OK",
                style: "default",
                onPress: () => navigation.goBack(),
              },
            ]
          );
        } catch (error) {
          Alert.alert(
            "Error",
            "Failed to update participant departed status. Please try again.",
            [{ text: "OK", style: "default" }]
          );
        }
      };

      return [
        {
          icon: "flight-takeoff",
          text: "Participant Departed",
          isSelected: !isParticipantDepartedDisabled,
          disabled: isParticipantDepartedDisabled,
          onPress: handleParticipantDeparted,
        },
      ];
    }

    // Handle arrival and officially categories
    // Disable "Meet Done" if isMeetDone is true
    const isMeetDoneDisabled = flight.isMeetDone === true;

    // Disable "Luggage Received" if isLuggageReceived is true
    const isLuggageReceivedDisabled = flight.isLuggageReceived === true;

    // Disable "Participant Arrived" if isParticipantArrived is true
    const isParticipantArrivedDisabled = flight.isParticipantArrived === true;

    const handleMeetDone = async () => {
      try {
        await toggleMeetDone(flightId, participantId, {
          meetDone: true,
        });

        // Get participant name for notification
        const participant = flight.participant || {};
        const participantName =
          `${participant.firstName || ""} ${
            participant.lastName || ""
          }`.trim() || "Participant";
        const flightNumber = flight.arrivalFlightNumber || "N/A";

        // Send notification
        await sendNotification(
          "Meet Done",
          `Meet completed for ${participantName} on flight ${flightNumber}`,
          {
            type: "flight_meet_done",
            flightId: flightId,
            participantId: participantId,
          }
        );

        Alert.alert("Success", "Meet done status updated successfully!", [
          {
            text: "OK",
            style: "default",
            onPress: () => navigation.goBack(),
          },
        ]);
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to update meet done status. Please try again.",
          [{ text: "OK", style: "default" }]
        );
      }
    };

    const handleLuggageReceived = async () => {
      try {
        await toggleLuggageReceived(flightId, participantId, {
          luggageReceived: true,
        });

        // Get participant name for notification
        const participant = flight.participant || {};
        const participantName =
          `${participant.firstName || ""} ${
            participant.lastName || ""
          }`.trim() || "Participant";
        const flightNumber = flight.arrivalFlightNumber || "N/A";

        // Send notification
        await sendNotification(
          "Luggage Received",
          `Luggage received for ${participantName} on flight ${flightNumber}`,
          {
            type: "flight_luggage_received",
            flightId: flightId,
            participantId: participantId,
          }
        );

        Alert.alert(
          "Success",
          "Luggage received status updated successfully!",
          [
            {
              text: "OK",
              style: "default",
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to update luggage received status. Please try again.",
          [{ text: "OK", style: "default" }]
        );
      }
    };

    const handleParticipantArrived = async () => {
      try {
        await markFlightArrived(flightId, participantId, {
          arrived: true,
        });

        // Get participant name for notification
        const participant = flight.participant || {};
        const participantName =
          `${participant.firstName || ""} ${
            participant.lastName || ""
          }`.trim() || "Participant";
        const flightNumber = flight.arrivalFlightNumber || "N/A";

        // Send notification
        await sendNotification(
          "Participant Arrived",
          `${participantName} has arrived on flight ${flightNumber}`,
          {
            type: "flight_participant_arrived",
            flightId: flightId,
            participantId: participantId,
          }
        );

        Alert.alert(
          "Success",
          "Participant arrived status updated successfully!",
          [
            {
              text: "OK",
              style: "default",
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to update participant arrived status. Please try again.",
          [{ text: "OK", style: "default" }]
        );
      }
    };

    return [
      {
        icon: "work",
        text: "Luggage Received",
        isSelected: !isLuggageReceivedDisabled,
        disabled: isLuggageReceivedDisabled,
        onPress: handleLuggageReceived,
      },
      {
        icon: "check-circle",
        text: "Meet Done",
        isSelected: !isMeetDoneDisabled,
        disabled: isMeetDoneDisabled,
        onPress: handleMeetDone,
      },
      {
        icon: "person",
        text: "Participant Arrived",
        isSelected: !isParticipantArrivedDisabled,
        disabled: isParticipantArrivedDisabled,
        onPress: handleParticipantArrived,
      },
    ];
  }, [flight, selectedCategory, navigation]);

  // Get action button visibility from Redux
  const actionButtonVisibility =
    useSelector((state) => state.ui?.actionButtonVisibility) || {};

  // Filter action buttons based on visibility
  const filteredActionButtons = useMemo(() => {
    if (!actionButtons || !Array.isArray(actionButtons)) return [];
    return actionButtons.filter((button) => {
      if (!button || !button.text) return true;
      const storedValue = actionButtonVisibility[button.text];
      const isVisible =
        storedValue === undefined
          ? true
          : typeof storedValue === "string"
          ? storedValue === "true"
          : Boolean(storedValue);
      return isVisible;
    });
  }, [actionButtons, actionButtonVisibility]);

  const renderActions = () => {
    if (!filteredActionButtons || filteredActionButtons.length === 0)
      return null;
    if (filteredActionButtons.length === 1) {
      const button = filteredActionButtons[0];
      return <ActionButton {...button} endPosition />;
    }

    return <ActionButtonGroup buttons={filteredActionButtons} />;
  };

  // Get flight info based on flightType
  const getFlightInfo = useMemo(() => {
    if (flight.flightType === "DEPARTURE") {
      return {
        flightNumber: flight.returnFlightNumber || "N/A",
        airlineName:
          flight.returnAirlinesName || flight.returnAirlineName || "N/A",
      };
    }
    // Default to arrival data
    return {
      flightNumber: flight.arrivalFlightNumber || "N/A",
      airlineName: flight.arrivalAirlinesName || "N/A",
    };
  }, [flight]);

  const participant = flight.participant || {};
  const firstName = participant.firstName || "";
  const lastName = participant.lastName || "";
  const name = `${firstName} ${lastName}`.trim() || "";

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel={name ?? ""}
        title={getFlightInfo.flightNumber}
        subtitle={getFlightInfo.airlineName}
        onLeftButtonPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.flexOne}>
              <Text style={styles.sectionTitle}>Participant Information</Text>
              <View style={styles.participantContainer}>
                {(() => {
                  const participant = flight.participant || {};
                  const firstName = participant.firstName || "";
                  const lastName = participant.lastName || "";
                  const userName = `${firstName} ${lastName}`.trim() || "N/A";
                  const userMobile = participant.phone || "N/A";
                  const userPhoto = participant.photo || null;
                  const dynamicParticipantType =
                    participant.dynamicParticipantType?.name || null;
                  const firstInitial = firstName
                    ? firstName.charAt(0).toUpperCase()
                    : "";
                  const lastInitial = lastName
                    ? lastName.charAt(0).toUpperCase()
                    : "";
                  const userInitials =
                    firstInitial && lastInitial
                      ? `${firstInitial}${lastInitial}`
                      : userName
                      ? userName.charAt(0).toUpperCase()
                      : "";

                  return (
                    <>
                      {userPhoto ? (
                        <Image
                          source={{ uri: userPhoto }}
                          style={styles.participantPhoto}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.participantIconCircle}>
                          <Text style={styles.participantInitial}>
                            {userInitials}
                          </Text>
                        </View>
                      )}
                      <View style={styles.participantInfo}>
                        <Text style={styles.participantName}>{userName}</Text>
                        <Text style={styles.participantMobile}>
                          {userMobile}
                        </Text>
                        {dynamicParticipantType && (
                          <View style={styles.participantTypeContainer}>
                            <Text style={styles.participantType}>
                              {dynamicParticipantType}
                            </Text>
                          </View>
                        )}
                      </View>
                    </>
                  );
                })()}
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

              <View style={[styles.column, { marginRight: 8 }]}>
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

              <View style={[styles.column, { marginRight: 8 }]}>
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
          <View
            style={{ marginBottom: 100, marginHorizontal: horizontalMargin }}
          >
            {renderActions()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FlightDetails;
