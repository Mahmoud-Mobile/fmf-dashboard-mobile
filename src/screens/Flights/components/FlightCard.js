import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Fonts } from "../../../Global/fonts";
import { Colors } from "../../../Global/colors";
import {
  ActionButtonGroup,
  ActionButton,
} from "../../../components/ActionButton";

const FlightCard = ({
  airlineName,
  flightNumber,
  status,

  airportCode,
  airportName,

  timeInfo = [],

  userName = "Mahmoud",
  userMobile = "+9665900000",
  userPhoto = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",

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
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "";

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
                <Text style={styles.userInitial}>{userInitial}</Text>
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
            size={14}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    padding: 16,
    marginRight: 8,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  userPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
  },
  userInitial: {
    fontSize: 20,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
  userName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  userMobile: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
  },
  flightTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    marginTop: 10,
  },
  flightText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
    marginTop: 2,
    marginBottom: 5,
  },
  detailText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    flex: 1,
    width: "50%",
  },
  detailsColumn: {
    flexDirection: "column",
    gap: 16,
    alignItems: "flex-start",
    flex: 1,
    maxWidth: "60%",
    marginLeft: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    // maxWidth: "60%",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    height: 22,
    position: "absolute",
    top: 0,
    right: 0,
    borderBottomLeftRadius: 8,
    gap: 4,
  },
  statusText: {
    fontSize: 8,
    fontFamily: Fonts.FONT_MEDIUM,
    textTransform: "uppercase",
  },
});

export default FlightCard;
