import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import moment from "moment";

const EventHeader = () => {
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUserInfo = await SecureStore.getItemAsync("userInfo");
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
      } catch (error) {
        console.error("Error loading user info:", error);
      }
    };
    loadUserInfo();
  }, []);

  const getGreeting = () => {
    const hour = moment().hour();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formatEventTime = (startDate, endDate) => {
    if (!startDate) return "TBD";

    const start = moment(startDate);
    const end = moment(endDate);

    if (start.isSame(end, "day")) {
      return start.format("MMM D, YYYY h:mm A");
    }

    return `${start.format("MMM D")} - ${end.format("MMM D, YYYY")}`;
  };

  return (
    <LinearGradient
      colors={["#880CB9", "#368BBA", "#368BBA"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <View style={styles.centerSection}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.username}>
              {userInfo?.user?.firstName && userInfo?.user?.lastName
                ? `${userInfo.user.firstName} ${userInfo.user.lastName}`
                : userInfo?.user?.email || "User"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.notificationContainer}
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <View style={styles.notificationIconContainer}>
              <Ionicons name="notifications-outline" size={18} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Event Information Section */}
        {selectedEvent &&
        selectedEvent.id &&
        Object.keys(selectedEvent).length > 0 ? (
          <View style={styles.eventSection}>
            <View style={styles.eventHeader}>
              <View style={styles.eventIconContainer}>
                <Ionicons name="calendar-outline" size={20} color="white" />
              </View>
              <Text style={styles.eventSectionTitle}>Current Event</Text>
            </View>

            <View style={styles.eventInfo}>
              <Text style={styles.eventName} numberOfLines={1}>
                {selectedEvent.name || selectedEvent.title}
              </Text>

              <View style={styles.eventDetails}>
                <View style={styles.eventDetailItem}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color="rgba(255, 255, 255, 0.8)"
                  />
                  <Text style={styles.eventDetailText}>
                    {formatEventTime(
                      selectedEvent.startDate,
                      selectedEvent.endDate
                    )}
                  </Text>
                </View>

                <View style={styles.eventDetailItem}>
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color="rgba(255, 255, 255, 0.8)"
                  />
                  <Text style={styles.eventDetailText} numberOfLines={1}>
                    {selectedEvent.location}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.noEventSection}>
            <View style={styles.noEventIconContainer}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color="rgba(255, 255, 255, 0.6)"
              />
            </View>
            <Text style={styles.noEventText}>No Event Selected</Text>
            <Text style={styles.noEventSubtext}>
              Select an event from Dashboard to get started
            </Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 310,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40,
    minHeight: 40,
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: Fonts.FONT_REGULAR,
    marginBottom: 2,
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    fontFamily: Fonts.FONT_BOLD,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  notificationContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 12,
  },
  notificationIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  // Event Section Styles
  eventSection: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  eventIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    padding: 6,
    marginRight: 8,
  },
  eventSectionTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_Semi,
    color: "rgba(255, 255, 255, 0.9)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  eventInfo: {},
  eventName: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: "white",
    marginBottom: 8,
  },
  eventDetails: {
    gap: 6,
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  eventDetailText: {
    fontSize: 13,
    fontFamily: Fonts.FONT_REGULAR,
    color: "rgba(255, 255, 255, 0.8)",
    width: "90%",
  },
  // No Event Section Styles
  noEventSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  noEventIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  noEventText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_Semi,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  noEventSubtext: {
    fontSize: 13,
    fontFamily: Fonts.FONT_REGULAR,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
});

export default EventHeader;
