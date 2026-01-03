import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { ActionButton } from "../../components/ActionButton";
import ParticipantInfoCard from "../../components/ParticipantInfoCard";
import styles from "./Styles";
import NoShowModal from "../Trips/components/NoShowModal";
import { formatDate, getParticipantName } from "./utils/tripDetailsUtils";
import {
  handleMarkNoShow,
  handleMarkPickedUp,
} from "./utils/tripDetailsActions";

const TripsDetails = ({ route }) => {
  const { trip, allTrips, participant: routeParticipant } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector((state) => state.api);

  const [showNoShowModal, setShowNoShowModal] = useState(false);
  const [noShowReason, setNoShowReason] = useState("");
  const [selectedTripForNoShow, setSelectedTripForNoShow] = useState(null);

  const participant = routeParticipant || trip?.participant || {};
  const tripData = trip?.trip || trip || {};

  const tripsList = allTrips || (trip ? [trip] : []);

  const userName = getParticipantName(participant);

  const handleNoShowPress = (tripItem) => {
    const trip = tripItem.trip || {};
    const participantId = participant?.id || "";
    setSelectedTripForNoShow({ tripId: trip.id, participantId });
    setNoShowReason("");
    setShowNoShowModal(true);
  };

  const handleNoShowSubmit = async () => {
    if (!selectedTripForNoShow) return;

    const { tripId, participantId } = selectedTripForNoShow;
    const tripItem = tripsList.find(
      (t) => t.trip?.id === tripId || t.id === tripId
    );
    const trip = tripItem?.trip || tripItem || {};

    if (!tripId || !participantId) {
      Alert.alert("Error", "Missing trip or participant information");
      return;
    }

    const success = await handleMarkNoShow(
      selectedEvent?.id,
      tripId,
      participantId,
      noShowReason,
      userName,
      trip,
      dispatch,
      setShowNoShowModal,
      setNoShowReason
    );
    if (success) {
      navigation.goBack();
    }
  };

  const handleNoShowModalClose = () => {
    setShowNoShowModal(false);
    setNoShowReason("");
    setSelectedTripForNoShow(null);
  };

  const handlePickedUpPress = async (tripItem) => {
    const trip = tripItem.trip || tripItem || {};
    const tripId = trip.id || "";
    const participantId = participant?.id || "";

    if (!tripId || !participantId) {
      Alert.alert("Error", "Missing trip or participant information");
      return;
    }

    const success = await handleMarkPickedUp(
      selectedEvent?.id,
      tripId,
      participantId,
      userName,
      trip,
      dispatch
    );

    if (success) {
      navigation.goBack();
    }
  };

  const renderTripCard = (tripItem, index) => {
    const trip = tripItem.trip || tripItem || {};
    const vehicle = tripItem.vehicle || {};
    const tripParticipantTrip = tripItem.participantTrip || {};
    const tripTitle = trip.title || `Trip ${index + 1}`;

    return (
      <View key={trip.id || index} style={styles.tripCard}>
        <Text style={styles.tripTitle}>{tripTitle}</Text>

        <View style={styles.tripDetails}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Pickup Location:</Text>
            <Text style={styles.value}>{trip.pickupLocation || "-"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Drop-off Location:</Text>
            <Text style={styles.value}>{trip.dropoffLocation || "-"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Scheduled Pickup:</Text>
            <Text style={styles.value}>{formatDate(trip.scheduledPickup)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Trip Type:</Text>
            <Text style={styles.value}>{trip.tripType || "-"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, styles.statusYes]}>
              {trip.status || "-"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Picked Up:</Text>
            <Text
              style={[
                styles.value,
                tripParticipantTrip?.isPickedUp
                  ? styles.statusYes
                  : styles.statusNo,
              ]}
            >
              {tripParticipantTrip?.isPickedUp ? "Yes" : "No"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>No Show:</Text>
            <Text
              style={[
                styles.value,
                tripParticipantTrip?.isNoShow
                  ? styles.statusYes
                  : styles.statusNo,
              ]}
            >
              {tripParticipantTrip?.isNoShow ? "Yes" : "No"}
            </Text>
          </View>
          {vehicle && (vehicle.model || vehicle.vehicleNumber) && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Vehicle:</Text>
              <Text style={styles.value}>
                {vehicle.model || "-"} ({vehicle.vehicleNumber || "-"})
              </Text>
            </View>
          )}
        </View>

        <View style={styles.tripActions}>
          <ActionButton
            icon="arrow-forward"
            text="Mark Picked Up"
            swipeTitle="Swipe to Mark Picked Up"
            disabled={
              tripParticipantTrip?.isPickedUp || tripParticipantTrip?.isNoShow
            }
            iconId={`picked-up-${trip.id}-${participant?.id}`}
            onSwipeSuccess={() => handlePickedUpPress(tripItem)}
            disabledText="Picked Up - Done"
          />

          <ActionButton
            icon="arrow-forward"
            text="Mark No Show"
            swipeTitle="Swipe to Mark No Show"
            disabled={
              tripParticipantTrip?.isNoShow || tripParticipantTrip?.isPickedUp
            }
            iconId={`no-show-${trip.id}-${participant?.id}`}
            onSwipeSuccess={() => handleNoShowPress(tripItem)}
            disabledText="No Show - Done"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Trips"
        title={
          tripsList.length > 1
            ? `${tripsList.length} Trips`
            : tripData?.tripType || "Trip Details"
        }
        subtitle={
          tripsList.length > 1 ? "Multiple Trips" : tripData?.status || "-"
        }
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
          </View>
        </View>

        {tripsList.map((tripItem, index) => renderTripCard(tripItem, index))}
      </ScrollView>

      <NoShowModal
        visible={showNoShowModal}
        noShowReason={noShowReason}
        onReasonChange={setNoShowReason}
        onSubmit={handleNoShowSubmit}
        onClose={handleNoShowModalClose}
      />
    </View>
  );
};

export default TripsDetails;
