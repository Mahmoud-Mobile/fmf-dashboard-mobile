import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { ActionButtonGroup } from "../../../components/ActionButton";
import styles from "./Styles";

const TripCard = ({ item, onPress, width, actionButtons }) => {
  const participant = item?.participant || {};
  const trip = item?.trip || {};
  const vehicle = item?.vehicle || {};
  const participantTrip = item?.participantTrip || {};
  const hasMultipleTrips = item?.hasMultipleTrips || false;
  const allTrips = item?.allTrips || [];

  const firstName = participant?.firstName || "";
  const lastName = participant?.lastName || "";
  const userName = [firstName, lastName].filter(Boolean).join(" ") || "-";
  const userMobile = participant?.phone || "-";
  const userEmail = participant?.email || "";
  const userPhoto = participant?.profilePicture || null;

  const pickupLocation = trip?.pickupLocation || "-";
  const dropoffLocation = trip?.dropoffLocation || "-";
  const scheduledPickup = trip?.scheduledPickup;
  const tripType = trip?.tripType || "-";
  const status = trip?.status || "-";
  const isPickedUp = participantTrip?.isPickedUp || false;
  const isNoShow = participantTrip?.isNoShow || false;

  const tripDateTime = (() => {
    if (!scheduledPickup) return "-";
    try {
      const nativeDate = new Date(scheduledPickup);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("MMM DD, YYYY HH:mm");
      }
      return "-";
    } catch (error) {
      return "-";
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
              <Text style={styles.userName} numberOfLines={2}>
                {userName}
              </Text>
              <Text style={styles.userMobile} numberOfLines={1}>
                {userMobile}
              </Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color={Colors.Gray} />
            <Text style={styles.locationLabel}>Pickup:</Text>
            <Text style={styles.locationText} numberOfLines={2}>
              {pickupLocation}
            </Text>
          </View>

          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color={Colors.Gray} />
            <Text style={styles.locationLabel}>Drop-off:</Text>
            <Text style={styles.locationText} numberOfLines={2}>
              {dropoffLocation}
            </Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={14} color={Colors.Gray} />
            <Text style={styles.detailText} numberOfLines={2}>
              Trip Date: {tripDateTime}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="swap-horiz" size={14} color={Colors.Gray} />
            <Text style={styles.detailText} numberOfLines={1}>
              Trip Type: {tripType}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="info" size={14} color={Colors.Gray} />
            <Text style={styles.detailText} numberOfLines={1}>
              Status: {status}
            </Text>
          </View>

          {userEmail && (
            <View style={styles.detailRow}>
              <MaterialIcons name="email" size={14} color={Colors.Gray} />
              <Text style={styles.detailText} numberOfLines={1}>
                {userEmail}
              </Text>
            </View>
          )}

          {vehicle && (vehicle.model || vehicle.vehicleNumber) && (
            <View style={styles.detailRow}>
              <MaterialIcons
                name="directions-car"
                size={14}
                color={Colors.Gray}
              />
              <Text style={styles.detailText} numberOfLines={1}>
                {vehicle.model || "-"} ({vehicle.vehicleNumber || "-"})
              </Text>
            </View>
          )}

          {(isPickedUp || isNoShow) && (
            <View style={styles.detailRow}>
              <MaterialIcons
                name={isPickedUp ? "check-circle" : "cancel"}
                size={14}
                color={isPickedUp ? Colors.Primary : Colors.Red}
              />
              <Text style={styles.detailText} numberOfLines={1}>
                {isPickedUp ? "Picked Up" : "No Show"}
              </Text>
            </View>
          )}
        </View>
      </View>
      {hasMultipleTrips ? (
        <TouchableOpacity
          style={styles.previewButton}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.previewButtonText}>
            Preview Trips ({allTrips.length})
          </Text>
        </TouchableOpacity>
      ) : (
        actionButtons && actionButtons.length > 0 && (
          <ActionButtonGroup buttons={actionButtons} />
        )
      )}
    </TouchableOpacity>
  );
};

export default TripCard;
