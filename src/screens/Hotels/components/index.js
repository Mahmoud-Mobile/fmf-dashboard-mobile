import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { ActionButtonGroup } from "../../../components/ActionButton";
import styles from "./Styles";

const userinfo = {
  name: "John Doe",
  email: "john.doe@example.com",
  photo:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
};

const HotelCard = ({ item, onPress, width, actionButtons }) => {
  const userPhoto = userinfo?.photo;
  const userName = userinfo?.name || item?.hotelName || "Hotel";
  const userEmail = userinfo?.email || "";
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "H";

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
              {userEmail && <Text style={styles.userMobile}>{userEmail}</Text>}
            </View>
          </View>
          {item?.roomNumber && (
            <Text style={styles.userMobile}>Room: {item?.roomNumber}</Text>
          )}
          <View style={styles.locationRow}>
            <MaterialIcons name="event" size={16} color={Colors.Gray} />
            <Text style={styles.locationLabel}>Check In:</Text>
            <Text style={styles.locationText}>
              {item?.checkInDate
                ? moment(new Date(item.checkInDate)).format(
                    "MMM DD, YYYY, h:mm"
                  )
                : ""}
            </Text>
          </View>

          {item?.checkOutDate && (
            <View style={styles.locationRow}>
              <MaterialIcons name="event" size={16} color={Colors.Gray} />
              <Text style={styles.locationLabel}>Check Out:</Text>
              <Text style={styles.locationText}>
                {moment(new Date(item.checkOutDate)).format(
                  "MMM DD, YYYY, h:mm"
                )}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.detailRow}>
            <MaterialIcons name="info" size={14} color={Colors.Gray} />
            <Text style={styles.detailText}>Status: {item?.status || ""}</Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons
              name={
                item?.isCheckedIn ? "check-circle" : "radio-button-unchecked"
              }
              size={14}
              color={item?.isCheckedIn ? Colors.Primary : Colors.Gray}
            />
            <Text style={styles.detailText}>
              Checked In: {item?.isCheckedIn ? "Yes" : "No"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons
              name={
                item?.isCheckedOut ? "check-circle" : "radio-button-unchecked"
              }
              size={14}
              color={item?.isCheckedOut ? Colors.Primary : Colors.Gray}
            />
            <Text style={styles.detailText}>
              Checked Out: {item?.isCheckedOut ? "Yes" : "No"}
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
