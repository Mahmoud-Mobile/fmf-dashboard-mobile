import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { ActionButtonGroup } from "../../../components/ActionButton";
import styles from "./Styles";

const HotelCard = ({ item, onPress, width, actionButtons }) => {
  const participant = item?.participant || {};
  const firstName = participant?.firstName || "";
  const lastName = participant?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || "";
  const userPhoto = participant?.profilePicture || null;
  const userEmail = participant?.email || "";
  const userInitial = fullName ? fullName.charAt(0).toUpperCase() : "";

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
              <Text style={styles.userName}>{fullName}</Text>
              {userEmail && <Text style={styles.userMobile}>{userEmail}</Text>}
            </View>
          </View>
          <View style={styles.locationRow}>
            <Text style={styles.locationLabel}>Hotel:</Text>
            <Text style={styles.locationText}>
              {item?.accommodation?.hotel?.name}
            </Text>
          </View>
          {item?.accommodation?.room?.roomNumber && (
            <Text style={styles.userMobile}>
              Room: {item?.accommodation?.room?.roomNumber}
            </Text>
          )}
          <View style={styles.locationRow}>
            <MaterialIcons name="event" size={16} color={Colors.Gray} />
            <Text style={styles.locationLabel}>Check In:</Text>
            <Text style={styles.locationText}>
              {item?.accommodation?.checkInDate
                ? moment(new Date(item.accommodation.checkInDate)).format(
                    "MMM DD, YYYY, h:mm"
                  )
                : ""}
            </Text>
          </View>

          {item?.accommodation?.checkOutDate && (
            <View style={styles.locationRow}>
              <MaterialIcons name="event" size={16} color={Colors.Gray} />
              <Text style={styles.locationLabel}>Check Out:</Text>
              <Text style={styles.locationText}>
                {moment(new Date(item.accommodation.checkOutDate)).format(
                  "MMM DD, YYYY, h:mm"
                )}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.detailRow}>
            <MaterialIcons name="info" size={14} color={Colors.Gray} />
            <Text style={styles.detailText}>
              Status: {item?.accommodation?.status || ""}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons
              name={
                item?.accommodation?.isCheckedIn
                  ? "check-circle"
                  : "radio-button-unchecked"
              }
              size={14}
              color={
                item?.accommodation?.isCheckedIn ? Colors.Primary : Colors.Gray
              }
            />
            <Text style={styles.detailText}>
              Checked In: {item?.accommodation?.isCheckedIn ? "Yes" : "No"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons
              name={
                item?.accommodation?.isCheckedOut
                  ? "check-circle"
                  : "radio-button-unchecked"
              }
              size={14}
              color={
                item?.accommodation?.isCheckedOut ? Colors.Primary : Colors.Gray
              }
            />
            <Text style={styles.detailText}>
              Checked Out: {item?.accommodation?.isCheckedOut ? "Yes" : "No"}
            </Text>
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
