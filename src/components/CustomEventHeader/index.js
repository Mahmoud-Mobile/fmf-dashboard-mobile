import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { Colors } from "../../Global/colors";
import styles from "./Styles";

const CustomEventHeader = ({
  event,
  noEventTitle = "No Event Selected",
  noEventSubtitle = "Select an event from Dashboard to get started",
  rightIcon,
  onLeftButtonPress,
  onRightButtonPress,
  top = true,
}) => {
  const formatEventTime = (startDate, endDate) => {
    if (!startDate) return "TBD";

    const start = moment(startDate);
    const end = moment(endDate);

    if (start.isSame(end, "day")) {
      return start.format("MMM D, YYYY h:mm A");
    }

    return `${start.format("MMM D")} - ${end.format("MMM D, YYYY")}`;
  };

  const hasEvent = event && Object.keys(event).length > 0;

  const content = (
    <>
      {hasEvent ? (
        <View style={styles.eventSection}>
          <View style={styles.eventContent}>
            {onLeftButtonPress && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={onLeftButtonPress}
              >
                <Ionicons name="arrow-back" size={16} color={Colors.White} />
              </TouchableOpacity>
            )}
            <View style={styles.eventDetails}>
              <Text style={styles.eventName} numberOfLines={1}>
                {event.name || ""}
              </Text>
              <View style={styles.eventDetailItem}>
                <Ionicons name="time-outline" size={14} color={Colors.White} />
                <Text style={styles.eventDetailText}>
                  {formatEventTime(event.startDate, event.endDate)}
                </Text>
              </View>
            </View>
          </View>
          {onRightButtonPress && (
            <TouchableOpacity
              style={styles.notificationContainer}
              onPress={onRightButtonPress}
            >
              {rightIcon || (
                <Ionicons
                  name="notifications-outline"
                  size={16}
                  color={Colors.White}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.noEventSection}>
          <View style={styles.eventContent}>
            {onLeftButtonPress && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={onLeftButtonPress}
              >
                <Ionicons name="arrow-back" size={16} color={Colors.White} />
              </TouchableOpacity>
            )}
            <View style={styles.eventDetails}>
              <Text style={styles.noEventText}>{noEventTitle}</Text>
              <Text style={styles.noEventSubtext}>{noEventSubtitle}</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={top ? ["top"] : []}>
      {content}
    </SafeAreaView>
  );
};

export default CustomEventHeader;
