import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { ActionButtonGroup } from "../../../components/ActionButton";
import styles from "./Styles";

const HotelCard = ({ item, onPress, width, actionButtons }) => {
  const hotel = item || {};

  const guestName = hotel.guestName || "Ahmed Mohamed";
  const phone = hotel.phone || "+966 65 090 7242";
  const organizationType = hotel.organizationType || "Government";
  const arrivalDate = hotel.arrivalDate;
  const hotelName = hotel.hotelName || "Marriott Hotel";
  const roomNumber = hotel.roomNumber || "207";
  const assignedTo = hotel.assignedTo || "Mohammed Al-Rashid";
  const userPhoto =
    hotel.photo ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";

  const arrivalDateTime = (() => {
    if (!arrivalDate) return "N/A";
    try {
      const nativeDate = new Date(arrivalDate);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("MMM DD, YYYY, h:mm A");
      }
      return "N/A";
    } catch (error) {
      console.log("Date formatting error:", error);
      return "N/A";
    }
  })();

  const userInitial = guestName ? guestName.charAt(0).toUpperCase() : "A";

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
              <Text style={styles.userName}>{guestName}</Text>
              <Text style={styles.userMobile}>{phone}</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <MaterialIcons name="business" size={16} color={Colors.Gray} />
            <Text style={styles.locationLabel}>Org. type:</Text>
            <Text style={styles.locationText}>{organizationType}</Text>
          </View>

          <View style={styles.locationRow}>
            <MaterialIcons name="event" size={16} color={Colors.Gray} />
            <Text style={styles.locationLabel}>Arrival date:</Text>
            <Text style={styles.locationText}>{arrivalDateTime}</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.detailRow}>
            <MaterialIcons name="hotel" size={14} color={Colors.Gray} />
            <Text style={styles.detailText}>Hotel: {hotelName}</Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="meeting-room" size={14} color={Colors.Gray} />
            <Text style={styles.detailText}>Room number: {roomNumber}</Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="person" size={14} color={Colors.Gray} />
            <Text style={styles.detailText}>Assigned to: {assignedTo}</Text>
          </View>
        </View>
      </View>
      {actionButtons && actionButtons.length > 0 && (
        <ActionButtonGroup buttons={actionButtons} />
      )}
    </TouchableOpacity>
  );
};

export default HotelCard;
