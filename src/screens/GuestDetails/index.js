import React, { useState } from "react";
import { View, Text, ScrollView, Image, Alert, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionButton from "../../components/ActionButton";
import CustomHeader from "../../components/CustomHeader";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import styles from "./Styles";

const GuestDetails = ({ route, navigation }) => {
  const { guest } = route.params;
  const [scrollY] = useState(new Animated.Value(0));

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  const getGuestInitials = () => {
    const firstName = guest.firstName || "";
    const lastName = guest.familyName || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  const DetailRow = ({ label, value, highlight = false }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text
        style={[styles.detailValue, highlight && styles.detailValueHighlight]}
      >
        {value}
      </Text>
    </View>
  );

  const handleActionPress = (actionName, actionType, isCompleted) => {
    // Get guest name for personalization
    const guestName = `${guest.firstName} ${guest.familyName}`;

    // Check if action is already completed
    if (isCompleted) {
      Alert.alert(
        "Already Completed",
        `${actionName} has already been confirmed for ${guestName}.`,
        [{ text: "OK" }]
      );
      return;
    }

    // Create specific messages for each action
    const getActionMessage = (actionName) => {
      switch (actionName) {
        case "Plane landed":
          return `Are you sure the plane has landed for ${guestName}? This will mark the guest as arrived.`;
        case "Luggage arrived":
          return `Are you sure the luggage has arrived for ${guestName}? This will confirm luggage delivery.`;
        case "Guest greeted":
          return `Are you sure ${guestName} has been greeted? This will mark the meet & greet as completed.`;
        default:
          return `Are you sure you want to submit this request for "${actionName}"?`;
      }
    };

    Alert.alert("Confirm Action", getActionMessage(actionName), [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes, Confirm",
        style: "default",
        onPress: () => {
          // Here you can add the actual API call to update the status
          console.log(
            `Confirmed: ${actionName} - ${actionType} for ${guestName}`
          );

          // Show success message with guest name
          Alert.alert(
            "Success! ✅",
            `${actionName} has been confirmed for ${guestName}.`,
            [{ text: "OK" }]
          );
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={{ top: "additive" }}>
      <CustomHeader
        title="Guest Info"
        center={false}
        top={0}
        scrollY={scrollY}
        onLeftButtonPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Guest Profile Section */}
        <View style={styles.guestProfileSection}>
          <View style={styles.profileRow}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{getGuestInitials()}</Text>
            </View>
            <View style={styles.guestInfo}>
              <Text style={styles.guestName}>
                {guest.title} {guest.firstName} {guest.middleName}{" "}
                {guest.familyName}
              </Text>
              <Text style={styles.guestId}>{guest.id}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons Section */}
        <View style={styles.actionButtonsSection}>
          <Text style={styles.actionButtonsTitle}>Actions</Text>
          <View style={styles.actionButtonsContainer}>
            <ActionButton
              name="Plane landed"
              icon="plane"
              isCompleted={guest.isGuestArrived}
              onPress={() =>
                handleActionPress(
                  "Plane landed",
                  "plane_landed",
                  guest.isGuestArrived
                )
              }
            />
            <ActionButton
              name="Luggage arrived"
              icon="luggage"
              isCompleted={guest.isLuggageReceived}
              onPress={() =>
                handleActionPress(
                  "Luggage arrived",
                  "luggage_arrived",
                  guest.isLuggageReceived
                )
              }
            />
            <ActionButton
              name="Guest greeted"
              icon="person"
              isCompleted={guest.isMeetDone}
              onPress={() =>
                handleActionPress(
                  "Guest greeted",
                  "guest_greeted",
                  guest.isMeetDone
                )
              }
            />
          </View>
        </View>

        {/* Guest Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Guest Details</Text>

          {/* Contact Information */}
          <View style={styles.detailGroup}>
            <Text style={styles.detailGroupTitle}>Contact Information</Text>
            <DetailRow label="Email" value={guest.email || "N/A"} />
          </View>

          {/* Ambassador Information */}
          {(guest.ambassadorFirstName || guest.ambassadorEmail) && (
            <View style={styles.detailGroup}>
              <Text style={styles.detailGroupTitle}>
                Ambassador Information
              </Text>
              {guest.ambassadorFirstName && (
                <View style={styles.ambassadorRow}>
                  <Image
                    source={{ uri: guest.ambassadorImage }}
                    style={styles.ambassadorAvatar}
                    defaultSource={require("../../../assets/icon.png")}
                  />
                  <View style={styles.ambassadorInfo}>
                    <Text style={styles.ambassadorName}>
                      {guest.ambassadorFirstName} {guest.ambassadorFamilyName}
                    </Text>
                    <Text style={styles.ambassadorNumber}>
                      {guest.ambassadorMobile}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Travel Dates & Times */}
          <View style={styles.detailGroup}>
            <Text style={styles.detailGroupTitle}>Travel Dates & Times</Text>
            <DetailRow
              label="Arrive date / time"
              value={formatDate(guest.arrivalDate)}
            />
            <DetailRow
              label="Return date & time"
              value={formatDate(guest.returnDate)}
            />
          </View>

          {/* Flight Information */}
          <View style={styles.detailGroup}>
            <Text style={styles.detailGroupTitle}>Flight Information</Text>
            <DetailRow
              label="Flight Number"
              value={guest.arrivalFlightNumber || "N/A"}
            />
            <DetailRow
              label="Return Flight Number"
              value={guest.returnFlightNumber || "N/A"}
            />
            <DetailRow
              label="Arrival Airport"
              value={guest.arrivalAirport || "N/A"}
            />
            <DetailRow
              label="Return Airport"
              value={guest.returnAirport || "N/A"}
            />
          </View>

          {/* Accommodation Information */}
          <View style={styles.detailGroup}>
            <Text style={styles.detailGroupTitle}>
              Accommodation Information
            </Text>
            <DetailRow label="Hotel Name" value={guest.hotelName || "N/A"} />
            <DetailRow label="Room no" value={guest.mainRoomNumber || "N/A"} />
            <DetailRow
              label="Check-in date"
              value={formatDateShort(guest.checkInDate)}
            />
          </View>

          {/* Organizational Details */}
          <View style={styles.detailGroup}>
            <Text style={styles.detailGroupTitle}>Organizational Details</Text>
            <DetailRow
              label="Organization Type"
              value={guest.organizationType || "N/A"}
            />
            <DetailRow label="Position" value={guest.position || "N/A"} />
          </View>

          {/* Special Requests */}
          {guest.specialRequests && (
            <View style={styles.detailGroup}>
              <Text style={styles.detailGroupTitle}>Special Requests</Text>
              <View style={styles.specialRequestsContainer}>
                <Text style={styles.specialRequestsText}>
                  {guest.specialRequests}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <FloatingChatIcon />
    </SafeAreaView>
  );
};

export default GuestDetails;
