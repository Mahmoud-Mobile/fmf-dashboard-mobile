import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { ActionButtonGroup } from "../../../components/ActionButton";
import styles from "./Styles";

const TripCard = ({ item, onPress, width, actionButtons }) => {
  const trip = item || {};
  const participantTrips = trip.participantTrips || [];
  const firstParticipant = participantTrips[0] || {};
  const participant = firstParticipant.participant || {};

  const userName =
    participant?.name || participant?.fullName || "Ahmed Mohamed";
  const userMobile =
    participant?.mobile || participant?.phone || "+966 65 090 7242";
  const userPhoto =
    participant?.photo ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";

  const driverShift = trip.driverShift || {};
  const driver = driverShift.driver || {};
  const driverName =
    [driver?.firstName, driver?.lastName].filter(Boolean).join(" ") || " ";

  const vehicle = trip.vehicle || {};
  const carModel = vehicle?.model || "BMW X7";
  const carBrand = vehicle?.brand || "";
  const plateNumber = vehicle?.vehicleNumber || "AB852";
  const fullCarModel = carBrand ? `${carBrand} ${carModel}` : carModel;

  const pickupLocation =
    trip.pickupLocation || "King Abdulaziz International Airport";
  const dropoffLocation =
    trip.dropoffLocation || "Marriott Hotel, King Abdullah Road";

  const scheduledPickup = trip?.scheduledPickup;

  const tripDateTime = (() => {
    if (!scheduledPickup) return "N/A";
    try {
      const nativeDate = new Date(scheduledPickup);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("MMM DD, YYYY HH:mm");
      }
      return "N/A";
    } catch (error) {
      console.log("Date formatting error:", error);
      return "N/A";
    }
  })();
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "A";

  return (
    <TouchableOpacity
      style={[styles.container, width && { width }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.leftColumn}>
          <View style={styles.passengerInfo}>
            {userPhoto ? (
              <Image
                source={{ uri: userPhoto }}
                style={styles.userPhoto}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.userIconCircle}>
                <Text style={styles.userInitial}>{userInitial}</Text>
              </View>
            )}
            <View style={styles.passengerDetails}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userMobile}>{userMobile}</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color={Colors.Gray} />
            <Text style={styles.locationLabel}>Pickup:</Text>
            <Text style={styles.locationText}>{pickupLocation}</Text>
          </View>

          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color={Colors.Gray} />
            <Text style={styles.locationLabel}>Drop-off:</Text>
            <Text style={styles.locationText}>{dropoffLocation}</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={14} color={Colors.Gray} />
            <Text style={styles.detailText}>Trip Date: {tripDateTime}</Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="person" size={14} color={Colors.Gray} />
            <Text style={styles.detailText}>Driver: {driverName}</Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons
              name="directions-car"
              size={14}
              color={Colors.Gray}
            />
            <Text style={styles.detailText}>Car Model: {fullCarModel}</Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons
              name="confirmation-number"
              size={14}
              color={Colors.Gray}
            />
            <Text style={styles.detailText}>Plate Number: {plateNumber}</Text>
          </View>
        </View>
      </View>
      {actionButtons && actionButtons.length > 0 && (
        <ActionButtonGroup buttons={actionButtons} />
      )}
    </TouchableOpacity>
  );
};

export default TripCard;
