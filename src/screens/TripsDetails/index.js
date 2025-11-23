import React, { useMemo } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";
import moment from "moment";
import { ActionButton, ActionButtonGroup } from "../../components/ActionButton";
import { horizontalMargin } from "../../config/metrics";

const TripsDetails = ({ route }) => {
  const { trip } = route.params;
  const navigation = useNavigation();

  const tripData = trip || {};
  const participantTrips = tripData.participantTrips || [];
  const firstParticipant = participantTrips[0] || {};
  const participant = firstParticipant.participant || {};
  const driverShift = tripData.driverShift || {};
  const driver = driverShift.driver || {};
  const vehicle = tripData.vehicle || {};

  const userName = participant?.name || participant?.fullName || "N/A";
  const userMobile = participant?.mobile || participant?.phone || "N/A";
  const userPhoto =
    participant?.photo ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";
  const driverName =
    [driver?.firstName, driver?.lastName].filter(Boolean).join(" ") || "N/A";
  const carModel = vehicle?.model || "N/A";
  const carBrand = vehicle?.brand || "";
  const plateNumber = vehicle?.vehicleNumber || "N/A";
  const fullCarModel = carBrand ? `${carBrand} ${carModel}` : carModel;
  const pickupLocation = tripData.pickupLocation || "N/A";
  const dropoffLocation = tripData.dropoffLocation || "N/A";

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
      trip.isVehicleReady === true ||
      trip.isGuestPickedUp === true ||
      trip.isTripCompleted === true;

    const isSelected = !isDisabled;
    const tripId = trip.id || trip.tripId || "unknown";

    return [
      {
        icon: "directions-car",
        text: "Vehicle Ready",
        isSelected: isSelected,
        disabled: isDisabled,
        iconId: `vehicle-ready-${tripId}`,
        onPress: () => {
          Alert.alert("Vehicle Ready", `Vehicle is ready for trip ${tripId}!`, [
            { text: "OK", style: "default" },
          ]);
        },
      },
      {
        icon: "person",
        text: "Guest Picked up",
        isSelected: isSelected,
        disabled: isDisabled,
        iconId: `guest-picked-up-${tripId}`,
        onPress: () => {
          Alert.alert(
            "Guest Picked up",
            `Guest has been picked up for trip ${tripId}!`,
            [{ text: "OK", style: "default" }]
          );
        },
      },
      {
        icon: "check-circle",
        text: "Trip Completed",
        isSelected: isSelected,
        disabled: isDisabled,
        iconId: `trip-completed-${tripId}`,
        onPress: () => {
          Alert.alert(
            "Trip Completed",
            `Trip ${tripId} has been completed successfully!`,
            [{ text: "OK", style: "default" }]
          );
        },
      },
    ];
  }, [trip]);

  const renderActions = () => {
    if (!actionButtons || actionButtons.length === 0) return null;
    if (actionButtons.length === 1) {
      const button = actionButtons[0];
      return <ActionButton {...button} endPosition />;
    }

    return <ActionButtonGroup buttons={actionButtons} />;
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Trips"
        title={trip?.title || "Trip Details"}
        subtitle={trip?.tripType || "N/A"}
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
                <Image
                  source={{
                    uri: userPhoto,
                  }}
                  style={styles.participantPhoto}
                  resizeMode="cover"
                />
                <View style={styles.participantInfo}>
                  <Text style={styles.participantName}>{userName}</Text>
                  <Text style={styles.participantMobile}>{userMobile}</Text>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8, marginTop: 16 }]}>
                <Text style={styles.sectionTitle}>Trip Details</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Pickup Location:</Text>
                  <Text style={styles.value}>{pickupLocation}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Drop-off Location:</Text>
                  <Text style={styles.value}>{dropoffLocation}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Scheduled Pickup:</Text>
                  <Text style={styles.value}>
                    {formatDate(tripData.scheduledPickup)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Trip Type:</Text>
                  <Text style={styles.value}>{tripData.tripType || "N/A"}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Status:</Text>
                  <Text style={[styles.value, styles.statusYes]}>
                    {tripData.status || "N/A"}
                  </Text>
                </View>
              </View>

              <View style={[styles.column, { marginTop: 16 }]}>
                <Text style={styles.sectionTitle}>Vehicle & Driver</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Driver:</Text>
                  <Text style={styles.value}>{driverName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Car Model:</Text>
                  <Text style={styles.value}>{fullCarModel}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Plate Number:</Text>
                  <Text style={styles.value}>{plateNumber}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Trip ID:</Text>
                  <Text style={styles.value}>
                    {tripData.id || tripData.tripId || "N/A"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8 }]}>
                <Text style={styles.sectionTitle}>Trip Status</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Vehicle Ready:</Text>
                  <Text
                    style={[
                      styles.value,
                      tripData.isVehicleReady
                        ? styles.statusYes
                        : styles.statusNo,
                    ]}
                  >
                    {tripData.isVehicleReady ? "Yes" : "No"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Guest Picked Up:</Text>
                  <Text
                    style={[
                      styles.value,
                      tripData.isGuestPickedUp
                        ? styles.statusYes
                        : styles.statusNo,
                    ]}
                  >
                    {tripData.isGuestPickedUp ? "Yes" : "No"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Trip Completed:</Text>
                  <Text
                    style={[
                      styles.value,
                      tripData.isTripCompleted
                        ? styles.statusYes
                        : styles.statusNo,
                    ]}
                  >
                    {tripData.isTripCompleted ? "Yes" : "No"}
                  </Text>
                </View>
              </View>
            </View>

            {tripData.notes && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notes</Text>
                <Text style={styles.value}>
                  {tripData.notes.trim().length > 0
                    ? tripData.notes
                    : "No notes available"}
                </Text>
              </View>
            )}
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

export default TripsDetails;
