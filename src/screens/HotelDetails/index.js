import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";
import moment from "moment";
import { ActionButton, ActionButtonGroup } from "../../components/ActionButton";
import { horizontalMargin } from "../../config/metrics";

const HotelDetails = ({ route }) => {
  const { hotel: initialHotel } = route.params;
  const navigation = useNavigation();
  const [hotel, setHotel] = useState(initialHotel || {});

  const guestName = hotel.guestName || "N/A";
  const phone = hotel.phone || "N/A";
  const organizationType = hotel.organizationType || "N/A";
  const arrivalDate = hotel.arrivalDate;
  const hotelName = hotel.hotelName || "N/A";
  const roomNumber = hotel.roomNumber || "N/A";
  const assignedTo = hotel.assignedTo || "N/A";
  const userPhoto =
    hotel.photo ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const nativeDate = new Date(dateString);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("MMM DD, YYYY, h:mm A");
      }
      return "N/A";
    } catch (error) {
      console.log("Date formatting error:", error);
      return "N/A";
    }
  };

  const actionButtons = useMemo(() => {
    const hotelId = hotel.id || "unknown";

    return [
      {
        icon: "home",
        text: "Room Prepared",
        isSelected: hotel.isRoomPrepared || false,
        disabled: false,
        iconId: `room-prepared-${hotelId}`,
        onPress: () => {
          setHotel((prev) => ({
            ...prev,
            isRoomPrepared: !prev.isRoomPrepared,
          }));
          Alert.alert(
            "Room Prepared",
            `Room ${roomNumber} has been ${
              hotel.isRoomPrepared ? "marked as not prepared" : "prepared"
            }!`,
            [{ text: "OK", style: "default" }]
          );
        },
      },
      {
        icon: "person",
        text: "Guest Arrived",
        isSelected: hotel.isGuestArrived || false,
        disabled: false,
        iconId: `guest-arrived-${hotelId}`,
        onPress: () => {
          setHotel((prev) => ({
            ...prev,
            isGuestArrived: !prev.isGuestArrived,
          }));
          Alert.alert(
            "Guest Arrived",
            `Guest ${guestName} has ${
              hotel.isGuestArrived ? "not arrived" : "arrived"
            }!`,
            [{ text: "OK", style: "default" }]
          );
        },
      },
      {
        icon: "hotel",
        text: "Room Occupied",
        isSelected: hotel.isRoomOccupied || false,
        disabled: false,
        iconId: `room-occupied-${hotelId}`,
        onPress: () => {
          setHotel((prev) => ({
            ...prev,
            isRoomOccupied: !prev.isRoomOccupied,
          }));
          Alert.alert(
            "Room Occupied",
            `Room ${roomNumber} is now ${
              hotel.isRoomOccupied ? "vacant" : "occupied"
            }!`,
            [{ text: "OK", style: "default" }]
          );
        },
      },
    ];
  }, [hotel, roomNumber, guestName]);

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
        leftLabel="Hotels"
        // title={hotelName}
        // subtitle={`Room ${roomNumber}`}
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
              <Text style={styles.sectionTitle}>Guest Information</Text>
              <View style={styles.participantContainer}>
                <Image
                  source={{
                    uri: userPhoto,
                  }}
                  style={styles.participantPhoto}
                  resizeMode="cover"
                />
                <View style={styles.participantInfo}>
                  <Text style={styles.participantName}>{guestName}</Text>
                  <Text style={styles.participantMobile}>{phone}</Text>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8, marginTop: 16 }]}>
                <Text style={styles.sectionTitle}>Hotel Details</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Hotel Name:</Text>
                  <Text style={styles.value}>{hotelName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Room Number:</Text>
                  <Text style={styles.value}>{roomNumber}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Arrival Date:</Text>
                  <Text style={styles.value}>{formatDate(arrivalDate)}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Organization Type:</Text>
                  <Text style={styles.value}>{organizationType}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Assigned To:</Text>
                  <Text style={styles.value}>{assignedTo}</Text>
                </View>
              </View>

              <View style={[styles.column, { marginTop: 16 }]}>
                <Text style={styles.sectionTitle}>Room Status</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Room Prepared:</Text>
                  <Text
                    style={[
                      styles.value,
                      hotel.isRoomPrepared ? styles.statusYes : styles.statusNo,
                    ]}
                  >
                    {hotel.isRoomPrepared ? "Yes" : "No"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Guest Arrived:</Text>
                  <Text
                    style={[
                      styles.value,
                      hotel.isGuestArrived ? styles.statusYes : styles.statusNo,
                    ]}
                  >
                    {hotel.isGuestArrived ? "Yes" : "No"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Room Occupied:</Text>
                  <Text
                    style={[
                      styles.value,
                      hotel.isRoomOccupied ? styles.statusYes : styles.statusNo,
                    ]}
                  >
                    {hotel.isRoomOccupied ? "Yes" : "No"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Hotel ID:</Text>
                  <Text style={styles.value}>{hotel.id || "N/A"}</Text>
                </View>
              </View>
            </View>
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

export default HotelDetails;
