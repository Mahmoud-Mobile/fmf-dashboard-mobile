import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { Fonts } from "../../../Global/fonts";
import { Colors } from "../../../Global/colors";
import { ActionButtonGroup } from "../../../components/ActionButton";
import { ActionButton } from "../../../components/ActionButton";

const FlightCard = ({
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
  isTablet = false,
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

  const renderActions = () => {
    if (!actionButtons || actionButtons.length === 0) return null;

    // If single button, use ActionButton
    if (actionButtons.length === 1) {
      const button = actionButtons[0];
      return (
        <View style={{ marginTop: 16, alignItems: "center" }}>
          <ActionButton
            {...button}
            style={{ width: "100%", ...button.style }}
          />
        </View>
      );
    }

    // Multiple buttons, use ActionButtonGroup
    return <ActionButtonGroup buttons={actionButtons} />;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { width: isTablet ? "49%" : "100%" }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={headerGradientColors || ["#667eea", "#764ba2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.flightInfo}>
            <Text style={styles.airlineName}>{airlineName || "N/A"}</Text>
            <Text style={styles.flightNumber}>{flightNumber || "N/A"}</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{status || "N/A"}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.routeInfo}>
          <View style={styles.airportInfo}>
            <Text style={styles.airportCode}>{airportCode || "N/A"}</Text>
            <Text style={styles.airportName}>{airportName || "N/A"}</Text>
          </View>
        </View>

        {timeInfo.length > 0 && (
          <View style={styles.timeInfo}>
            {timeInfo.map((timeItem, index) => (
              <View key={index} style={styles.timeContainer}>
                <Text style={styles.timeLabel}>{timeItem.label || ""}</Text>
                <Text style={styles.timeValue}>
                  {timeItem.time ? formatTime(timeItem.time) : "N/A"}
                </Text>
                <Text style={styles.dateValue}>
                  {timeItem.date ? formatDate(timeItem.date) : "N/A"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {additionalInfo.length > 0 && (
          <View style={styles.additionalInfo}>
            {additionalInfo.map((infoItem, index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{infoItem.title || ""}:</Text>
                <Text style={styles.infoValue}>{infoItem.value || "N/A"}</Text>
              </View>
            ))}
          </View>
        )}

        {/* User Information Section */}
        <View style={styles.userInfoSection}>
          <Text style={styles.userInfoTitle}>Passenger Info</Text>
          <View style={styles.userInfoContainer}>
            <Image
              source={{ uri: userPhoto }}
              style={styles.userPhoto}
              resizeMode="cover"
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userMobile}>{userMobile}</Text>
            </View>
          </View>
        </View>

        {renderActions()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  headerGradient: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
  },
  flightInfo: {
    flex: 1,
  },
  airlineName: {
    fontSize: 10,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#FFFFFF",
    marginBottom: 1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  flightNumber: {
    fontSize: 8,
    fontFamily: Fonts.FONT_REGULAR,
    color: "rgba(255, 255, 255, 0.9)",
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  statusText: {
    fontSize: 7,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  content: {
    padding: 8,
    backgroundColor: "#FAFBFC",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  routeInfo: {
    marginBottom: 6,
  },
  airportInfo: {
    alignItems: "center",
  },
  airportCode: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
    marginBottom: 2,
    textShadowColor: "rgba(136, 12, 185, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  airportName: {
    fontSize: 9,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#2D3748",
    textAlign: "center",
    marginBottom: 1,
  },
  cityCountry: {
    fontSize: 7,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#718096",
    textAlign: "center",
  },
  timeInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(136, 12, 185, 0.08)",
  },
  timeContainer: {
    alignItems: "center",
    flex: 1,
  },
  timeLabel: {
    fontSize: 7,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#667eea",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  timeValue: {
    fontSize: 11,
    fontFamily: Fonts.FONT_BOLD,
    color: "#2D3748",
    marginBottom: 1,
  },
  dateValue: {
    fontSize: 7,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#718096",
  },
  additionalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 8,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#667eea",
    marginRight: 3,
  },
  infoValue: {
    fontSize: 8,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#2D3748",
  },
  userInfoSection: {
    marginTop: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfoTitle: {
    fontSize: 8,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#667eea",
    marginBottom: 4,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#667eea",
  },
  userDetails: {
    alignItems: "flex-start",
    paddingLeft: 6,
    flex: 1,
  },
  userName: {
    fontSize: 9,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: "#2D3748",
    marginBottom: 1,
    textAlign: "right",
  },
  userMobile: {
    fontSize: 7,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#718096",
    textAlign: "right",
  },
});

export default FlightCard;
