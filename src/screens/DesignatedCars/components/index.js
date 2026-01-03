import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { ActionButtonGroup } from "../../../components/ActionButton";
import styles from "./Styles";

const DesignatedCarCard = ({ item, onPress, width, actionButtons }) => {
  const participant = item?.participant || {};
  const car = item?.car || {};
  const vehicle = item?.vehicle || {};
  const participantCar = item?.participantCar || {};
  const hasMultipleCars = item?.hasMultipleCars || false;
  const allCars = item?.allCars || [];

  const firstName = participant?.firstName || "";
  const lastName = participant?.lastName || "";
  const userName = [firstName, lastName].filter(Boolean).join(" ") || "-";
  const userMobile = participant?.phone || "-";
  const userEmail = participant?.email || "";
  const userPhoto = participant?.profilePicture || null;
  const participantType =
    participant?.participantType?.name ||
    participant?.dynamicParticipantType?.name ||
    null;

  const pickupLocation = car?.pickupLocation || "-";
  const dropoffLocation = car?.dropoffLocation || "-";
  const scheduledPickup = car?.scheduledPickup;
  const carType = car?.carType || car?.tripType || "-";
  const status = car?.status || "-";
  const isPickedUp = participantCar?.isPickedUp || false;
  const isNoShow = participantCar?.isNoShow || false;

  const carDateTime = (() => {
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
              Car Date: {carDateTime}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="swap-horiz" size={14} color={Colors.Gray} />
            <Text style={styles.detailText} numberOfLines={1}>
              Car Type: {carType}
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
      {participantType && (
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{participantType}</Text>
        </View>
      )}
      {hasMultipleCars ? (
        <TouchableOpacity
          style={styles.previewButton}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.previewButtonText}>
            Preview Cars ({allCars.length})
          </Text>
        </TouchableOpacity>
      ) : (
        actionButtons &&
        actionButtons.length > 0 && (
          <ActionButtonGroup buttons={actionButtons} />
        )
      )}
    </TouchableOpacity>
  );
};

export default DesignatedCarCard;

