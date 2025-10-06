import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Styles";

const GuestCard = ({ guest, onPress }) => {
  const getGuestName = () => {
    const parts = [guest.title, guest.firstName, guest.familyName].filter(
      Boolean
    );
    return parts.join(" ") || "Guest Name";
  };

  const getGuestStatus = () => {
    if (guest.isGuestArrived && guest.isGuestDeparted) {
      return "Completed";
    } else if (guest.isGuestArrived) {
      return "Arrived";
    } else if (guest.isGuestDeparted) {
      return "Departed";
    } else {
      return "Scheduled";
    }
  };

  const getGuestInitials = () => {
    const firstName = guest.firstName || "";
    const lastName = guest.familyName || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  const renderGuestImage = () => {
    if (guest.photo) {
      return (
        <Image
          source={{ uri: guest.photo }}
          style={styles.guestImage}
          defaultSource={require("../../../assets/icon.png")}
        />
      );
    } else {
      return (
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{getGuestInitials()}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress && onPress(guest)}
        activeOpacity={0.7}
      >
        {/* Header with Image and Info */}
        <View style={styles.cardHeader}>
          {renderGuestImage()}
          <View style={styles.guestInfo}>
            <Text style={styles.guestName} numberOfLines={2}>
              {getGuestName()}
            </Text>
            {(guest.mobile || guest.mobileCountryCode) && (
              <Text style={styles.position} numberOfLines={2}>
                {guest.mobileCountryCode ? "+" + guest.mobileCountryCode : ""}{" "}
                {guest.mobile}
              </Text>
            )}

            {/* Ambassador Information */}
            {(guest.ambassadorFirstName || guest.ambassadorFamilyName) && (
              <View style={styles.ambassadorContainer}>
                <Image
                  source={{ uri: guest.ambassadorImage }}
                  style={styles.ambassadorImage}
                  defaultSource={require("../../../assets/icon.png")}
                />
                <Text style={styles.ambassadorText} numberOfLines={1}>
                  Ambassador: {guest.ambassadorFirstName}{" "}
                  {guest.ambassadorFamilyName}
                </Text>
              </View>
            )}

            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor(getGuestStatus()) },
                ]}
              />
              <Text style={styles.statusText}>{getGuestStatus()}</Text>
            </View>
          </View>
        </View>

        {/* Flight Information */}
        <View style={styles.cardBody}>
          {guest.arrivalFlightNumber && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Flight:</Text>
              <Text style={[styles.infoValue, styles.flightNumber]}>
                {guest.arrivalFlightNumber}
              </Text>
            </View>
          )}

          {guest.arrivalAirlinesName && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Airline:</Text>
              <Text style={[styles.infoValue, styles.airlineText]}>
                {guest.arrivalAirlinesName}
              </Text>
            </View>
          )}

          {guest.arrivalDate && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Arrival:</Text>
              <Text style={[styles.infoValue, styles.dateText]}>
                {formatDateTime(guest.arrivalDate)}
              </Text>
            </View>
          )}

          {guest.arrivalAirport && guest.returnAirport && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Route:</Text>
              <Text style={[styles.infoValue, styles.airlineText]}>
                {guest.arrivalAirport} → {guest.returnAirport}
              </Text>
            </View>
          )}

          {guest.type && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type:</Text>
              <Text style={styles.guestType}>{guest.type}</Text>
            </View>
          )}
        </View>

        {/* Organization Badge */}
        {guest.organizationType && (
          <View style={styles.organizationBadge}>
            <Text style={styles.organizationText}>
              {guest.organizationType}
            </Text>
          </View>
        )}

        {/* Special Requests */}
        {guest.specialRequests && (
          <View style={styles.specialRequestsContainer}>
            <Text style={styles.specialRequestsLabel}>Special Requests:</Text>
            <Text style={styles.specialRequestsText} numberOfLines={2}>
              {guest.specialRequests}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "#10B981";
    case "arrived":
      return "#10B981";
    case "departed":
      return "#6B7280";
    case "boarding":
      return "#F59E0B";
    case "delayed":
      return "#EF4444";
    case "scheduled":
      return "#3B82F6";
    default:
      return "#9CA3AF";
  }
};

const formatDateTime = (dateTime) => {
  if (!dateTime) return "N/A";

  try {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return dateTime;
  }
};

export default GuestCard;
