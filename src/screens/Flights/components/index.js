import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import {
  ActionButtonGroup,
  ActionButton,
} from "../../../components/ActionButton";
import styles from "./Styles";

const FlightCard = ({
  airlineName,
  flightNumber,
  status,

  airportCode,
  airportName,

  timeInfo = [],

  userName = "N/A",
  userMobile = "N/A",
  userPhoto = null,
  firstName = "",
  lastName = "",

  actionButtons,

  onPress,
  width,
}) => {
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const nativeDate = new Date(dateString);
      if (!isNaN(nativeDate.getTime())) {
        return `${moment(nativeDate).format("MMM DD, YYYY")} - ${moment(
          nativeDate
        ).format("h:mm A")}`;
      }
      return "N/A";
    } catch (error) {
      return "N/A";
    }
  };

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

  // Get initials: first char of firstName and first char of lastName
  const getInitials = () => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    if (firstInitial && lastInitial) {
      return `${firstInitial}${lastInitial}`;
    }
    // Fallback to first char of userName if firstName/lastName not available
    return userName ? userName.charAt(0).toUpperCase() : "";
  };

  const userInitials = getInitials();

  const getArrivalDateTime = () => {
    if (timeInfo.length > 0 && timeInfo[0].date) {
      return formatDateTime(timeInfo[0].date);
    }
    return "N/A";
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
          <Text style={styles.flightTitle}>{flightNumber || "N/A"}</Text>
          <Text style={styles.flightText}>
            Airline Name: {airlineName || "N/A"}
          </Text>
        </View>
        <View style={styles.detailsColumn}>
          <View style={styles.detailRow}>
            <MaterialIcons name="flight" size={14} color="#6B7280" />
            <Text style={styles.detailText}>
              {airportName ? `${airportName} (${airportCode || ""})` : "N/A"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={14} color="#6B7280" />
            <Text style={styles.detailText}>{getArrivalDateTime()}</Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: statusConfig.backgroundColor },
        ]}
      >
        {statusConfig.icon && (
          <MaterialIcons
            name={statusConfig.icon}
            size={12}
            color={statusConfig.color}
          />
        )}
        <Text style={[styles.statusText, { color: statusConfig.color }]}>
          {status || "N/A"}
        </Text>
      </View>
      {renderActions()}
    </TouchableOpacity>
  );
};

export default FlightCard;
