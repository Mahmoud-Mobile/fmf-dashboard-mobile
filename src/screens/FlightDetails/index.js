import React, { useMemo } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";
import { ActionButton, ActionButtonGroup } from "../../components/ActionButton";
import { horizontalMargin } from "../../config/metrics";
import {
  markFlightArrived,
  markFlightDeparted,
  toggleMeetDone,
  toggleLuggageReceived,
} from "../../webservice/apiConfig";
import { sendNotification } from "../../config/notificationUtils";
import ParticipantInfoCard from "../../components/ParticipantInfoCard";
import { formatDateTime } from "../../config/dateUtils";

const FlightDetails = ({ route }) => {
  const { flight, selectedCategory } = route.params;
  const navigation = useNavigation();

  const getParticipantName = (participant) => {
    if (!participant) return "Participant";
    const firstName = participant.firstName || "";
    const lastName = participant.lastName || "";
    return `${firstName} ${lastName}`.trim() || " ";
  };

  const getFlightNumber = (flightType) => {
    if (flightType === "DEPARTURE") {
      return flight.returnFlightNumber || flight.arrivalFlightNumber || "-";
    }
    return flight.arrivalFlightNumber || "-";
  };

  const showAlert = (title, message, onSuccess) => {
    Alert.alert(title, message, [
      {
        text: "OK",
        style: "default",
        onPress: onSuccess || (() => navigation.goBack()),
      },
    ]);
  };

  const createActionHandler = (
    apiCall,
    data,
    notificationTitle,
    getNotificationMessage,
    notificationType,
    successMessage,
    errorMessage
  ) => {
    return async () => {
      const flightId = flight.id;
      const participantId = flight.participant?.id;

      if (!flightId || !participantId) {
        showAlert("Error", "Missing flight or participant information");
        return;
      }

      try {
        await apiCall(flightId, participantId, data);

        const participantName = getParticipantName(flight.participant);
        const flightNumber = getFlightNumber(flight.flightType);
        const notificationMessage = getNotificationMessage(
          participantName,
          flightNumber
        );

        await sendNotification(notificationTitle, notificationMessage, {
          type: notificationType,
          flightId,
          participantId,
        });

        showAlert("Success", successMessage);
      } catch (error) {
        showAlert("Error", errorMessage);
      }
    };
  };

  const actionButtons = useMemo(() => {
    const flightId = flight.id;
    const participantId = flight.participant?.id;

    if (!flightId || !participantId) {
      return [];
    }

    if (flight.flightType === "DEPARTURE" || selectedCategory === "return") {
      const isDisabled = flight.isParticipantDeparted === true;

      return [
        {
          icon: "flight-takeoff",
          text: "Participant Departed",
          isSelected: !isDisabled,
          disabled: isDisabled,
          onPress: createActionHandler(
            markFlightDeparted,
            { departed: true },
            "Participant Departed",
            (name, flightNum) => `${name} has departed on flight ${flightNum}`,
            "flight_departed",
            "Participant departed status updated successfully!",
            "Failed to update participant departed status. Please try again."
          ),
        },
      ];
    }

    const handleMeetDone = createActionHandler(
      toggleMeetDone,
      { meetDone: true },
      "Meet Done",
      (name, flightNum) => `Meet completed for ${name} on flight ${flightNum}`,
      "flight_meet_done",
      "Meet done status updated successfully!",
      "Failed to update meet done status. Please try again."
    );

    const handleLuggageReceived = createActionHandler(
      toggleLuggageReceived,
      { luggageReceived: true },
      "Luggage Received",
      (name, flightNum) =>
        `Luggage received for ${name} on flight ${flightNum}`,
      "flight_luggage_received",
      "Luggage received status updated successfully!",
      "Failed to update luggage received status. Please try again."
    );

    const handleParticipantArrived = createActionHandler(
      markFlightArrived,
      { arrived: true },
      "Participant Arrived",
      (name, flightNum) => `${name} has arrived on flight ${flightNum}`,
      "flight_participant_arrived",
      "Participant arrived status updated successfully!",
      "Failed to update participant arrived status. Please try again."
    );

    return [
      {
        icon: "work",
        text: "Luggage Received",
        isSelected: !flight.isLuggageReceived,
        disabled: flight.isLuggageReceived === true,
        onPress: handleLuggageReceived,
      },
      {
        icon: "check-circle",
        text: "Meet Done",
        isSelected: !flight.isMeetDone,
        disabled: flight.isMeetDone === true,
        onPress: handleMeetDone,
      },
      {
        icon: "person",
        text: "Participant Arrived",
        isSelected: !flight.isParticipantArrived,
        disabled: flight.isParticipantArrived === true,
        onPress: handleParticipantArrived,
      },
    ];
  }, [flight, selectedCategory, navigation]);

  const actionButtonVisibility =
    useSelector((state) => state.ui?.actionButtonVisibility) || {};

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

  const flightInfo = useMemo(() => {
    if (flight.flightType === "DEPARTURE") {
      return {
        flightNumber: flight.returnFlightNumber || "-",
        airlineName:
          flight.returnAirlinesName || flight.returnAirlineName || "-",
      };
    }
    return {
      flightNumber: flight.arrivalFlightNumber || "-",
      airlineName: flight.arrivalAirlinesName || "-",
    };
  }, [flight]);

  const participant = flight.participant || {};
  const participantName = getParticipantName(participant);

  const InfoRow = ({ label, value, valueStyle }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value || "-"}</Text>
    </View>
  );

  const StatusRow = ({ label, value }) => (
    <InfoRow
      label={label}
      value={value ? "Yes" : "No"}
      valueStyle={value ? styles.statusYes : styles.statusNo}
    />
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel={participantName}
        title={flightInfo.flightNumber}
        subtitle={flightInfo.airlineName}
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
              <ParticipantInfoCard
                participant={participant}
                fields={[
                  {
                    key: "participantCode",
                    icon: "badge",
                    iconType: "MaterialIcons",
                    label: "Participant Code",
                    value: participant.participantCode,
                  },
                  {
                    key: "phone",
                    icon: "phone",
                    iconType: "MaterialIcons",
                    label: "Phone",
                    value: participant.phone,
                  },
                  {
                    key: "email",
                    icon: "email",
                    iconType: "MaterialIcons",
                    label: "Email",
                    value: participant.email,
                  },
                  {
                    key: "nationality",
                    icon: "flag",
                    iconType: "Ionicons",
                    label: "Nationality",
                    value: participant.nationality
                      ? `${participant.nationality.name} (${participant.nationality.code})`
                      : null,
                  },
                ]}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8 }]}>
                <Text style={styles.sectionTitle}>Arrival Details</Text>
                <InfoRow label="Airport:" value={flight.arrivalAirport} />
                <InfoRow
                  label="Flight Code:"
                  value={flight.arrivalAirportCode}
                />
                <InfoRow label="Flight Route:" value={flight.flightRoute} />
                <InfoRow
                  label="City:"
                  value={
                    flight.arrivalCity && flight.arrivalCountry
                      ? `${flight.arrivalCity}, ${flight.arrivalCountry}`
                      : null
                  }
                />
                <InfoRow
                  label="Date & Time:"
                  value={formatDateTime(flight.arrivalDate, flight.arrivalTime)}
                />
                <InfoRow
                  label="Status:"
                  value={flight.arrivalFlightStatus}
                  valueStyle={styles.statusYes}
                />
              </View>

              <View style={[styles.column, { marginRight: 8 }]}>
                <Text style={styles.sectionTitle}>Booking Details</Text>
                <InfoRow label="Seat:" value={flight.seatNumber} />
                <InfoRow label="Class:" value={flight.flightClass} />
                <InfoRow label="Type:" value={flight.flightType || "Arrival"} />
                <InfoRow label="Aircraft Type:" value={flight.aircraftType} />
                <InfoRow label="Booking Ref:" value={flight.bookingReference} />
                <InfoRow label="Ticket No:" value={flight.ticketNumber} />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8 }]}>
                <Text style={styles.sectionTitle}>Return Details</Text>
                <InfoRow label="Airport:" value={flight.returnAirport} />
                <InfoRow
                  label="Flight Code:"
                  value={flight.returnAirportCode}
                />
                <InfoRow
                  label="Flight Route:"
                  value={flight.returnRoute || "Riyadh (RUH) → Dubai (DXB)"}
                />
                <InfoRow
                  label="City:"
                  value={
                    flight.returnCity && flight.returnCountry
                      ? `${flight.returnCity}, ${flight.returnCountry}`
                      : null
                  }
                />
                <InfoRow
                  label="Date & Time:"
                  value={formatDateTime(flight.returnDate, flight.returnTime)}
                />
                <InfoRow
                  label="Status:"
                  value={flight.returnFlightStatus}
                  valueStyle={styles.statusScheduled}
                />
              </View>

              <View style={[styles.column, { marginRight: 8 }]}>
                <Text style={styles.sectionTitle}>Status</Text>
                <StatusRow
                  label="Luggage Received:"
                  value={flight.isLuggageReceived}
                />
                <StatusRow label="Guest Meet:" value={flight.isMeetDone} />
                <StatusRow
                  label="Guest Arrived:"
                  value={flight.isParticipantArrived}
                />
                <StatusRow
                  label="Guest Departed:"
                  value={flight.isParticipantDeparted}
                />
                <StatusRow
                  label="Wheelchair Required:"
                  value={flight.wheelchairRequired}
                />
                <StatusRow
                  label="Mobility Assistance:"
                  value={flight.mobilityAssistance}
                />
                <StatusRow label="Visa Required:" value={flight.visaRequired} />
                <InfoRow label="Visa Status:" value={flight.visaStatus} />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Special Request</Text>
              <Text style={styles.value}>
                {flight.specialRequest?.trim()
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
