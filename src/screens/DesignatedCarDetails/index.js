import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { ActionButton } from "../../components/ActionButton";
import ParticipantInfoCard from "../../components/ParticipantInfoCard";
import styles from "./Styles";
import NoShowModal from "../DesignatedCars/components/NoShowModal";
import { formatDate, getParticipantName } from "./utils/designatedCarDetailsUtils";
import {
  handleMarkNoShow,
  handleMarkPickedUp,
} from "./utils/designatedCarDetailsActions";

const DesignatedCarDetails = ({ route }) => {
  const { car, allCars, participant: routeParticipant } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector((state) => state.api);

  const [showNoShowModal, setShowNoShowModal] = useState(false);
  const [noShowReason, setNoShowReason] = useState("");
  const [selectedCarForNoShow, setSelectedCarForNoShow] = useState(null);

  const participant = routeParticipant || car?.participant || {};
  const carData = car?.car || car || {};

  const carsList = allCars || (car ? [car] : []);

  const userName = getParticipantName(participant);

  const handleNoShowPress = (carItem) => {
    const car = carItem.car || {};
    const participantId = participant?.id || "";
    setSelectedCarForNoShow({ carId: car.id, participantId });
    setNoShowReason("");
    setShowNoShowModal(true);
  };

  const handleNoShowSubmit = async () => {
    if (!selectedCarForNoShow) return;

    const { carId, participantId } = selectedCarForNoShow;
    const carItem = carsList.find(
      (c) => c.car?.id === carId || c.id === carId
    );
    const car = carItem?.car || carItem || {};

    if (!carId || !participantId) {
      Alert.alert("Error", "Missing car or participant information");
      return;
    }

    const success = await handleMarkNoShow(
      selectedEvent?.id,
      carId,
      participantId,
      noShowReason,
      userName,
      car,
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
    setSelectedCarForNoShow(null);
  };

  const handlePickedUpPress = async (carItem) => {
    const car = carItem.car || carItem || {};
    const carId = car.id || "";
    const participantId = participant?.id || "";

    if (!carId || !participantId) {
      Alert.alert("Error", "Missing car or participant information");
      return;
    }

    const success = await handleMarkPickedUp(
      selectedEvent?.id,
      carId,
      participantId,
      userName,
      car,
      dispatch
    );

    if (success) {
      navigation.goBack();
    }
  };

  const renderCarCard = (carItem, index) => {
    const car = carItem.car || carItem || {};
    const vehicle = carItem.vehicle || {};
    const carParticipantCar = carItem.participantCar || {};
    const carTitle = car.title || `Car ${index + 1}`;

    return (
      <View key={car.id || index} style={styles.carCard}>
        <Text style={styles.carTitle}>{carTitle}</Text>

        <View style={styles.carDetails}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Pickup Location:</Text>
            <Text style={styles.value}>{car.pickupLocation || "-"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Drop-off Location:</Text>
            <Text style={styles.value}>{car.dropoffLocation || "-"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Scheduled Pickup:</Text>
            <Text style={styles.value}>{formatDate(car.scheduledPickup)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Car Type:</Text>
            <Text style={styles.value}>{car.carType || car.tripType || "-"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, styles.statusYes]}>
              {car.status || "-"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Picked Up:</Text>
            <Text
              style={[
                styles.value,
                carParticipantCar?.isPickedUp
                  ? styles.statusYes
                  : styles.statusNo,
              ]}
            >
              {carParticipantCar?.isPickedUp ? "Yes" : "No"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>No Show:</Text>
            <Text
              style={[
                styles.value,
                carParticipantCar?.isNoShow
                  ? styles.statusYes
                  : styles.statusNo,
              ]}
            >
              {carParticipantCar?.isNoShow ? "Yes" : "No"}
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

        <View style={styles.carActions}>
          <ActionButton
            icon="arrow-forward"
            text="Mark Picked Up"
            swipeTitle="Swipe to Mark Picked Up"
            disabled={
              carParticipantCar?.isPickedUp || carParticipantCar?.isNoShow
            }
            iconId={`picked-up-${car.id}-${participant?.id}`}
            onSwipeSuccess={() => handlePickedUpPress(carItem)}
            disabledText="Picked Up - Done"
          />

          <ActionButton
            icon="arrow-forward"
            text="Mark No Show"
            swipeTitle="Swipe to Mark No Show"
            disabled={
              carParticipantCar?.isNoShow || carParticipantCar?.isPickedUp
            }
            iconId={`no-show-${car.id}-${participant?.id}`}
            onSwipeSuccess={() => handleNoShowPress(carItem)}
            disabledText="No Show - Done"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Designated Cars"
        title={
          carsList.length > 1
            ? `${carsList.length} Cars`
            : carData?.carType || carData?.tripType || "Car Details"
        }
        subtitle={
          carsList.length > 1 ? "Multiple Cars" : carData?.status || "-"
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

        {carsList.map((carItem, index) => renderCarCard(carItem, index))}
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

export default DesignatedCarDetails;

