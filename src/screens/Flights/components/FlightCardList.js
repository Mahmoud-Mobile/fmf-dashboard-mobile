import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import moment from "moment";
import { Fonts } from "../../../Global/fonts";
import { Colors } from "../../../Global/colors";
import { ActionButtonGroup } from "../../../components/ActionButton";
import { ActionButton } from "../../../components/ActionButton";

const FlightCardList = ({
  airlineName,
  flightNumber,
  status,
  headerGradientColors,

  airportCode,
  airportName,
  city,
  country,

  timeInfo = [],

  additionalInfo = [],

  userName = "Mahmoud",
  userMobile = "+9665900000",
  userPhoto = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",

  actionButtons,

  onPress,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const nativeDate = new Date(dateString);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("MMM DD, YYYY");
      }
      return "N/A";
    } catch (error) {
      return "N/A";
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const nativeDate = new Date(dateString);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("HH:mm");
      }
      return "N/A";
    } catch (error) {
      return "N/A";
    }
  };

  const getStatusColor = () => {
    if (status === "DELAYED" || status === "Delayed") {
      return "#FF9500";
    }
    if (headerGradientColors && headerGradientColors.length > 0) {
      return headerGradientColors[0];
    }
    return Colors.Primary;
  };

  const renderActions = () => {
    if (!actionButtons || actionButtons.length === 0) return null;

    if (actionButtons.length === 1) {
      const button = actionButtons[0];
      return (
        <View style={styles.actionsContainer}>
          <ActionButton {...button} iconOnly={true} style={button.style} />
        </View>
      );
    }

    return (
      <View style={styles.actionsContainer}>
        <ActionButtonGroup buttons={actionButtons} iconOnly={true} />
      </View>
    );
  };

  const statusColor = getStatusColor();
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.leftBar, { backgroundColor: statusColor }]} />

      <View style={styles.cardContent}>
        <View style={styles.leftSection}>
          <Text style={[styles.airportCode, { color: statusColor }]}>
            {airportCode || "N/A"}
          </Text>
          <Text style={styles.airportName}>{airportName || "N/A"}</Text>

          <Text style={styles.airlineFlight}>
            {airlineName && airlineName !== "N/A"
              ? `${airlineName} : ${flightNumber || "N/A"}`
              : `N/A : ${flightNumber || "N/A"}`}
          </Text>

          {timeInfo.length > 0 && (
            <View style={styles.timeRow}>
              <Text style={styles.airplaneIcon}>✈️</Text>
              <Text style={styles.timeText}>
                {formatTime(timeInfo[0].time)} {formatDate(timeInfo[0].date)}
                {timeInfo.length > 1 && timeInfo[1]?.time && (
                  <Text style={styles.estimatedTime}>
                    {" → "}
                    <Text
                      style={{
                        color: statusColor === "#FF9500" ? "#FF9500" : "#000",
                      }}
                    >
                      {formatTime(timeInfo[1].time)}
                    </Text>
                  </Text>
                )}
              </Text>
            </View>
          )}

          <View style={styles.passengerRow}>
            {userPhoto && userPhoto !== "N/A" ? (
              <Image
                source={{ uri: userPhoto }}
                style={[
                  styles.userPhoto,
                  { borderColor: statusColor, borderWidth: 1.5 },
                ]}
                resizeMode="cover"
              />
            ) : (
              <View
                style={[
                  styles.userIconCircle,
                  { backgroundColor: statusColor },
                ]}
              >
                <Text style={styles.userInitial}>{userInitial}</Text>
              </View>
            )}
            <Text style={styles.passengerText}>
              {userName || "N/A"} {userMobile || "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{status || "N/A"}</Text>
          </View>

          {additionalInfo.length > 0 && (
            <View style={styles.additionalInfo}>
              {additionalInfo.map((infoItem, index) => (
                <View key={index} style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{infoItem.title || ""}:</Text>
                  <Text style={styles.infoValue}>
                    {infoItem.value || "N/A"}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {renderActions()}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
  },
  leftBar: {
    width: 4,
    backgroundColor: Colors.Primary,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
    paddingLeft: 10,
  },
  leftSection: {
    flex: 1,
    paddingRight: 12,
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    minWidth: 100,
  },
  airportCode: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
    marginBottom: 2,
  },
  airportName: {
    fontSize: 10,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#6B7280",
    marginBottom: 6,
  },
  airlineFlight: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
    marginBottom: 6,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  airplaneIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  timeText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#1F2937",
  },
  estimatedTime: {
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#1F2937",
  },
  passengerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  userPhoto: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
    backgroundColor: "#E5E7EB",
  },
  userInitial: {
    fontSize: 10,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.White,
  },
  passengerText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
  },
  statusBadge: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 9,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.White,
    textTransform: "uppercase",
  },
  additionalInfo: {
    marginBottom: 8,
    alignItems: "flex-end",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: 9,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
    marginRight: 4,
  },
  infoValue: {
    fontSize: 9,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#1F2937",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 4,
    marginTop: 4,
  },
});

export default FlightCardList;
