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

  const firstName = participant?.firstName || "";
  const lastName = participant?.lastName || "";
  const userName = [firstName, lastName].filter(Boolean).join(" ") || "N/A";
  const userMobile = participant?.phone || "N/A";
  const userEmail = participant?.email || "";
  const userPhoto = participant?.profilePicture || null;

  const pickupLocation = trip?.pickupLocation || "N/A";
  const dropoffLocation = trip?.dropoffLocation || "N/A";
  const scheduledPickup = trip?.scheduledPickup;
  const tripType = trip?.tripType || "N/A";
  const status = trip?.status || "N/A";
  const isPickedUp = trip?.isPickedUp || false;
  const isNoShow = trip?.isNoShow || false;

  const tripDateTime = (() => {
    if (!scheduledPickup) return "N/A";
    try {
      const nativeDate = new Date(scheduledPickup);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("MMM DD, YYYY HH:mm");
      }
      return "N/A";
    } catch (error) {
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
            <MaterialIcons name="swap-horiz" size={14} color={Colors.Gray} />
            <Text style={styles.detailText}>Trip Type: {tripType}</Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="info" size={14} color={Colors.Gray} />
            <Text style={styles.detailText}>Status: {status}</Text>
          </View>

          {userEmail && (
            <View style={styles.detailRow}>
              <MaterialIcons name="email" size={14} color={Colors.Gray} />
              <Text style={styles.detailText}>{userEmail}</Text>
            </View>
          )}

          {(isPickedUp || isNoShow) && (
            <View style={styles.detailRow}>
              <MaterialIcons
                name={isPickedUp ? "check-circle" : "cancel"}
                size={14}
                color={isPickedUp ? Colors.Primary : Colors.Red}
              />
              <Text style={styles.detailText}>
                {isPickedUp ? "Picked Up" : "No Show"}
              </Text>
            </View>
          )}
        </View>
      </View>
      {actionButtons && actionButtons.length > 0 && (
        <ActionButtonGroup buttons={actionButtons} />
      )}
    </TouchableOpacity>
  );
};

export default TripCard;
