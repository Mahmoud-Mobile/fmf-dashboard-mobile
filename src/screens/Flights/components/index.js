import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import {
  ActionButtonGroup,
  ActionButton,
} from "../../../components/ActionButton";
import { formatDateTime } from "../../../config/dateUtils";
import styles from "./Styles";

const FlightCard = ({
  airlineName,
  flightNumber,
  status,

  airportCode,
  airportName,

  date,
  time,
  participantType = null,

  userName = "-",
  userMobile = "-",
  userPhoto = null,
  firstName = "",
  lastName = "",

  actionButtons,

  onPress,
  width,
}) => {
  const getStatusConfig = () => {
    const statusUpper = (status || "").toUpperCase().trim();

    if (statusUpper === "SCHEDULED" || statusUpper.includes("SCHEDULED")) {
      return {
        color: "#3B82F6",
        backgroundColor: "#DBEAFE",
        icon: "schedule",
      };
    }

    if (statusUpper === "DELAYED" || statusUpper.includes("DELAYED")) {
      return {
        color: "#C10007",
        backgroundColor: "#FFE9E9",
        icon: "error-outline",
      };
    }

    if (statusUpper === "IN_FLIGHT" || statusUpper.includes("IN_FLIGHT")) {
      return {
        color: "#6366F1",
        backgroundColor: "#E0E7FF",
        icon: "flight",
      };
    }

    if (statusUpper === "DEPARTED" || statusUpper.includes("DEPARTED")) {
      return {
        color: "#FFAC4A",
        backgroundColor: "#FFE3C1",
        icon: "flight-takeoff",
      };
    }

    if (statusUpper === "DIVERTED" || statusUpper.includes("DIVERTED")) {
      return {
        color: "#F59E0B",
        backgroundColor: "#FEF3C7",
        icon: "swap-horiz",
      };
    }

    if (statusUpper === "CANCELLED" || statusUpper.includes("CANCELLED")) {
      return {
        color: "#DC2626",
        backgroundColor: "#FEE2E2",
        icon: "error-outline",
      };
    }

    return {
      color: Colors.Primary,
      backgroundColor: "#E0E7FF",
      icon: null,
    };
  };

  const statusConfig = getStatusConfig();

  const getInitials = () => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    if (firstInitial && lastInitial) {
      return `${firstInitial}${lastInitial}`;
    }
    return userName ? userName.charAt(0).toUpperCase() : "";
  };

  const userInitials = getInitials();

  const getArrivalDateTime = () => {
    return formatDateTime(date, time);
  };

  const renderActions = () => {
    if (!actionButtons || actionButtons.length === 0) return null;
    if (actionButtons.length === 1) {
      const button = actionButtons[0];
      return <ActionButton {...button} />;
    }

    return <ActionButtonGroup buttons={actionButtons} />;
  };

  return (
    <TouchableOpacity
      style={[styles.container, width && { width }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={{}}>
          <View style={styles.flexRow}>
            {userPhoto ? (
              <Image
                source={{ uri: userPhoto }}
                style={styles.userPhoto}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.userIconCircle}>
                <Text style={styles.userInitial}>{userInitials}</Text>
              </View>
            )}
            <View style={{ gap: 4 }}>
              <Text style={styles.userName}>{userName || " "}</Text>
              <Text style={styles.userMobile}>{userMobile || " "}</Text>
            </View>
          </View>
          <Text style={styles.flightTitle}>{flightNumber || "-"}</Text>
          <Text style={styles.flightText}>
            Airline Name: {airlineName || "-"}
          </Text>
        </View>
        <View style={styles.detailsColumn}>
          <View style={styles.detailRow}>
            <MaterialIcons name="flight" size={14} color="#6B7280" />
            <Text style={styles.detailText}>
              {airportName ? `${airportName} (${airportCode || ""})` : "-"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={14} color="#6B7280" />
            <Text style={styles.detailText}>{getArrivalDateTime()}</Text>
          </View>
        </View>
      </View>
      {participantType && (
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{participantType}</Text>
        </View>
      )}
      {renderActions()}
    </TouchableOpacity>
  );
};

export default FlightCard;
