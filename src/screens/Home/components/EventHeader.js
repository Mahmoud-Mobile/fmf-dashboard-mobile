import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Fonts } from "../../../Global/fonts";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Colors } from "../../../Global/colors";
import { horizontalMargin } from "../../../config/metrics";

const EventHeader = () => {
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api);

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
    <SafeAreaView style={styles.container} edges={["top"]}>
      {Object.keys(selectedEvent).length > 0 ? (
        <View style={styles.eventSection}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={16} color={Colors.White} />
            </TouchableOpacity>
            <View style={{ gap: 6 }}>
              <Text style={styles.eventName} numberOfLines={1}>
                {selectedEvent.name || ""}
              </Text>
              <View style={styles.eventDetailItem}>
                <Ionicons name="time-outline" size={14} color={Colors.White} />
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
                  color={Colors.White}
                />
                <Text style={styles.eventDetailText} numberOfLines={1}>
                  {selectedEvent.location}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.notificationContainer}
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <Ionicons
              name="notifications-outline"
              size={16}
              color={Colors.White}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noEventSection}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={16} color={Colors.White} />
            </TouchableOpacity>
            <View style={{ gap: 6 }}>
              <Text style={styles.noEventText}>No Event Selected</Text>
              <Text style={styles.noEventSubtext}>
                Select an event from Dashboard to get started
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalMargin,
    paddingTop: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: Colors.Primary,
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  notificationContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    padding: 8,
  },

  // Event Section Styles
  eventSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e4681",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
  },

  eventName: {
    fontSize: 15,
    fontFamily: Fonts.FONT_REGULAR,
    color: "white",
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  eventDetailText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#E3E3E3",
  },
  // No Event Section Styles
  noEventSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  noEventText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_Semi,
    color: "rgba(255, 255, 255, 0.8)",
  },
  noEventSubtext: {
    fontSize: 13,
    fontFamily: Fonts.FONT_REGULAR,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
});

export default EventHeader;
